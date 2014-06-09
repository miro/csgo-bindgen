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

        lastGunClass: null, // In here we store the last seen gun class of our models (horrible comment arg idk)

        initialize: function() {
            this.collection = new Backbone.Collection(_.flatten(JSON.parse(gunsJSON)));
        },

        getSelected: function() {
            var selectedModels =  _.filter(this.collection.models, function filterUnSelected(model) {
                return model.get('isSelected');
            });
            return selectedModels;
        },

        buildItemView: function(model, ItemViewType, itemViewOptions) {
            var subheaderText = null;
            if (this.lastGunClass != model.get('class')) {
                subheaderText = model.get('class');
            }
            this.lastGunClass = model.get('class');

            var options = _.extend({
                    model: model,
                    subheaderText: subheaderText
                },
                itemViewOptions
            );

            var view = new GunView(options);
            return view;
        },
    });
});