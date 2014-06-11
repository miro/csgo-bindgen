define([
    'jquery',
    'underscore',
    'marionette',
    'views/Bind',
    'text!templates/binds.html'
], function(
    $,
    _,
    Marionette,
    BindView,
    template
    ) {

    NoItemsView = Backbone.Marionette.ItemView.extend({
        template: _.template('<p>No Binds</p>'),
        tagName: 'div',
        className: 'bind clearfix none'
    });

    return Backbone.Marionette.CompositeView.extend({
        template: _.template(template),
        className: 'binds-view',
        itemView: BindView,
        itemViewContainer: '#binds',
        emptyView: NoItemsView
    });
});