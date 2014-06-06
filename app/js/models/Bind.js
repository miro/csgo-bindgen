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
            var script = 'bind ' + '"' + this.get('key').get('key') + '" "';
            
            _.each(this.get('guns'), function getBuyCommands(gun) {
                var gunCodes = gun.get('code');
                gunCodes = gunCodes.length ? gunCodes : [gunCodes];
                _.each(gunCodes, function(gunCode) {
                    script += (' buy ' + gunCode + ';');
                });
            });

            script += '"'; // ending "
            return script;
        }
    });
});