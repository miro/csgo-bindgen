define([
    'underscore',
    'marionette',
    'text!templates/base.html',
    'views/Numpad'
], function(
    _,
    Marionette,
    template,
    NumpadView
    ) {

    return Marionette.Layout.extend({

        className: "base-wrap",

        template: _.template(template),

        regions: {
            numpadRegion: '#numpad-wrap',
            gunsRegion: '#guns-wrap',
            bindsRegion: '#binds-wrap'
        },

        events: {
            "click .add-button" : "_addClicked"
        },

        initialize: function(options) {
            var numpadView = new NumpadView();
            this.numpadRegion.show(numpadView);
        },

        onShow: function() {
            // this.details.show(this.detailsView);
        }
    });
});