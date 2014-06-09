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

    application.data = {};


    return application;
});
