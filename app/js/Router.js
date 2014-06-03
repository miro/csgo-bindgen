define([
    'underscore',
    'marionette',
    'app',
    'views/Base'
], function(
    _,
    Marionette,
    app,
    BaseView
) {

   
    return Marionette.AppRouter.extend({


        routes: {
            // Backbone requires some text after * for the default catcher to work
            '': 'home'
        },

        home: function() {
            var baseView = new BaseView();
            app.mainRegion.show(baseView);
        }
    });

});
