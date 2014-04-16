var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/amabus');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
	console.log('DB online');
});

var favorisSchema = mongoose.Schema({
	name: String,
	address: String,

	longitude: Number,
	latitude: Number
});

var Favori = mongoose.model('Favori', favorisSchema);

Favori.remove({}, function(){ console.log("All favoris removed");})
Favori.create({
	name: 'Hacklab',
	address: '1 Place Saint-Laurent 38000 Grenoble',
	latitude: 45.1977842, 
	longitude: 5.7313602
}, function(){
	console.log("Fixtures updated");
})