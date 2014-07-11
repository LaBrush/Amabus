App.Router.map(function() {
	this.resource('favoris', function(){

		this.route('new');
		this.route('edit', {path: ':favori_id'});

	});

	this.route('guidage', {path: 'guidage/:favori_id'});
	this.route('sync', {path: 'sauvegarde'});
	this.route('about', {path: 'apropos'});
});

App.IndexRoute = Ember.Route.extend({
	model: function() {
		return this.store.find('favori');
	}
});	

App.GuidageRoute = Ember.Route.extend({

	model: function(params) {

		var that = this ;

		return new Ember.RSVP.Promise(function(resolve){

			var res = {};
			var isComplete = function(){
				if(res.pos && res.favori){

					var url = '/api/guidage?from[lat]=' + res.pos.latitude + '&from[lng]=' + res.pos.longitude 
							+ '&to[lat]=' + res.favori.get('latitude') + '&to[lng]=' + res.favori.get('longitude')
					;

					Ember.$.getJSON(url).then(function(trajet){
						res.trajet = trajet ;
						resolve(Ember.Object.create(res));
					});

				}
			};

			getPosition()
			.then(function(pos){
				res.pos = pos ;
				isComplete();
			});

			that.store.find('favori', params.favori_id)
			.then(function(favori){ 
				res.favori = favori ; 
				isComplete();
			});
		});
	}
});

App.FavorisIndexRoute = Ember.Route.extend({
	model: function() {
		return this.store.find('favori');
	}
});

App.FavorisNewRoute = Ember.Route.extend({
	model: function(){

		return this.store.createRecord('favori',{
			name: 'Hacklab',
			address: '1 Place Saint-Laurent 38000 Grenoble',
			latitude: 45.1977842, 
			longitude: 5.7313602
		});

	}
});

App.FavorisEditRoute = Ember.Route.extend({
	model: function(params) {
		return this.store.find('favori', params.favori_id);
	}
});