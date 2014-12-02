// grab the business model we just created

var Business = require('../server/app/models/business');
var Review = require('../server/app/models/review');
var User = require('../server/app/models/user');

module.exports = function(app) {

// server routes ===========================================================
    app.get('/', function(req, res) {
        res.render(__dirname + '/index.html'); // load our client/index.html file
    });

    // TO-DO: CHECK IF BUSINESS ALREADY EXISTS
    app.post('/business', function(req, res) {
        new Business({
            business_name: req.body.business_name,
            address: req.body.address,
            lunch: Boolean(req.body.lunch),
            dinner: Boolean(req.body.dinner)
        }).save(function(err, business) {
            if (err) {
                throw err;
            } else {
                console.log('posted business');
                res.status(201);
            }
        });
    });

    app.get('/business', function(req, res) {
        Business.find(function(err, businesses) {
            if (err) {
                res.send(err);
            } else {
                res.json(businesses);
                res.status(200);
            }
        });
    });

    app.post('/review', function(req, res) {
        // add review
        new Review({
            user_id: '',
            business_id: req.body.business_id,
            review_text: req.body.review,
            stars: req.body.stars,
            date: Date.now()
        }).save(function(err, business) {
            if (err) {
                throw err;
            } else {
                console.log('posted review');
                // update business data
                Business.findByIdAndUpdate(
                    req.body.business_id, 
                    { $inc: { review_count: 1, stars: req.body.stars }}, 
                    function(err, business) {
                });
                res.status(201);
            }
        });
    });

    app.get('/review', function(req, res) {
        Review.find(function(err, businesses) {
            if (err) {
                res.send(err);
            } else {
                res.json(businesses);
                res.status(200);
            }
        });
    });
}

// route to handle creating goes here (app.post)
// route to handle delete goes here (app.delete)