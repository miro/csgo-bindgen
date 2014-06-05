define([
    'underscore',
    'marionette',
    'text!templates/numpad.html',
    'text!templates/key.html',
    'text!data/keys-data.json'
], function(
    _,
    Marionette,
    template,
    keyTemplate,
    keysJSON
    ) {

    MyItemView = Backbone.Marionette.ItemView.extend({template: _.template(keyTemplate)});



    return Backbone.Marionette.CompositeView.extend({
        template: _.template(template),
        className: 'numpad-view',
        itemView: MyItemView,
        itemViewContainer: '#buttons',

        initialize: function() {
            this.collection = new Backbone.Collection(_.flatten(JSON.parse(keysJSON)));
        }
    });
});