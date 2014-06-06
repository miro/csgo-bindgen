define([
    'underscore',
    'marionette',
    'text!templates/numpad.html',
    'views/Key',
    'text!data/keys-data.json'
], function(
    _,
    Marionette,
    template,
    KeyView,
    keysJSON
    ) {

    return Backbone.Marionette.CompositeView.extend({
        template: _.template(template),
        className: 'numpad-view',
        itemView: KeyView,
        itemViewContainer: '#buttons',

        initialize: function() {
            this.collection = new Backbone.Collection(_.flatten(JSON.parse(keysJSON)));
        }
    });
});