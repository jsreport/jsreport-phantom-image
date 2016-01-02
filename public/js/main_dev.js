define(['jquery', 'app', 'marionette', 'backbone', './phantom.image.template.view', './phantom.image.template.model'],
  function ($, app, Marionette, Backbone, TemplateView, Model) {
    app.on('template-extensions-render', function (context) {
      var view

      function renderRecipeMenu () {
        if (context.template.get('recipe') === 'phantom-image') {
          console.log('here');
          var model = new Model()
          model.setTemplate(context.template)
          view = new TemplateView({model: model})

          setTimeout(function() {
            context.extensionsRegion.show(view, "phantomImage");
          }, 0);
        } else {
          if (view != null) {
            $(view.el).remove()
          }
        }
      }

      renderRecipeMenu()

      context.template.on('change:recipe', function () {
        renderRecipeMenu()
      })
    })
  })
