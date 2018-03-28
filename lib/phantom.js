/*!
 * Copyright(c) 2015 Jan Blaha
 *
 * Recipe rendering images files using phantomjs.
 */

var util = require('util')
var toArray = require('stream-to-array')
var Conversion = require('phantom-html-to-pdf')
var conversion

var Phantom = function (reporter, definition) {
  this.reporter = reporter
  this.allowLocalFilesAccess = definition.options.hasOwnProperty('allowLocalFilesAccess') ? definition.options : false

  reporter.extensionsManager.recipes.push({
    name: 'phantom-image',
    execute: Phantom.prototype.execute.bind(this)
  })

  reporter.documentStore.registerComplexType('PhantomImageType', {
    printDelay: {type: 'Edm.Int32'},
    blockJavaScript: {type: 'Edm.Boolean'},
    waitForJS: {type: 'Edm.Boolean'},
    imageType: {type: 'Edm.String'},
    quality: {type: 'Edm.String'}
  })

  if (reporter.documentStore.model.entityTypes['TemplateType']) {
    reporter.documentStore.model.entityTypes['TemplateType'].phantomImage = {type: 'jsreport.PhantomImageType'}
  }

  conversion = util.promisify(Conversion(definition.options))
}

Phantom.prototype.execute = function (request, response) {
  var self = this
  var reporter = self.reporter

  request.template.phantomImage = request.template.phantomImage || {}

  reporter.logger.debug('Pdf recipe start.', request)

  request.template.recipe = 'html'

  request.template.phantomImage.allowLocalFilesAccess = self.allowLocalFilesAccess
  request.template.phantomImage.settings = {
    javascriptEnabled: request.template.phantomImage.blockJavaScript !== 'true'
  }

  if (request.template.phantomImage.waitForJS) {
    request.template.phantomImage.waitForJS = JSON.parse(request.template.phantomImage.waitForJS)
  }

  request.template.phantomImage.imageType = request.template.phantomImage.imageType || 'png'
  request.template.phantomImage.quality = request.template.phantomImage.quality || '100'

  request.template.phantomImage.format = { format: request.template.phantomImage.imageType, quality: request.template.phantomImage.quality }
  request.template.phantomImage.html = response.content
  request.template.phantomImage.waitForJSVarName = 'JSREPORT_READY_TO_START'

  return conversion(request.template.phantomImage).then(function (cres) {
    cres.logs.forEach(function (m) {
      reporter.logger[m.level](m.message, { timestamp: m.timestamp.getTime(), ...request })
    })

    response.meta.contentType = 'image/' + request.template.phantomImage.imageType
    response.meta.fileExtension = request.template.phantomImage.imageType

    return toArray(cres.stream).then(function (arr) {
      response.content = Buffer.concat(arr)
      reporter.logger.debug('phantom-image recipe finished.', request)
    })
  })
}

module.exports = function (reporter, definition) {
  definition.options = Object.assign({}, reporter.options.phantom, definition.options)

  definition.options.strategy = definition.options.strategy || 'dedicated-process'
  definition.options.tmpDir = reporter.options.tempAutoCleanupDirectory

  reporter[definition.name] = new Phantom(reporter, definition)
}
