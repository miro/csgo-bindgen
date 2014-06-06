define([
    'jquery',
    'underscore',
    'marionette',
    'app',
    'text!templates/key.html'
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
        className: 'key',

        events: {
            'click':    'select'
        },

        initialize: function() {
            this.model.set('isSelected', false);
            this.listenTo(app.vent, 'key:selected', this.unSelect);
        },

        select: function() {
            app.vent.trigger('key:selected');

            this.model.set('isSelected', true);
            $(this.el).addClass('selected');
        },

        unSelect: function() {
            this.model.set('isSelected', false);
            $(this.el).removeClass('selected');
        }

    });
});