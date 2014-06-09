define([
    'jquery',
    'underscore',
    'marionette',
    'app',
    'views/StagingGun'
], function(
    $,
    _,
    Marionette,
    app,
    StagingGun
    ) {

    return Backbone.Marionette.CompositeView.extend({
        template: _.template('<div id="staging"></div>'),
        className: 'staging-view',
        itemView: StagingGun,
        itemViewContainer: '#staging'
    });
});