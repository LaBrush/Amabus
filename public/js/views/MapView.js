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