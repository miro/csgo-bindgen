define([
    'jquery',
    'underscore',
    'marionette',
    'app',
    'text!templates/staginggun.html'
], function(
    $,
    _,
    Marionette,
    app,
    template
    ) {

    return Backbone.Marionette.ItemView.extend({
        template: _.template(template),
        tagName: 'button',
        className: 'gun',

        events: {
            "click .staging-remove": "unstage"
        },

        unstage: function(e) {
            app.data.staging.remove(this.model);
        }
    });
});