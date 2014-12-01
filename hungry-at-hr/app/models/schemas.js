var businessSchema = mongoose.Schema({
    business_id: Schema.Types.ObjectId,
    full_address: String,
    lunch: Boolean,
    dinner: Boolean,
    latitude: Number,
    longitude: Number,
    stars: Number,
    review_count: Number,
    name: String
});

var reviewSchema = mongoose.Schema({
    review_id: String,
    votes: Number,
    user_id: String,
    stars: Number,
    date: Date,

});

var userSchema = mongoose.Schema({
    
});

