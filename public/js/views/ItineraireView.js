App.IitineraireView = Ember.View.extend({

	didInsertElement: function() {

		var $this = $(this.$());
		$(window).resize(function(){

			$this.width(
				$this.parent().width()
			);

		});

		// this is required for the map to be rendered
		$this.css({ width: $this.parent().width(), height: "300px" });

		// var waypoints = this.get('waypoints');

		var center = new google.maps.LatLng(45.19377, 5.7394);
		var options = {
			disableDefaultUI: true,
			center: center,
			zoom: 15,
			mapTypeId: google.maps.MapTypeId.ROADMAP
		};

		var map = new google.maps.Map(this.$()[0], options);
		/*var directionsDisplay = new google.maps.DirectionsRenderer();
			directionsDisplay.setMap(map);

		directionsService.route(directionRequest, function(result, status) {
			if (status == google.maps.DirectionsStatus.OK) {
				directionsDisplay.setDirections(result);
			}
		});*/

		this.set("map", map);
	},

});