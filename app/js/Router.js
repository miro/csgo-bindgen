define([
    'underscore',
    'marionette',
    'app',
    'config',
    'views/Base'
], function(
    _,
    Marionette,
    app,
    config,
    BaseView
) {
   
    return Marionette.AppRouter.extend({

        routes: {
            // Backbone requires some text after * for the default catcher to work
            '': 'home'
        },

        home: function() {
            var baseView = new BaseView();
            // no access without key&secretkey, forward to site root
            window.location.href = config.siteRootUrl;
        },
            app.mainRegion.show(baseView);
        }
    });

});
