define([
    'underscore',
    'marionette',
    'app',
    'text!templates/numpad.html',
    'views/Key',
    'text!data/keys-data.json'
], function(
    _,
    Marionette,
    app,
    template,
    KeyView,
    keysJSON
    ) {

    return Backbone.Marionette.CompositeView.extend({
        template: _.template(template),
        className: 'numpad-view',
        itemView: KeyView,
        itemViewContainer: '#buttons',

        ui: {
            customKeyBtn:      'div.customkey',
            customKeyInput:    '#customkey'
        },

        events: {
            'input #customkey': '_selectCustomKey'
        },

        initialize: function() {
            this.collection = new Backbone.Collection(_.flatten(JSON.parse(keysJSON)));

            this.listenTo(app.vent, 'key:selected', this.unSelectCustomKey);
            this.listenTo(app.vent, 'bind:created', this.unSelectCustomKey);
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
                var selectedModels =  _.filter(this.collection.models, function filterUnSelected(model) {
                    return model.get('isSelected');
                });
                return selectedModels[0];
            }
        },

        unSelectCustomKey: function() {
            this.ui.customKeyBtn.removeClass('selected');
            this.ui.customKeyInput.val('');
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