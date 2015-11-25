define(['app', 'core/basicModel', 'underscore'], function (app, ModelBase, _) {
  return ModelBase.extend({
    setTemplate: function (templateModel) {
      this.templateModel = templateModel

      if (templateModel.get('phantomImage')) {
        if (templateModel.get('phantomImage').isModel) {
          this.set(templateModel.get('phantomImage').toJSON())
        } else {
          this.set(templateModel.get('phantomImage'))
        }
      }

      templateModel.set('phantomImage', this, {silent: true})

      if (!this.get('imageType')) {
        this.set('imageType', 'png')
      }

      if (!this.get('quality')) {
        this.set('quality', '100')
      }

      this.listenTo(this, 'change', function () {
        templateModel.trigger('change')
      })

      this.listenTo(templateModel, 'api-overrides', this.apiOverride)
    },

    isDirty: function () {
      return this.get('imageType') !== 'png' || this.get('printDelay') != null || this.get('waitForJS') != null || this.get('quality') !== '100'
    },

    apiOverride: function (req) {
      req.template.phantom = {
        maring: this.get('imageType') || 'png',
        printDelay: this.get('printDelay') || '...',
        waitForJS: this.get('waitForJS') || '...'
      }
    }
  })
})