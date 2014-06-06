define([
    'jquery',
    'underscore',
    'marionette',
    'views/Bind'
], function(
    $,
    _,
    Marionette,
    BindView
    ) {

    return Backbone.Marionette.CompositeView.extend({
        template: _.template('<div id="binds"></div>'),
        className: 'binds-view',
        itemView: BindView,
        itemViewContainer: '#binds'
    });
});