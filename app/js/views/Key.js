define([
    'jquery',
    'underscore',
    'marionette',
    'text!templates/key.html'
], function(
    $,
    _,
    Marionette,
    template
    ) {

    return Backbone.Marionette.ItemView.extend({
        template: _.template(template),
        tagName: 'button',
        className: 'key',

        events: {
            "click": "onClick"
        },

        isSelected: false,

        onClick: function(e) {
            this.isSelected = !this.isSelected;
            $(this.el).toggleClass('selected');

            console.log("huraa", this.isSelected, this.model.attributes);
            this.render();
        }
    });
});