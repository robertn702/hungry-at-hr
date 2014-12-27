// grab the mongoose module
var mongoose = require('mongoose');

var reviewSchema = new mongoose.Schema({
  user: {
    user_id: String,
    username: String,
    image: String
  },
  google_id: String,
  review_text: String,
  votes: {type: Number, default: 0},
  rating: {type: Number, default: 0},
  price: {type: Number, default: 0},
  tags: Array,
  date: Date
});

// define our nerd model
// module.exports allows us to pass this to other files when it is called
module.exports = mongoose.model('Review', reviewSchema);
