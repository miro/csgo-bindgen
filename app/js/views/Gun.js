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
        tagName: 'button',
        className: 'gun',

        events: {
            "click": "onClick"
        },

        initialize: function() {
            this.model.set('isSelected', false);
            this.listenTo(app.vent, 'bind:created', this.unSelect);
        },

        onClick: function(e) {
            this.model.set('isSelected', !this.model.get('isSelected'));
            $(this.el).toggleClass('selected');
        },

        unSelect: function() {
            this.model.set('isSelected', false);
            $(this.el).removeClass('selected');
        }
    });
});