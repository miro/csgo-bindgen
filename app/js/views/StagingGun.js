define([
    'jquery',
    'underscore',
    'marionette',
    'app',
    'text!templates/staginggun.html'
], function(
    $,
    _,
    Marionette,
    app,
    template
    ) {

    return Backbone.Marionette.ItemView.extend({
        template: _.template(template),
        tagName: 'li',
        className: 'gun clearfix',

        events: {
            "click .staging-remove": "unstage"
        },

        serializeData: function() {
            var data = Marionette.ItemView.prototype.serializeData.apply(this);
            var price = this.model.get('price');
            data = _.extend(data, {
                prices: (price instanceof Array ? price : [price])
            });
            return data;
        },

        unstage: function(e) {
            app.data.staging.remove(this.model);
        }
    });
});