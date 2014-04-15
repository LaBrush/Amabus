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

var favori = mongoose.model('Favori', favorisSchema);