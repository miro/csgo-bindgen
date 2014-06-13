define([
    'underscore',
    'marionette',
    'app',
    'text!templates/numpad.html'
], function(
    _,
    Marionette,
    app,
    template
    ) {

    return Backbone.Marionette.ItemView.extend({
        template: _.template(template),
        className: 'numpad-view',
        selectedKeyObject: {}, // Here gets stored the currently selected keycode

        ui: {
            customKeyBtn:      'div.customkey',
            customKeyInput:    '#customkey'
        },

        events: {
            'input #customkey': '_selectCustomKey',
            'click button.key': 'onButtonClick'
        },

        initialize: function() {
            this.listenTo(app.vent, 'key:selected', this.unSelect);
            this.listenTo(app.vent, 'bind:created', this.unSelect);
        },

        onButtonClick: function(event) {
            app.vent.trigger('key:selected');
            $(event.target).addClass('selected');
            this.selectedKeyObject = {
                code: $(event.target).data('key'),
                key: $(event.target).text()
            };
        },

        getSelected: function() {
            var customKey = this.ui.customKeyInput.val();
            if (!_.isUndefined(customKey) && customKey.length > 0) {
                // There was a custom key - use it
                var customKeyModel = new Backbone.Model({
                    key: customKey,
                    code: customKey
                });

                return customKeyModel;
            }
            else {
                // No custom key inputted - look from the numpad keys
                return new Backbone.Model(this.selectedKeyObject);
            }
        },

        unSelect: function() {
            this.ui.customKeyBtn.removeClass('selected');
            this.ui.customKeyInput.val('');
            this.$el.find('button').removeClass('selected');
        },

        _selectCustomKey: function() {

            // store value locally, reset "numpad", insert value again
            // bit hacky.. but it's 00am and can't figure out any better method
            var value = this.ui.customKeyInput.val();
            app.vent.trigger('key:selected');
            this.ui.customKeyInput.val(value);
            
            if (value.length == 0) {
                this.unSelectCustomKey();
            }
            else {
                this.ui.customKeyBtn.addClass('selected');
            }
        }
    });
});