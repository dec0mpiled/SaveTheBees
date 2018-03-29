var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var User = new Schema({
    name: String,
    username: String,
    password: String,
    email: String,
    avi: String,
    verified: Boolean,
    bio: String,
    color: String,
});

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('userslist', User);