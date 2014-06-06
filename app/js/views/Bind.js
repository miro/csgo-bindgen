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
        className: 'bind'

    });
});