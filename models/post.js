var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var comments = new Schema({ value: String, likes: Number, dislikes: Number, user: String, _user: String, created: Date });

var Post = new Schema({
    author: String,
    raw: String,
    content: String,
});

module.exports = mongoose.model('posts', Post);