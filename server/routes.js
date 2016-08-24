var User = require('./model/user');
var Controller = require ('./controller');

module.exports = function(app) {

	//
	app.get('/api/user', Controller.getUser);
	//
	app.post('/api/user', Controller.setUser);
	//
	app.put('/api/user/:user_id', Controller.updateUser);
	//
	app.delete('/api/user/:user_id', Controller.removeUser);
	// application


	app.get('/', function(req, res) {
		res.sendfile(__dirname + 'public/index.html');
	});



	app.get('/app/:name', function(req, res) {
		var options = {
			root: __dirname + '/app/',
			dotfiles: 'deny'
		};
		var fileName = req.params.name;
		res.sendFile(fileName, options, function (err) {
	    if (err) {
	      console.log(err);
	      res.status(err.status).end();
	    }
	    else {
	      console.log('Sent:', fileName);
	    }
		});
	})


};
