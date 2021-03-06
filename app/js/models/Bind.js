define([
    'underscore',
    'marionette'
], function(
    _,
    Marionette
    ) {

    return Backbone.Model.extend({

        getBindingString: function getBindingString() {
            var script = 'bind ' + '"' + this.get('key').get('code') + '" "';
            
            _.each(this.get('guns'), function getBuyCommands(gun) {
                var gunCodes = gun.get('code');
                gunCodes = gunCodes instanceof Array ? gunCodes : [gunCodes];
                _.each(gunCodes, function(gunCode) {
                    script += ('buy ' + gunCode + ';');
                });
            });

            script += '"'; // ending "
            return script;
        },

        getBindingPrice: function() {
            var totalPrices = [0,0]; // CT-price & terrorist-price
            var guns = this.get('guns');
            
            _.each(guns, function(gunModel) {
                var prices = gunModel.get('price');
                prices = (prices instanceof Array ? prices : [prices, prices]);

                for (var i = 0; i < prices.length; ++i) {
                    totalPrices[i] += prices[i];
                }
            });

            var returnValue = {
                ctPrice: totalPrices[0],
                tPrice: totalPrices[1]
            };

            return returnValue;
        },

        parseFromHash: function(data) {            
            var keyModel = new Backbone.Model(data.key);
            var gunsList = [];
            _.each(data.guns, function(gunHash) {
                gunsList.push(new Backbone.Model(gunHash));
            });

            this.set('key', keyModel);
            this.set('guns', gunsList);
        }
    });
});
