define([
    'jquery',
    'underscore',
    'marionette',
    'app',
    'text!templates/notification.html'
], function(
    $,
    _,
    Marionette,
    app,
    template
) {
    return Backbone.Marionette.ItemView.extend({
        template: _.template(template),
        className: 'notification-box',

        events: {
            'click': 'hideNotification'
        },

        model: new Backbone.Model({notificationText: ''}),

        initialize: function(options) {
            this.model.on('change', this.render);
            this.listenTo(app.vent, 'notification', this.triggerNotification);
        },

        triggerNotification: function showNotification(event) {
            var self = this;
            this.model.set('notificationText', event.message);

            if (event.type === 'error') {
                $(this.el).addClass('error');
            } else {
                $(this.el).removeClass('error');
            }
            
            this.showNotification();

            // after interval, hide the notification
            setTimeout(function() {
                self.hideNotification();
            }, 3000);
        },

        hideNotification: function() {
            $(this.el).css('opacity', 0);

            setTimeout(function() {
                $(self.el).css({'display': 'none', 'top': '-10000px'});
            }, 100);
        },

        showNotification: function() {
            var self = this;
            $(this.el).css({'display': 'block', 'top': '20%'});

            setTimeout(function() {
                $(self.el).css('opacity', 1);
            }, 30); // hack to allow the fade in to happen
        }
        
    });
});
