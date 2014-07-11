window.getPosition = function(){

	return new Ember.RSVP.Promise(function(resolve, reject){

	navigator.geolocation.getCurrentPosition(
		function(pos){
				resolve(pos.coords);
		},
		function(error) {
			var info = "Erreur lors de la géolocalisation : ";
			switch(error.code) {
				case error.TIMEOUT:
					info += "La localisation prend trop de temps";
				break;
				case error.PERMISSION_DENIED:
				info += "Vous n’avez pas donné la permission";
				break;
				case error.POSITION_UNAVAILABLE:
					info += "La position n’a pu être déterminée";
				break;
				case error.UNKNOWN_ERROR:
					info += "Erreur inconnue";
				break;
			}

			reject(info);
		},
		{
			enableHighAccuracy: true
		});
	});
}