define([
    'underscore',
    'marionette',
    'app',
    'collections/Binds',
    'collections/Guns',
    'views/Numpad',
    'views/Guns',
    'views/Staging',
    'views/Controls',
    'views/Binds',
    'models/Bind',
    'text!templates/base.html'
], function(
    _,
    Marionette,
    app,
    BindsCollection,
    GunsCollection,
    NumpadView,
    GunsView,
    StagingView,
    ControlsView,
    BindsView,
    BindModel,
    template
    ) {

    return Marionette.Layout.extend({

        className: "base-wrap clearfix",

        template: _.template(template),

        regions: {
            numpadRegion: '#numpad-wrap',
            gunsRegion: '#guns-wrap',
            stagingRegion: '#staging-wrap',
            bindsRegion: '#binds-wrap',
            controlsRegion: '#controls-wrap'
        },

        events: {
            'click .cfg':       'generateCfg'
        },

        initialize: function(options) {
            // Collections
            app.data.binds = new BindsCollection([], {
                viewKey: options.viewKey,
                secretKey: options.secretKey
            });
            app.data.staging = new GunsCollection();

            // Views
            this.numpadView = new NumpadView();
            this.gunsView = new GunsView();
            this.stagingView = new StagingView({collection: app.data.staging});
            this.bindsView = new BindsView({collection: app.data.binds});
            this.controlsView = new ControlsView();

            if (!_.isUndefined(options.secretKey) && !_.isUndefined(options.viewKey)) {
                app.data.binds.getBindsFromServer();
            }

            this.listenTo(app.vent, 'bind:create', this.createBind);
            this.listenTo(app.vent, 'config:save', this.saveConfig); 

        },

        onRender: function() {
            this.numpadRegion.show(this.numpadView);
            this.gunsRegion.show(this.gunsView);
            this.stagingRegion.show(this.stagingView);
            this.bindsRegion.show(this.bindsView);
            this.controlsRegion.show(this.controlsView);
        },

        createBind: function() {
            var selectedKey = this.numpadView.getSelected();
            var selectedGuns = app.data.staging.models;

            if (!selectedKey) {
                alert("Select a Key!");
                return;
            }
            if (!selectedGuns || selectedGuns.length === 0) {
                alert("Select at least one Gun!");
                return;
            }

            if (app.data.binds.isKeyBinded(selectedKey)) {
                alert("Key already binded!");
                return;
            }

            var bindModel = new BindModel({
                key: selectedKey,
                guns: selectedGuns
            });

            app.data.binds.add(bindModel);
            app.data.staging.reset([]);
            app.vent.trigger('bind:created');
            console.log(bindModel.getBindingString());
        },

        saveConfig: function saveConfig() {
            app.data.binds.sendBindsToServer();
        }
        
    });
});
