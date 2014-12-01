var businessSchema = mongoose.Schema({
    business_id: Schema.Types.ObjectId,
    full_address: {type: String, default: ''},
    lunch: Boolean,
    dinner: Boolean,
    latitude: {type: Number, default: 0},
    longitude: {type: Number, default: 0},
    stars: {type: Number, default: 0},
    review_count: {type: Number, default: 0},
    business_name: String
});

var reviewSchema = mongoose.Schema({
    review_id: String,
    user_id: String,
    business_id: String,
    votes: {type: Number, default: 0},
    stars: {type: Number, default: 0},
    date: Date,
});

var userSchema = mongoose.Schema({
    user_id: Schema.Types.ObjectId,
    votes: {type: Number, default: 0},
    review_count: {type: Number, default: 0},
    username: String,
    password: String
});