// grab the business model we just created

var Business = require('./models/business');
var Review = require('./models/review');
var User = require('./models/user');

module.exports = function(app, passport) {
// server routes ===========================================================
  app.get('/', function(req, res) {
    res.render(__dirname + '/index.html'); // load our client/index.html file
  });

  app.post('/business', function(req, res) {
    Business.findOne({google_id: req.body.google_id}, function(err, business) {
      if (err) {
        console.log('error creating business');
      } else if (business) {
        console.log('business already exists');
        res.status(200);
      } else {
        new Business({
          google_id: req.body.google_id,
          filter: req.body.filter,        // Eat, Drink, Study
          address: req.body.address,      // array of 2 strings
          hours: req.body.hours,
          coordinates: req.body.coordinates,
          rating: req.body.rating,
          price: req.body.price,
          website: req.body.website,
          business_name: req.body.business_name,
          phone: req.body.phone
        }).save(function(err, business) {
          if (err) {
            throw err;
          } else {
            res.status(201);
          }
        });
      }
    });
  });

  app.get('/business', function(req, res) {
    Business.find(function(err, businesses) {
      if (err) {
        throw (err);
      } else {
        res.json(businesses);
        res.status(200);
      }
    });
  });

  app.get('/business/:google_id', function(req, res) {
    Business.findOne({google_id: req.params.google_id}, function(err, business) {
      if (err) {
        throw (err);
      } else {
        res.json(business);
        res.status(200);
      }
    });
  });

  app.post('/review', function(req, res) {
    // add review
    console.log('check if authenticated: ', req.isAuthenticated());
    new Review({
      user: {
        user_id: req.user._id,
        username: req.user.username,
        image: req.user.image
      },
      google_id: req.body.google_id,
      review_text: req.body.review,
      rating: req.body.rating,
      price: req.body.price,
      date: Date.now()
    }).save(function(err, business) {
      if (err) {
        throw err;
      } else {
        console.log('updating business');
        // update business data
        Business.update(
          { google_id: req.body.google_id },
          { $inc: { review_count: 1, rating: req.body.rating, price: req.body.price } },
          function(err, business) {}
        );

        // TODO may need to change this due to review schema change (user drilldown)
        User.findByIdAndUpdate(
          req.user._id,
          { $inc: { review_count: 1}}, function(err, user) {}
        );
        res.redirect('/');
        res.status(201);
      }

    });
  });

  app.get('/review/:google_id', function(req, res) {
    Review.find({google_id: req.params.google_id}, function(err, reviews) {
      if (err) {
        throw (err);
      } else {
        res.json(reviews);
        res.status(200);
      }
    });
  });

  // // TO-DO: Implement Profile Page
  // // route for showing the profile page
  // app.get('/profile', isLoggedIn, function(req, res) {
  //     res.render('profile.ejs', {
  //         user : req.user // get the user out of session and pass to template
  //     });
  // });

  app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
  });

  app.get('/auth/github', passport.authenticate('github'));

  // the callback after github has authenticated the user
  app.get('/auth/github/callback', passport.authenticate('github', {
        failureRedirect: '/login'
      }),
      function(req, res) {
        console.log('successful authentication!');
        // console.log('res: ', res);
        res.redirect('/');
      });

  app.get('/logged-in', function(req, res) {
    res.send(200, {result: req.isAuthenticated()});
  });

}

function isLoggedIn(req, res, next) {
    // if user is authenticated in the session, carry on
    if (req.isAuthenticated()) {
        return next();
    }
    // if they aren't redirect them to the home page
    res.redirect('/');
}
