var guidage = function(req, res){

	var from = req.query.from,
		to = req.query.to
	;

	var trajet = {
		
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

	};

	res.send(trajet);

};

module.exports = guidage ;