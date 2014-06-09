define([
    'underscore',
    'marionette',
    'app',
    'collections/Binds',
    'views/Numpad',
    'views/Guns',
    'views/Staging',
    'views/Binds',
    'models/Bind',
    'text!templates/base.html'
], function(
    _,
    Marionette,
    app,
    BindsCollection,
    NumpadView,
    GunsView,
    StagingView,
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
            bindsRegion: '#binds-wrap'
        },

        events: {
            'click .cfg':       'generateCfg'
        },

        initialize: function(options) {
            app.data.binds = new BindsCollection();
            app.data.staging = new Backbone.Collection();
            app.data.binds.model = BindModel;

            this.numpadView = new NumpadView();
            this.gunsView = new GunsView();
            this.stagingView = new StagingView({collection: app.data.staging});
            this.bindsView = new BindsView({collection: app.data.binds});

            this.listenTo(app.vent, 'bind:create', this.createBind);
        },

        onRender: function() {
            this.numpadRegion.show(this.numpadView);
            this.gunsRegion.show(this.gunsView);
            this.stagingRegion.show(this.stagingView);
            this.bindsRegion.show(this.bindsView);
        },

        createBind: function() {
            var selectedKey = this.numpadView.getSelected();
            var selectedGuns = app.data.staging.models;

            if (!selectedKey || !selectedGuns) {
                return;
            }

            if (app.data.binds.isKeyBinded(selectedKey)) {
                console.log("Key already binded!");
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

        generateCfg: function generateCfg() {
            var scripts = "";
            _.each(app.data.binds.models, function(bindModel) {
                scripts += bindModel.getBindingString() + '\n';
            });

            window.prompt("Copy Buyscripts to clipboard: press Ctrl+C, Enter", scripts);
        }
    });
});