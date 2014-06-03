define([
    'underscore',
    'marionette',
    'text!templates/base.html'
], function(
    _,
    Marionette,
    template
    ) {

	MyItemView = Backbone.Marionette.ItemView.extend({});

	return Backbone.Marionette.CollectionView.extend({
	  itemView: MyItemView
	});
});