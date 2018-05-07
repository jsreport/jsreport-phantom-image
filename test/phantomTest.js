var path = require('path')
var Reporter = require('jsreport-core').Reporter
require('should')

describe('phantom image', function () {
  var reporter

  beforeEach(function () {
    reporter = new Reporter({
      rootDirectory: path.join(__dirname, '../')
    })

    return reporter.init()
  })

  it('should render png by default', function (done) {
    var request = {
      template: {content: 'Heyx', recipe: 'phantom-image', engine: 'none'}
    }

    reporter.render(request).then(function (response) {
      response.content.toString('utf8').should.containEql('PNG')
      done()
    }).catch(done)
  })

  it('should render jpeg', function (done) {
    var request = {
      template: {content: 'Heyx', recipe: 'phantom-image', engine: 'none', phantomImage: {imageType: 'jpeg'}}
    }

    reporter.render(request).then(function (response) {
      response.content.toString('utf8').should.containEql('JFIF')
      done()
    }).catch(done)
  })

  it('should render gif', function (done) {
    var request = {
      template: {content: 'Heyx', recipe: 'phantom-image', engine: 'none', phantomImage: {imageType: 'gif'}}
    }

    reporter.render(request).then(function (response) {
      response.content.toString('utf8').should.containEql('GIF')
      done()
    }).catch(done)
  })
})
