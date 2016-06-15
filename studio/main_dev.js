import Properties from './PhantomProperties.js'
import Studio from 'jsreport-studio'

Studio.addApiSpec({
  template: {
    phantomImage: {
      printDelay: 1000,
      quality: 100,
      imageType: 'png',
      blockJavaScript: false,
      waitForJS: false
    }
  }
})

Studio.addPropertiesComponent('phantom image', Properties, (entity) => entity.__entitySet === 'templates' && entity.recipe === 'phantom-image')
