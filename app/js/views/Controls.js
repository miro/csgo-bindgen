define([
    'jquery',
    'underscore',
    'marionette',
    'app',
    'text!templates/controls.html'
], function(
    $,
    _,
    Marionette,
    app,
    template
    ) {

    return Backbone.Marionette.ItemView.extend({
        template: _.template(template),
        className: 'controls-view',

        events: {
            "click #generate": "generateCfg"
        },

        generateCfg: function generateCfg() {
            var scripts = "";
            _.each(app.data.binds.models, function(bindModel) {
                scripts += bindModel.getBindingString() + '\n';
            });

            window.prompt("Copy Buyscripts to clipboard: press Ctrl+C, Enter", scripts);
        }
    });
});
