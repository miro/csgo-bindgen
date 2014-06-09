define([
    'underscore',
    'marionette',
    'models/Bind'
], function(
    _,
    Marionette,
    BindModel
    ) {

    return Backbone.Collection.extend({

        model: BindModel,

        isKeyBinded: function(keyModel) {
            var temp = _.find(this.models, function(model) {
                return model.get('key').get('code') === keyModel.get('code');
            });

            return (!temp ? false : true);
        }


    });
});