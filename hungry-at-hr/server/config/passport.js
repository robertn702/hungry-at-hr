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
    
    passport.use('github', new GitHubStrategy({
        clientID: configAuth.githubAuth.clientID,
        clientSecret: configAuth.githubAuth.clientSecret,
        callbackURL: configAuth.githubAuth.callbackURL
      },
      function(accessToken, refreshToken, profile, done) {
        process.nextTick(function() {
            User.findOrCreate({ githubId: profile.id }, function (err, user) {
              return done(err, user);
            });
        });
      }
    ));
};