var mongoose = require('mongoose'),
	Favori = mongoose.model('Favori')
;

var favoris = {
	findAll: function(req, res){

		Favori.find({}, function(err, favoris){
			if(err){
				console.error(err);
				res.send(500);
			} else {
				res.json({favoris: favoris});
			}
		});

	},

	findOne: function(req, res){

		Favori.findById(req.params.id, function(err, favoris){
			if(err){
				console.error(err);
				res.send(500);
			} else {
				res.json({favoris: favoris});
			}
		});

	},

	create: function(req, res){

		Favori.create()

	},

	update: function(req, res){

	},

	delete: function(req, res){

	}
};

module.exports = favoris ;