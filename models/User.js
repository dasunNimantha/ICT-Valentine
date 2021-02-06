const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: String,
    googleID: String,
    userEmail: String,
    userPhotoLink: String,
    isRegistered: Boolean,
    realName: String,
    age: String,
    gender: String,
    songs: String,
    singers: String,
    movies: String,
    actors: String,
    actresses: String,
    books: String,
    crush:String,
    foods:String,
    matched: Boolean,
    matchedPesonId:String
    

});

module.exports = mongoose.model('User', userSchema);