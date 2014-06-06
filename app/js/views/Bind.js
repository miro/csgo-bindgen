define([
    'jquery',
    'underscore',
    'marionette',
    'views/ButtonView',
    'text!templates/bind.html'
], function(
    $,
    _,
    Marionette,
    ButtonView,
    template
    ) {

    return ButtonView.extend({
        template: _.template(template),
        tagName: 'div',
        className: 'bind'

    });
});