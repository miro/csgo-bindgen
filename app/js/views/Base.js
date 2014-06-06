define([
    'underscore',
    'marionette',
    'app',
    'text!templates/base.html',
    'views/Numpad',
    'views/Guns',
    'views/Binds',
    'models/Bind'
], function(
    _,
    Marionette,
    app,
    template,
    NumpadView,
    GunsView,
    BindsView,
    BindModel
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
            app.data.binds = new Backbone.Collection();
            app.data.binds.model = BindModel;

            this.numpadView = new NumpadView();
            this.gunsView = new GunsView();
            this.bindsView = new BindsView({collection: app.data.binds});
        },

        onRender: function() {
            this.numpadRegion.show(this.numpadView);
            this.gunsRegion.show(this.gunsView);
            this.bindsRegion.show(this.bindsView);
        },

        createBind: function() {
            var selectedKey = this.numpadView.getSelected();
            var selectedGuns = this.gunsView.getSelected();

            if (!selectedKey || !selectedGuns) {
                return;
            }

            var bindModel = new BindModel({
                key: selectedKey,
                guns: selectedGuns
            });

            app.data.binds.add(bindModel);
        }
    });
});