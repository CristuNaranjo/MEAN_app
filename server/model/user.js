var mongoose = require('mongoose');
var user1Schema = mongoose.Schema({
	name: String,
	email: String,
	user: String
});
module.exports = mongoose.model('User1', user1Schema);
