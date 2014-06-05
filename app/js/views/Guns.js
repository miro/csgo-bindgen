define([
    'underscore',
    'marionette',
    'text!templates/guns.html',
    'text!templates/gun.html',
    'text!data/guns-data.json'
], function(
    _,
    Marionette,
    template,
    gunTemplate,
    gunsJSON
    ) {

    MyItemView = Backbone.Marionette.ItemView.extend({template: _.template(gunTemplate)});



    return Backbone.Marionette.CompositeView.extend({
        template: _.template(template),
        className: 'guns-view',
        itemView: MyItemView,
        itemViewContainer: '#guns',

        initialize: function() {
            this.collection = new Backbone.Collection(_.flatten(JSON.parse(gunsJSON)));
        }
    });
});