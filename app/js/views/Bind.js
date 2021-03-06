define([
    'jquery',
    'underscore',
    'marionette',
    'text!templates/bind.html'
], function(
    $,
    _,
    Marionette,
    template
    ) {

    return Backbone.Marionette.ItemView.extend({
        template: _.template(template),
        tagName: 'div',
        className: 'bind clearfix',

        events: {
            'click .delete': 'unbind'
        },

        serializeData: function() {
            var data = Marionette.ItemView.prototype.serializeData.apply(this);
            data = _.extend(data, {
                bindingString: this.model.getBindingString(),
                price: this.model.getBindingPrice(),
                key: this.model.get('key').get('key')
            });
            return data;
        },

        unbind: function unbind() {
            var self = this;
            this.$el.fadeOut({
                duration: 400,
                done: function() {
                    self.model.destroy();
                }
            })
        },

        onRender: function(){
            this.$el.hide();
        },
        onShow: function(){
            this.$el.slideDown(400);
        }

    });
});
