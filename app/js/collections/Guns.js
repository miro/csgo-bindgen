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
            var kevlar = false;
            var kevHelm = false;

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

                if (gunModel.get('code') === 'kevlar') {
                    kevlar = true;
                }
                if (gunModel.get('code') === 'vesthelm') {
                    kevHelm = true;
                }
            });

            // Check for special case - if there are both kevlar and kevlar&helm,
            // ignore the first from the sum
            if (kevlar && kevHelm) {
                var kevlarPrice = _.find(this.models, function(model) { return model.get('code') === 'kevlar';}).get('price');
                sums[0] -= kevlarPrice;
                sums[1] -= kevlarPrice;
            }
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