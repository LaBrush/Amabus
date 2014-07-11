var templates = [

	'index',
	'guidage',
	'sync',
	'about',

	'map',

	'favoris/index',
	'favoris/new',
	'favoris/edit'

];

for (var i = 0, c = templates.length ; i < c; i++) {
	
	$.ajax('views/' + templates[i] + '.hbs', { async: false })
	.success(function(rep){ 
		Ember.TEMPLATES[templates[i]] = Ember.Handlebars.compile(rep);  
	});

};