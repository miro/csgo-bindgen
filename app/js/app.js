/** @jsx React.DOM */
define([
    'underscore',
    'marionette'
], function(
    _,
    Marionette
) {

    var application = new Backbone.Marionette.Application();

    application.addRegions({
        mainRegion: '#root'
    });

    application.data = {}; // Holder for all the app's data

    // Event bus
    application.vent = _.clone(Backbone.Events);

    return application;
});
