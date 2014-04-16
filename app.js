var express = require('express'),
	fs = require('fs'),

	model = require('./model'),
	security = require('./security'),

	favoris = require('./favoris')
;

var app = express();

app
	.use(express.static(__dirname + "/public/"))
	.use(require('body-parser')())
;

app.get(    '/api/favoris'     , favoris.findAll ); // Return all favoris
app.get(    '/api/favoris/:id' , favoris.findOne ); // Return person by id
app.post(   '/api/favoris'     , favoris.create  ); // Create A Person
app.put(    '/api/favoris/:id' , favoris.update  ); // Update a person by id
app.delete( '/api/favoris/:id' , favoris.delete  ); // Delete a person by id

app.get('/', function(req, res){
	fs.readFile("public/index.html", function(err, content) {
		if (err) {
			res.writeHead(500);
			res.end();
		}
		else {
			res.writeHead(200, { 'Content-Type': 'text/html' });
			res.end(content, 'utf-8');
		}
	});
});

app.listen(8888);
