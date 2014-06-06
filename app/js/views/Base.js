define([
    'underscore',
    'marionette',
    'text!templates/base.html',
    'views/Numpad',
    'views/Guns'
], function(
    _,
    Marionette,
    template,
    NumpadView,
    GunsView
    ) {

    return Marionette.Layout.extend({

        className: "base-wrap clearfix",

        template: _.template(template),

        regions: {
            numpadRegion: '#numpad-wrap',
            gunsRegion: '#guns-wrap',
            bindsRegion: '#binds-wrap'
        },

        events: {
            "click .bind" : "createBind"
        },

        initialize: function(options) {
            this.numpadView = new NumpadView();
            this.gunsView = new GunsView();
        },

        onRender: function() {
            this.numpadRegion.show(this.numpadView);
            this.gunsRegion.show(this.gunsView);
        },

        createBind: function() {
            console.log(this.numpadView.getSelected());
        }
    });
});