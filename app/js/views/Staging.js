define([
    'jquery',
    'underscore',
    'marionette',
    'app',
    'views/StagingGun',
    'text!templates/staging.html'
], function(
    $,
    _,
    Marionette,
    app,
    StagingGun,
    template
    ) {

    // This view is used to "stage" binding
    // User selects weapons to the staging area, and after pressing "bind",
    // weapons from staging area comes to the actual binding

    NoItemsView = Backbone.Marionette.ItemView.extend({
        template: _.template('<p>No selected Guns</p>'),
        tagName: 'li',
        className: 'gun clearfix none'
    });

    return Backbone.Marionette.CompositeView.extend({
        template: _.template(template),
        className: 'staging-view',
        itemView: StagingGun,
        emptyView: NoItemsView,
        itemViewContainer: '#staging',

        events: {
            'click .bind': 'createBind'
        },

        initialize: function() {
            this.listenTo(this.collection, "add remove reset change", this.updateTotalPrice);
        },


        updateTotalPrice: function() {
            // Hacky way to update the total price of staging.
            // Didn't want to battle with Marionette (https://github.com/marionettejs/backbone.marionette/issues/640)

            var totalPrices = this.collection.getPrices();
            var formattedTotalPrices = "= $" + totalPrices[0];

            if (totalPrices[0] === 0) {
                formattedTotalPrices = "";
            }
            else if (totalPrices[0] !== totalPrices[1]) {
                formattedTotalPrices += " / " + totalPrices[1];
            }
            $(this.el).find('#totalprice').text(formattedTotalPrices);
        },



        createBind: function() {
            app.vent.trigger('bind:create');
        }
    });
});