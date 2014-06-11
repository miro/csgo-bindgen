define([
    'jquery',
    'underscore',
    'marionette',
    'app',
    'views/Bind',
    'text!templates/binds.html'
], function(
    $,
    _,
    Marionette,
    app,
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
            "click #generate": "generateCfg"
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