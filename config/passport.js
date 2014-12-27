// read this http://blog.revathskumar.com/2014/06/express-github-authentication-with-passport.html

// config/passport.js

// load all the things we need
var GitHubStrategy = require('passport-github').Strategy;

// load up the user model
var User = require('../app/models/user');

// load the auth variables
var configAuth = require('./auth');

module.exports = function(passport) {

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        console.log('serializing user: ', user);
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    // =========================================================================
    // GITHUB ==================================================================
    // =========================================================================

    passport.use(new GitHubStrategy({
        clientID: configAuth.githubAuth.clientID,
        clientSecret: configAuth.githubAuth.clientSecret,
        callbackURL: configAuth.githubAuth.callbackURL
    },
    function(accessToken, refreshToken, profile, done) {
        process.nextTick(function() {
            console.log('user profile: ', profile);
            console.log('user image: ', profile._json.avatar_url);
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
