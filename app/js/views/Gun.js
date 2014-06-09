define([
    'jquery',
    'underscore',
    'marionette',
    'app',
    'text!templates/gun.html'
], function(
    $,
    _,
    Marionette,
    app,
    template
    ) {

    return Backbone.Marionette.ItemView.extend({
        template: _.template(template),
        tagName: 'li',
        className: 'gun button',

        events: {
            "click": "onClick"
        },

        onClick: function(e) {
            app.data.staging.add(this.model);
        }
    });
});