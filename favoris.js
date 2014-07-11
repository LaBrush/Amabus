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
				// res.json({favoris: favoris});
				res.json({favoris: []});
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

		var body = req.body.favori ;
		var favori = {
			name: body.name,
			address: body.address,

			latitude: parseFloat(body.latitude),
			longitude: parseFloat(body.longitude)
		}

		Favori.create(favori, function(err, favori){

			if(err){
				console.error(err);
				res.send(500);
				return -1 ;
			}

			res.send(200);

		});

		return req.body ;

	},

	update: function(req, res){

		var body = req.body.favori ;
		var favori = {
			name: body.name,
			address: body.address,

			latitude: parseFloat(body.latitude),
			longitude: parseFloat(body.longitude)
		}

		Favori.find({id: req.params.id}, favori, function(err, favori){

			if(err){
				console.error(err);
				res.send(500);
				return -1 ;
			}

			res.send(200);

		});

		return req.body ;
	},

	delete: function(req, res){
		Favori.findByIdAndRemove(req.params.id, function(err){
			if(err){
				console.error(err);
				res.send(500);
			} else {
				res.send(200);
			}
		})
	}
};

module.exports = favoris ;