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

    // This view is used to "stage" binding
    // User selects weapons to the staging area, and after pressing "bind",
    // weapons from staging area comes to the actual binding
    return Backbone.Marionette.CompositeView.extend({
        template: _.template('<div id="staging"></div>'),
        className: 'staging-view',
        itemView: StagingGun,
        itemViewContainer: '#staging'
    });
});