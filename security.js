var passport = require('passport'),
	FacebookStrategy = require('passport-facebook').Strategy,

	mongoose = require('mongoose'),
	User = mongoose.model('User')
;

module.exports = function(app){
	
	app.get('/auth/facebook', passport.authenticate('facebook'));
	app.get('/auth/facebook/callback', passport.authenticate('facebook', { successRedirect: '/#/sauvegarde', failureRedirect: '/#/sauvegarde' }));

	app.get('/logout', function(req, res){
		req.logout();
		res.redirect('/');
	});

	app.get('/api/whoami', function(req, res){
		if(!req.xhr){ 
			res.status(404).end('Error 404'); 
		} else {
			if(req.user)
			{
				res.json({
					id: req.user._id,
					provider: req.user.provider,

					name: req.user.name,
					gender: req.user.gender
				});
			}
			else
			{
				res.json({_id: false});
			}
		}
	});


	passport.serializeUser(function(user, done) {
		done(null, user.id);
	});

	passport.deserializeUser(function(id, done) {
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
						provider: 'facebook',

						name: profile.name.givenName + ' ' + profile.name.familyName,
						email: profile.emails ? profile.emails[0].value : '',
						gender: profile.gender == 'female' ? 'f' : 'm',

						favoris: [{
							name: 'Hacklab',
							address: '1 Place Saint-Laurent 38000 Grenoble',
							latitude: 45.1977842, 
							longitude: 5.7313602
						}]
					}, function(err, user){
						if(err){ throw done(err) };
						console.log('User created:', user.name);
						done(null, user);
					})
				}
			});
		}
	));
}