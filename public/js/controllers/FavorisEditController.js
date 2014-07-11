App.FavorisEditController = Ember.ObjectController.extend({
		actions: {
		save: function(){
			this.get('model').save();
			this.transitionToRoute('favoris.index');
		},

		delete: function(){
			this.get('model').destroyRecord();
			this.transitionToRoute('favoris.index');		
		},

		coordinatesChanged: function(lat, lng) {
			
			var that = this ;

			Ember.$.getJSON('http://maps.googleapis.com/maps/api/geocode/json?sensor=false&region=fr&language=fr&latlng=' + lat + ',' + lng)
			.then(function(res){

				res = res.results[0];

				that.set('address', res.formatted_address);	
				that.set('longitude', res.geometry.location.lng);
				that.set('latitude', res.geometry.location.lat);

			});
		},

		addressChanged: function(){

			var that = this ;

			Ember.$.getJSON('http://maps.googleapis.com/maps/api/geocode/json?sensor=false&region=fr&language=fr&address=' + this.get('address'))
			.then(function(res){

				res = res.results[0];

				that.set('address', res.formatted_address);	
				that.set('longitude', res.geometry.location.lng);
				that.set('latitude', res.geometry.location.lat);

			});
		}
	}
});