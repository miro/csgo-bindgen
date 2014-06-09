define([
    'underscore',
    'marionette',
    'text!templates/guns.html',
    'views/Gun',
    'text!data/guns-data.json'
], function(
    _,
    Marionette,
    template,
    GunView,
    gunsJSON
    ) {

    return Backbone.Marionette.CompositeView.extend({
        template: _.template(template),
        className: 'guns-view',
        itemView: GunView,
        itemViewContainer: '#guns',

        initialize: function() {
            this.collection = new Backbone.Collection(_.flatten(JSON.parse(gunsJSON)));
        },

        getSelected: function() {
            var selectedModels =  _.filter(this.collection.models, function filterUnSelected(model) {
                return model.get('isSelected');
            });
            return selectedModels;
        }
    });
});