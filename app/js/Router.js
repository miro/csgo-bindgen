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
            '': 'home',
            'key/:viewKey/secret/:secretKey': 'editor'
        },

        home: function() {
            // no access without key&secretkey, forward to site root
            window.location.href = config.siteRootUrl;
        },

        editor: function(viewKey, secretKey) {
            var baseView = new BaseView({
                viewKey: viewKey,
                secretKey: secretKey
            });
            app.mainRegion.show(baseView);
        }
    });

});
