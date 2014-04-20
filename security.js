var passport = require('passport'),
	FacebookStrategy = require('passport-facebook').Strategy,

	mongoose = require('mongoose'),
	User = mongoose.model('User')
;

module.exports = function(app){
	
	app.get('/auth/facebook', passport.authenticate('facebook'));
	app.get('/auth/facebook/callback', passport.authenticate('facebook', { successRedirect: '/', failureRedirect: '/#/sauvegarde' }));

	app.get('/api/whoami', function(req, res){
		// if(!req.xhr){ 
			// res.status(404).end('Error 404'); 
		// } else {
			console.log(req.user);
			if(req.user)
			{
				res.json({
					name: req.user.name,
					id: req.user._id
				});
			}
			else
			{
				res.json({_id: false});
			}
		// }
	});


	passport.serializeUser(function(user, done) {
		done(null, user);
	});

	passport.deserializeUser(function(id, done) {
		console.log(id);
		User.findById(id, function(err, user) {
			done(err, user);
		});
	});

	passport.use(
		new FacebookStrategy({
			clientID: app.get("FACEBOOK_APP_ID"),
			clientSecret: app.get("FACEBOOK_APP_SECRET"),
			callbackURL: "http://localhost:8888/auth/facebook/callback"
		},
		function(accessToken, refreshToken, profile, done) {
			User.findOne({ provider_id: profile.id }, function(err, user) {
				if (err) { return done(err); }

				if(user){
					done(null, user);				
				} else {
					User.create({
						provider_id: profile.id,
						name: profile.name.givenName + ' ' + profile.name.familyName,
						email: profile.emails[0].value,

						favoris: [{
							name: 'Hacklab',
							address: '1 Place Saint-Laurent 38000 Grenoble',
							latitude: 45.1977842, 
							longitude: 5.7313602
						}]
					}, function(){
						if(err){ throw done(err) };
						console.log('User created');
						done(null, user);
					})
				}
			});
		}
	));
}