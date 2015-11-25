/*!
 * Copyright(c) 2015 Jan Blaha
 *
 * Recipe rendering images files using phantomjs.
 */

var q = require('q')
var toArray = require('stream-to-array')
var Conversion = require('phantom-html-to-pdf')
var conversion

var Phantom = function (reporter, definition) {
  this.reporter = reporter
  reporter.options.phantom = reporter.options.phantom || {}
  reporter.options.phantom.tmpDir = reporter.options.tempDirectory
  this.allowLocalFilesAccess = reporter.options.phantom.hasOwnProperty('allowLocalFilesAccess') ? reporter.options.phantom.allowLocalFilesAccess : false

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

  conversion = Conversion(reporter.options.phantom)
}

Phantom.prototype.execute = function (request, response) {
  var self = this
  request.template.phantomImage = request.template.phantomImage || {}
  this.reporter.logger.debug('Pdf recipe start.')

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
  return q.nfcall(conversion, request.template.phantomImage).then(function (cres) {
    response.headers['Content-Type'] = 'image/' + request.template.phantomImage.imageType
    response.headers['Content-Disposition'] = "inline; filename='report." + request.template.phantomImage.imageType + "'"
    response.headers['File-Extension'] = request.template.phantomImage.imageType

    return q.nfcall(toArray, cres.stream).then(function (arr) {
      response.content = Buffer.concat(arr)
    })
  })
}

module.exports = function (reporter, definition) {
  reporter[definition.name] = new Phantom(reporter, definition)
}
