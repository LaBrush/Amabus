App.Favori = DS.Model.extend({
	name: DS.attr('string'),
	address: DS.attr('string'),

	longitude: DS.attr('number'),
	latitude: DS.attr('number')
});

App.Favori.FIXTURES = [
	{ id: 1, name: 'Maison', address: '200 route des Rieux', latitude: 45.19677, longitude: 5.7334 },
	{ id: 2, name: 'Baptiste', address: '45 chemin du piat', latitude: 45.19377, longitude: 5.7394 },
	{ id: 3, name: 'Lycée', address: '2 avenue du taillefer', latitude: 45.18677, longitude: 5.7314 }
];
