var User1 = require('./model/user');

exports.getUser = function (req, res){
	User1.find(
		function(err, users) {
			if (err){
				res.send(err)
			}
			// console.log(users);
					res.json(users);
				}
			);
}

exports.setUser = function(req, res) {
	// console.log(req.body);
		User1.create(
			{name : req.body.name,email: req.body.email, user: req.body.user},
			function(err, user) {
				if (err)
					res.send(err);
				User1.find(function(err, users) {
				 	if (err)
				 		res.send(err)
				 	res.json(users);
				});
			});

	}

exports.updateUser = function(req, res){
	User1.update( {_id : req.params.user_id},
					{$set:{name : req.body.name,email: req.body.email, user: req.body.user}},
					function(err, users) {
						if (err)
							res.send(err);

				User1.find(function(err, users) {
				 	if (err)
				 		res.send(err)
				 	res.json(users);
				});
			});
	}

exports.removeUser = function(req, res) {
	User1.remove({_id : req.params.user_id}, function(err, user) {
		if (err)
			res.send(err);
			User1.find(function(err, users) {
				if (err)
					res.send(err)
				res.json(users);
			});
		});
}
