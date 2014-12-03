// refer to https://github.com/jaredhanson/passport-github
// Client ID
// 733c4bdbab76cd5eac66
// Client Secret
// c2d4ba8833abed61ff204245a070c6bd568b584f

passport.use(new GitHubStrategy({
    clientID: 733c4bdbab76cd5eac66,
    clientSecret: c2d4ba8833abed61ff204245a070c6bd568b584f,
    callbackURL: "http://127.0.0.1:3000/auth/github/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    User.findOrCreate({ githubId: profile.id }, function (err, user) {
      return done(err, user);
    });
  }
));