// grab the mongoose module
var mongoose = require('mongoose');

// var businessSchema = new mongoose.Schema({
//     address: {type: String, default: ''},
//     lunch: Boolean,
//     dinner: Boolean,
//     latitude: {type: Number, default: 0},
//     longitude: {type: Number, default: 0},
//     stars: {type: Number, default: 0},
//     review_count: {type: Number, default: 0},
//     business_name: String,
//     phone: String,
//     popularity: Number
// });

var businessSchema = new mongoose.Schema({
    google_id: Number,
    filter: String,     // Eat, Drink, Study
    address: Array,     // array of 2 strings
    hours: {
        lunch: Array,   // array of 5 booleans (true or false depending on day of week)
        dinner: Array
    },
    coordinates: {
        latitude: Number,
        longitude: Number
    },
    rating: {type: Number, default: 0},
    price: Number,
    website: String,
    review_count: {type: Number, default: 1},
    business_name: String,
    phone: String,
    popularity: Number
});

module.exports = mongoose.model('Business', businessSchema);
