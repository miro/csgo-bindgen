define([
    'underscore',
    'marionette',
    'app'
], function(
    _,
    Marionette,
    app
    ) {

    return Backbone.Collection.extend({

        getPrices: function() {
            // NOTE: this could also be a function of StagingGunsCollection.. if we had such thing
            var sums = [0, 0];

            // Gather CT & T prices
            _.each(this.models, function(gunModel) {
                var price = gunModel.get('price');
                if (price instanceof Array) {
                    for (var i = 0; i < price.length; ++i) {
                        sums[i] += price[i];
                    }
                }
                else {
                    for (var i = 0; i < sums.length; ++i) {
                        sums[i] += price;
                    }
                }
            });
            return sums;
        },

        unstage: function(removedGun) {
            this.remove(removedGun);

            var remaining = _.filter(this.models, function(model) {
                return removedGun.get('name') === model.get('name');
            });

            if (remaining.length === 0) {
                app.vent.trigger('lastgun:unstaged', removedGun);
            }
        }


    });
});