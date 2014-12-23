// grab the mongoose module
var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    _id: String,
    username: String,
    votes: {type: Number, default: 0},
    review_count: {type: Number, default: 0},
    date: Date,
    // password: String
});

// define our nerd model
// module.exports allows us to pass this to other files when it is called
module.exports = mongoose.model('User', userSchema);