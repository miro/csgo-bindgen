define([
    'jquery',
    'underscore',
    'marionette',
], function(
    $,
    _,
    Marionette,
    template
    ) {

    return Backbone.Marionette.ItemView.extend({
        // This is a BASE for togglable button

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