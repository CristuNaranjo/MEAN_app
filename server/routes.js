var User            = require('./model/user1');
var Controller      = require ('./controller');
var express         = require('express');
var passport	      = require('passport');

module.exports = function(app) {

	var apiRoutes = express.Router();
	app.use(passport.initialize());
	require('./config/passport')(passport);

	apiRoutes.post('/signup', Controller.signup);
	apiRoutes.post('/authenticate', Controller.authenticate);
	apiRoutes.get('/memberinfo', passport.authenticate('jwt', { session: false}), Controller.memberinfo);
	app.use('/api', apiRoutes);


	//
	// //
	// app.get('/api/user', Controller.getUser);
	// //
	// app.post('/api/user', Controller.setUser);
	// //
	// app.put('/api/user/:user_id', Controller.updateUser);
	// //
	// app.delete('/api/user/:user_id', Controller.removeUser);
	// // application
	//
	//
	// app.get('/', function(req, res) {
	// 	res.sendfile(__dirname + 'public/index.html');
	// });
	//
	//
	//
	// app.get('/app/:name', function(req, res) {
	// 	var options = {
	// 		root: __dirname + '/app/',
	// 		dotfiles: 'deny'
	// 	};
	// 	var fileName = req.params.name;
	// 	res.sendFile(fileName, options, function (err) {
	//     if (err) {
	//       console.log(err);
	//       res.status(err.status).end();
	//     }
	//     else {
	//       console.log('Sent:', fileName);
	//     }
	// 	});
	// })


}
