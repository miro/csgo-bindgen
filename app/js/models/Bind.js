define([
    'underscore',
    'marionette'
], function(
    _,
    Marionette
    ) {

    return Backbone.Model.extend({
        
        initialize: function() {
            console.log("Bind Model initialize");
        },

        getBindingString: function getBindingString() {
            console.log(this.get('key'), this.get('guns'));
        }
    });
});