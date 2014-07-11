var request = require('request');

var guidage = function(req, res){

	var date = new Date(),
		url = 'http://dev.itinisere.fr/api/tripplanner/v1/plancrossmodetrip/json?key=ab1507cg0309' 
	;
	
	var params = {
		depType: 7,
		depLon: req.query.from.lng,
		depLat: req.query.from.lat,

		arrType: 7,
		arrLon: req.query.to.lng,
		arrLat: req.query.to.lat,

		departureTime: date.getTime()
	};

	for(var key in params){
		url += '&' + key + '=' + params[key] ;
	};

	console.log(url);

	request.get(url, function(error, response, data){

		var trajet = data ;
		console.log(data);
		res.json({});

	});

};

module.exports = guidage ;
/*var trajet = {
		
		expiresAt: (new Date().getTime()) + 3600,
		bus: [
			{
				name: 6020,
				direction: 'Crolles le coteau',

				enter: {
					name: 'La détourbe',
					city: 'Meylan',
					pos: {
						lat: 45.19677,
						lng: 5.7334
					}
				},

				down: {
					name: 'La gare',
					city: 'Montbonnot',
					pos: {
						lat: 45.19677,
						lng: 5.7334
					}
				},

				horaires: [
					"13:20",
					"13:59",
					"14:30",
					"15:02",
					"15:12"
				]
			},

			{
				name: 6070,
				direction: 'Gière université',

				enter: {
					name: 'La gare',
					city: 'Montbonnot',
					pos: {
						lat: 45.19677,
						lng: 5.7334
					}
				},

				down: {
					name: 'Boulangerie',
					city: 'Saint-nazaire',
					pos: {
						lat: 45.19677,
						lng: 5.7334
					}
				},

				horaires: [
					"13:24",
					"14:04",
					"14:38",
					"15:12",
					"15:32"
				]
			},

			{
				name: 'G50',
				direction: 'Le bas',

				enter: {
					name: 'Boulangerie',
					city: 'Saint-nazaire',
					pos: {
						lat: 45.19677,
						lng: 5.7334
					}
				},

				down: {
					name: 'Près avec un âne',
					city: 'Crolles',
					pos: {
						lat: 45.19677,
						lng: 5.7334
					}
				},

				horaires: [
					"13:29",
					"14:19",
					"14:43",
					"15:32",
					"15:52"
				]
			}],
		ends: to
	};*/