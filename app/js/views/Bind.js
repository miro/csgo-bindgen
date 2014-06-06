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

        serializeData: function() {
            var data = Marionette.ItemView.prototype.serializeData.apply(this);
            data = _.extend(data, {
                bindingString: this.model.getBindingString()
            });
            return data;
        }

    });
});