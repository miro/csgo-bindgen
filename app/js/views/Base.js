define([
    'underscore',
    'marionette',
    'app',
    'collections/Binds',
    'views/Numpad',
    'views/Guns',
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
            bindsRegion: '#binds-wrap'
        },

        events: {
            "click .bind" : "createBind"
        },

        initialize: function(options) {
            app.data.binds = new BindsCollection();
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

            if (app.data.binds.isKeyBinded(selectedKey)) {
                console.log("Key already binded!");
                return;
            }

            var bindModel = new BindModel({
                key: selectedKey,
                guns: selectedGuns
            });

            app.data.binds.add(bindModel);
            app.vent.trigger('bind:created');
            console.log(bindModel.getBindingString());

        }
    });
});