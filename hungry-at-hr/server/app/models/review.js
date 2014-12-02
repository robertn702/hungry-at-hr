// grab the mongoose module
var mongoose = require('mongoose');

var reviewSchema = new mongoose.Schema({
    user_id: String,
    business_id: String,
    votes: {type: Number, default: 0},
    stars: {type: Number, default: 0},
    date: Date,
});

// define our nerd model
// module.exports allows us to pass this to other files when it is called
module.exports = mongoose.model('Review', reviewSchema);