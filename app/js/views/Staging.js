define([
    'jquery',
    'underscore',
    'marionette',
    'app',
    'views/StagingGun',
    'text!templates/staging.html'
], function(
    $,
    _,
    Marionette,
    app,
    StagingGun,
    template
    ) {

    // This view is used to "stage" binding
    // User selects weapons to the staging area, and after pressing "bind",
    // weapons from staging area comes to the actual binding
    return Backbone.Marionette.CompositeView.extend({
        template: _.template(template),
        className: 'staging-view',
        itemView: StagingGun,
        itemViewContainer: '#staging',

        events: {
            'click .bind': 'createBind'
        },

        createBind: function() {
            app.vent.trigger('bind:create');
        }
    });
});