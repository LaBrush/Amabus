App.FavorisNewController = App.FavorisEditController.extend({
	actions: {
		delete: function(){
			this.get('model').deleteRecord();
			this.transitionToRoute('favoris.index');
		}
	}
});