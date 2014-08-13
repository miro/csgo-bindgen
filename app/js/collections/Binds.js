define([
    'underscore',
    'marionette',
    'jquery',
    'models/Bind',
    'config'
], function(
    _,
    Marionette,
    $,
    BindModel,
    config
    ) {

    return Backbone.Collection.extend({

        model: BindModel,
        viewKey: null,
        secretKey: null,

        url: function() {
            return config.apiUrl + 
                'Buybind?viewkey=' + this.viewKey + 
                '&editkey=' + this.secretKey; 
        },

        initialize: function(models, options) {
            this.viewKey = options.viewKey;
            this.secretKey = options.secretKey;
        },

        isKeyBinded: function(keyModel) {
            var temp = _.find(this.models, function(model) {
                return model.get('key').get('code') === keyModel.get('code');
            });

            return (!temp ? false : true);
        },

        // Not sure if it is stupid to override Backbone functionality for this,
        // but seemed an easy way to achieve results. Revise later
        // TODO: 
        // - we are sending everything to the server, for eg gun prices. Unnecessary overhead.
        sendBindsToServer: function() {
            var self = this;

            $.ajax({
                url: self.url(),
                type: 'POST',

                data: '=' + JSON.stringify(self.models),
                dataType: 'text'
            })
            .done(function(data, status) {
                console.log("Configs succesfully saved to the server");
            })
            .fail(function(data, status) {
                console.log("Error while saving configs to the server");
            });
        },

        getBindsFromServer: function() {
            var self = this;

            $.ajax({
                url: self.url(),
                type: 'GET',
            })
            .done(function(data, status) {
                if (_.isNull(data)) return;

                var payload = JSON.parse(data.Value);
                var models = [];
                _.each(payload, function(hash) {
                    var model = new BindModel();
                    model.parseFromHash(hash);
                    models.push(model);
                })
                if (models.length > 0) {
                    self.reset(models);
                }
            })
            .fail(function(data, status) {
                console.log("Error while fetching data from server");
            });
        }


    });
});
