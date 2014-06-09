define([
    'underscore',
    'marionette'
], function(
    _,
    Marionette
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
        }


    });
});