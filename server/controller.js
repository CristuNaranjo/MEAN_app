var User1      = require('./model/user1');
var User       = require ('./model/user');
var jwt        = require('jwt-simple');
var config     = require('./config/database');
var passport   = require('passport');




exports.signup = function(req,res){
	if (!req.body.name || !req.body.password || !req.body.email) {
		res.json({success: false, msg: 'Please pass name, password and email.'});
	} else {
		var newUser = {
			name: req.body.name,
			password: req.body.password,
			email: req.body.email
		};
		// save the user
		User.create( newUser,
			function(err) {
				if (err) {
					return res.json({success: false, msg: 'Email already exists.'});
				}
				res.json({success: true, msg: 'Successful created new user.'});
			});
	}
}

exports.authenticate = function(req, res){
	User.findOne({ email: req.body.email}, function(err, user) {
				 if (err) throw err;
				 if (!user) {
					 res.send({success: false, msg: 'Authentication failed. User not found.'});
				 } else {
					 // check if password matches
					 user.comparePassword(req.body.password, function (err, isMatch) {
						 if (isMatch && !err) {
							 // if user is found and password is right create a token
							 var token = jwt.encode(user, config.secret);
							 // return the information including token as JSON
							 res.json({success: true, token: 'JWT ' + token});
						 } else {
							 res.send({success: false, msg: 'Authentication failed. Wrong password.'});
						 }
					 });
				 }
			 });
};

exports.memberinfo = function(req, res) {
  var token = getToken(req.headers);
  if (token) {
    var decoded = jwt.decode(token, config.secret);
    User.findOne({
      name: decoded.name
    }, function(err, user) {
        if (err) throw err;

        if (!user) {
          return res.status(403).send({success: false, msg: 'Authentication failed. User not found.'});
        } else {
          res.json({success: true, msg: 'Welcome in the member area ' + user.name + '!'});
        }
    });
  } else {
    return res.status(403).send({success: false, msg: 'No token provided.'});
  }
};

getToken = function (headers) {
  if (headers && headers.authorization) {
    var parted = headers.authorization.split(' ');
    if (parted.length === 2) {
      return parted[1];
    } else {
      return null;
    }
  } else {
    return null;
  }
};
