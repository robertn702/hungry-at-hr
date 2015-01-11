require('dotenv').load();

// load all the things we need
var GitHubStrategy = require('passport-github').Strategy;
var User = require('../app/models/user');

module.exports = function(passport) {

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        console.log('serializing user');
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    passport.use(new GitHubStrategy({
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: process.env.GITHUB_CALLBACK_URL
    },
    function(accessToken, refreshToken, profile, done) {
        process.nextTick(function() {
            User.findOne({_id: profile.id}, function(err, user) {
                if (err) {
                    console.log("err");
                    return done(err);
                } else if (user) {
                    console.log("found user, logging in");
                    return done(null, user);
                } else {
                    console.log("user not found, creating new user");
                    var newUser = new User();
                    newUser._id = profile.id;
                    newUser.username = profile.displayName;
                    newUser.image = profile._json.avatar_url;
                    newUser.date = Date.now();
                    newUser.save(function(err) {
                        if (err) {
                            throw err;
                        }
                        return done(null, newUser);
                    });
                }
            });
        });
    }));
};
