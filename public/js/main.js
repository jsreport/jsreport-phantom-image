define('phantom.template.view',["app", "underscore", "marionette", "core/view.base"], function(app, _, Marionette, ViewBase) {
    return ViewBase.extend({
        tagName: "li",
        template: "phantom-template",
         
          initialize: function() {
            _.bindAll(this, "isFilled");
        },

        isFilled: function() {
            return this.model.isDirty();
        },
        
         onClose: function() {
             this.model.templateModel.unbind("api-overrides", this.model.apiOverride, this.model);
         }
    });
});
define('phantom.template.model',["app", "core/basicModel", "underscore"], function (app, ModelBase, _) {
   
    return ModelBase.extend({
        
        setTemplate: function (templateModel) {
            this.templateModel = templateModel;

            if (templateModel.get("phantom")) {
                if (templateModel.get("phantom").isModel)
                    this.set(templateModel.get("phantom").toJSON());
                else
                    this.set(templateModel.get("phantom"));
            }

            templateModel.set("phantom", this, { silent: true});

            if (this.get("orientation") == null)
                this.set("orientation", "portrait");

            
            if (this.get("format") == null) {
                this.set("format", "A4");
            }

            this.listenTo(this, "change", function() {
                templateModel.trigger("change");
            });

            this.listenTo(templateModel, "api-overrides", this.apiOverride);
        },
        
        isDirty: function() {
            return this.get("margin") != null || this.get("header") != null || this.get("footer") != null ||
                this.get("width") != null || this.get("height") != null || this.get("orientation") !== "portrait" ||
                this.get("format") !== "A4" || this.get("printDelay");
        },
        
        apiOverride: function(req) {
            req.template.phantom = {
                    maring: this.get("margin") || "...",
                    header: this.get("header") || "...",
                    footer: this.get("footer") || "...",
                    headerHeight: this.get("headerHeight") || "...",
                    footerHeight: this.get("footerHeight") || "...",
                    format: this.get("format") || "...",
                    orientation: this.get("orientation") || "...",
                    width: this.get("width") || "...",
                    height: this.get("height") || "...",
                    printDelay: this.get("printDelay") || "...",
                    waitForJS: this.get("waitForJS") || "..."
                };
        }
    });
});
define(["jquery", "app", "marionette", "backbone", "phantom.template.view", "phantom.template.model"],
    function($, app, Marionette, Backbone, TemplateView, Model) {

        app.on("template-extensions-render", function(context) {
            var view;

            function renderRecipeMenu() {
                if (context.template.get("recipe") === "phantom-pdf") {
                    var model = new Model();
                    model.setTemplate(context.template);
                    view = new TemplateView({ model: model});
                    
                    context.extensionsRegion.show(view, "phantom");
                } else {
                    if (view != null)
                        $(view.el).remove();
                }
            }

            renderRecipeMenu();

            context.template.on("change:recipe", function() {
                renderRecipeMenu();
            });
        });
    });
