define([
    'jquery',
    'underscore',
    'marionette',
    'app',
    'config',
    'views/Bind',
    'text!templates/binds.html'
], function(
    $,
    _,
    Marionette,
    app,
    config,
    BindView,
    template
) {

    NoItemsView = Backbone.Marionette.ItemView.extend({
        template: _.template('<p>No Binds</p>'),
        tagName: 'div',
        className: 'bind clearfix none'
    });

    return Backbone.Marionette.CompositeView.extend({
        template: _.template(template),
        className: 'binds-view',
        itemView: BindView,
        itemViewContainer: '#binds',
        emptyView: NoItemsView,

        events: {
            "click #generate":  "generateCfg",
            "click #save":      "saveCfg",
            "click #back":      "goBack"
         },

        generateCfg: function generateCfg() {
            var scripts = "";
            _.each(app.data.binds.models, function(bindModel) {
                scripts += bindModel.getBindingString() + '\n';
            });

            window.prompt("Copy Buyscripts to clipboard: press Ctrl+C, Enter", scripts);
        },

        saveCfg: function saveCfg() {
            app.vent.trigger('config:save');
        },

        goBack: function goBack() {
            // go back to previous .net view
            window.location = config.siteRootUrl + '/edit/' + config.viewKey + '?key=' + config.secretKey;
        }
    });
});
