define([
    'jquery',
    'underscore',
    'marionette',
    'app',
    'text!templates/gun.html'
], function(
    $,
    _,
    Marionette,
    app,
    template
    ) {

    return Backbone.Marionette.ItemView.extend({
        template: _.template(template),
        tagName: 'li',

        className: 'gun button',

        subheaderText: null,

        events: {
            "click": "onClick"
        },

        initialize: function(options) {
            this.subheaderText = options.subheaderText;
            this.listenTo(app.vent, 'lastgun:unstaged', this.itemUnstaged);
            this.listenTo(app.vent, 'bind:created', this.unselect);
        },

        onRender: function() {
            if (!_.isNull(this.subheaderText)) {
                $(this.el).addClass('classFirst');
            }
        },

        serializeData: function() {
            var data = Marionette.ItemView.prototype.serializeData.apply(this);
            data = _.extend(data, {
                subheaderText: this.subheaderText
            });
            return data;
        },

        onClick: function(e) {
            $(this.el).addClass('selected');
            app.data.staging.add(this.model.clone());
        },

        itemUnstaged: function(unstagedGun) {
            if (this.model.get('name') === unstagedGun.get('name')) {
                this.unselect();
            }
        },

        unselect: function() {
            $(this.el).removeClass('selected');
        }
    });
});
