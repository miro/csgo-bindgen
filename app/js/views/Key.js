define([
    'jquery',
    'underscore',
    'marionette',
    'views/ButtonView',
    'text!templates/key.html'
], function(
    $,
    _,
    Marionette,
    ButtonView,
    template
    ) {

    return ButtonView.extend({
        template: _.template(template),
        tagName: 'button',
        className: 'key'
    });
});