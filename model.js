var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/amabus');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
	console.log('DB online');
});

// FAVORIS

var favorisSchema = mongoose.Schema({
	provider_id: String,

	name: String,
	address: String,

	longitude: Number,
	latitude: Number
});

var Favori = mongoose.model('Favori', favorisSchema);

// UTILISATEURS

var userSchema = mongoose.Schema({
	provider_id: String,
	provider: String,

	name: String,
	email: String,
	gender: String,

	favoris: [favorisSchema]
});

var User = mongoose.model('User', userSchema);

// FIXTURES

Favori.remove({}, function(){ console.log("All favoris removed");})
Favori.create({
	name: 'Hacklab',
	address: '1 Place Saint-Laurent 38000 Grenoble',
	latitude: 45.1977842, 
	longitude: 5.7313602
}, function(){
	console.log("Fixtures updated");
})