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

    NoItemsView = Backbone.Marionette.ItemView.extend({
        template: _.template('No Binds'),
        tagName: 'div',
        className: 'bind clearfix'
    });

    return Backbone.Marionette.CollectionView.extend({
        template: _.template('<div id="binds"></div>'),
        className: 'binds-view',
        itemView: BindView,
        itemViewContainer: '#binds',
        emptyView: NoItemsView
    });
});