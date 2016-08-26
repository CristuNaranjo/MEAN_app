var User            = require('./model/user1');
var Controller      = require ('./controller');
var express         = require('express');
var passport	      = require('passport');

module.exports = function(app) {


    //
	// app.get('/', function(req, res) {
	// 	console.log("HOLA");
	// 	res.sendfile(__dirname + 'public/index.html');
	// });
    //
	// app.get('/app/:name', function(req, res) {
	// 	console.log(req.params);
	// 	var options = {
	// 		root: __dirname + '/app/',
	// 		dotfiles: 'deny'
	// 	};
	// 	var fileName = req.params.name;
	// 	res.sendFile(fileName, options, function (err) {
	// 		if (err) {
	// 			console.log(err);
	// 			res.status(err.status).end();
	// 		}
	// 		else {
	// 			console.log('Sent:', fileName);
	// 		}
	// 	});
	// });
	// app.get('/node_modules/:name', function(req, res) {
	// 	console.log(req.params);
	// 	var options = {
	// 		root: '/node_modules/',
	// 		dotfiles: 'deny'
	// 	};
	// 	var fileName = req.params.name;
	// 	res.sendFile(fileName, options, function (err) {
	// 		if (err) {
	// 			console.log(err);
	// 			res.status(err.status).end();
	// 		}
	// 		else {
	// 			console.log('Sent:', fileName);
	// 		}
	// 	});
	// });

	var apiRoutes = express.Router();
	app.use(passport.initialize());
	require('./config/passport')(passport);

	apiRoutes.post('/signup', Controller.signup);
	apiRoutes.post('/authenticate', Controller.authenticate);
	apiRoutes.get('/memberinfo', passport.authenticate('jwt', { session: false}), Controller.memberinfo);
	app.use('/api', apiRoutes);


}
