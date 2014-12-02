// grab the business model we just created

var Business = require('../server/app/models/business');

module.exports = function(app) {

// server routes ===========================================================
    app.get('/', function(req, res) {
        res.render(__dirname + '/index.html'); // load our client/index.html file
    });

    // TO-DO: CHECK IF BUSINESS ALREADY EXISTS
    app.post('/add-business', function(req, res) {
        new Business({
            business_name: req.body.business_name,
            address: req.body.address,
            lunch: Boolean(req.body.lunch),
            dinner: Boolean(req.body.dinner)
        }).save(function(err, business) {
            if (err) {
                throw err;
            } else {
                console.log('success');
                res.send(201);
                res.redirect('/add-business');
            }
        });
    });

    app.post('/add-review', function(req, res) {
        new Review({
            business_name: req.body.business_name,
            address: req.body.address,
            lunch: Boolean(req.body.lunch),
            dinner: Boolean(req.body.dinner)
        }).save(function(err, business) {
            if (err) {
                throw err;
            } else {
                console.log('success');
                res.send(201);
                // res.redirect('add-business');
            }
        });
    });

    app.get('/business', function(req, res) {
        Business.find(function(err, businesses) {
            if (err) {
                res.send(err);
            } else {
                res.json(businesses);
            }
        });
    });

    app.get('/one-business', function(req, res) {
        // use mongoose to get all businesses in the database
        Business.findOne({}, function(err, businesses) {
            // if there is an error retrieving, send the error. 
            // nothing after res.send(err) will execute
            if (err) {
                res.send(err);
            } else {
                res.json(businesses); // return all businesses in JSON format
            }
        });
    });
}

// route to handle creating goes here (app.post)
// route to handle delete goes here (app.delete)