App = Ember.Application.create();

// GESTION DES TEMPLATES

	var templates = [

		'index',
		'map',
		'guidage',
		'sync',
		'about',
		'favoris/index',
		'favoris/new',
		'favoris/edit'

	];

	for (var i = 0, c = templates.length ; i < c; i++) {
		
		$.ajax('views/' + templates[i] + '.hbs', { async: false })
		.success(function(rep){ 
			Ember.TEMPLATES[templates[i]] = Ember.Handlebars.compile(rep);  
		});

	};

// AJOUT DE LA GESTION DE GMAPS

	App.MapWithCoordinatesView = Ember.View.extend({
		templateName: "map"
	});
	
	App.MapView = Ember.View.extend({
		didInsertElement: function() {

			var $this = $(this.$());
			$(window).resize(function(){

				$this.width(
					$this.parent().width()
				);

			});

			// this is required for the map to be rendered
			$this.css({ width: $this.parent().width(), height: "300px" });
			var center = new google.maps.LatLng(this.get("latitude"),this.get("longitude"));
			var options = {
				disableDefaultUI: true,
				center: center,
				zoom: 15,
				mapTypeId: google.maps.MapTypeId.ROADMAP
			};

			var map = new google.maps.Map(this.$()[0], options);
			var marker = new google.maps.Marker({ position: center, map: map, draggable: true });

			this.set("marker", marker);
			this.set("map", map);

			var that = this;
			this.set('dragging', false);
			// add a listener on the "drag" event of the marker
			google.maps.event.addListener(marker, "dragend", function() {
				that.set("dragging", true);

				var position = marker.getPosition();
				that.get('controller').send('coordinatesChanged', position.lat(), position.lng());
			});

			google.maps.event.addListener(marker, "dragstart", function() { that.set("dragging", true); });
		},

		markerMoved: function(){
			var position = new google.maps.LatLng(this.get("latitude"), this.get("longitude"));
			// only center the map when the position has been changed by changing the textfields
			if (!this.get("dragging")) { this.get("map").setCenter(position); }
			this.get("marker").setPosition(position);			

			this.set("dragging", false);

		}.observes('longitude'), //On étudie que la longitude mais les deux sont modfiés en même temps
		
		willDestroyElement: function() {
			google.maps.event.clearInstanceListeners(this.get("marker"));
		}
	});

//GESTION DU MODEL

	App.Favori = DS.Model.extend({
		name: DS.attr('string'),
		address: DS.attr('string'),

		longitude: DS.attr('number'),
		latitude: DS.attr('number')
	});



	App.ApplicationAdapter = DS.RESTAdapter.extend({
		namespace: 'api',
		host: 'http://localhost:8888'
	});

	DS.RESTSerializer.reopen({
 		primaryKey: '_id'
	});


	// App.ApplicationSerializer = DS.LSSerializer.extend();
	// App.ApplicationAdapter = DS.LSAdapter.extend({namespace: 'amabus-ember'});
	
	// App.ApplicationAdapter = DS.FixtureAdapter;
	// App.Favori.FIXTURES = [
		// { id: 1, name: 'Maison', address: '200 route des Rieux', latitude: 45.19677, longitude: 5.7334 },
		// { id: 2, name: 'Baptiste', address: '45 chemin du piat', latitude: 45.19377, longitude: 5.7394 },
		// { id: 3, name: 'Lycée', address: '2 avenue du taillefer', latitude: 45.18677, longitude: 5.7314 }
	// ];

// GESTION DES ROUTES

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
			return this.store.find('favori', params.favori_id);
		}
	});

	App.FavorisIndexRoute = Ember.Route.extend({
		model: function() {
			return this.store.find('favori');
		}
	});

	App.FavorisNewRoute = Ember.Route.extend({

		controllerName: 'FavorisEdit',

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

// LES CONTROLLEURS

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

				$.ajax({
					url: ('http://maps.googleapis.com/maps/api/geocode/json?sensor=false&region=fr&language=fr&latlng=' + lat + ',' + lng),
					dataType: "json"
				})
				.then(function(res){

					res = res.results[0];

					that.set('address', res.formatted_address);	
					that.set('longitude', res.geometry.location.lng);
					that.set('latitude', res.geometry.location.lat);

				});

			},

			addressChanged: function(){

				var that = this ;

				$.ajax({
					url: ('http://maps.googleapis.com/maps/api/geocode/json?sensor=false&region=fr&language=fr&address=' + this.get('address')),
					dataType: "json"
				})
				.then(function(res){

					res = res.results[0];

					that.set('address', res.formatted_address);	
					that.set('longitude', res.geometry.location.lng);
					that.set('latitude', res.geometry.location.lat);

				});
			}
		}
	});
