define([
    'jquery',
    'underscore',
    'marionette',
    'views/ButtonView',
    'text!templates/gun.html'
], function(
    $,
    _,
    Marionette,
    ButtonView,
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
        },

        onClick: function(e) {
            this.model.set('isSelected', !this.model.get('isSelected'));
            $(this.el).toggleClass('selected');
        }
    });
});