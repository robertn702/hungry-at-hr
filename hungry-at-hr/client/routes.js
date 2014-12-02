// grab the business model we just created

var Business = require('../server/app/models/business');

module.exports = function(app) {

// server routes ===========================================================
    app.get('/', function(req, res) {
        res.render(__dirname + '/index.html'); // load our client/index.html file
    });

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
            }
        });
    });

        // First we have to require mongoose and the Todo model before we can use it.
    // var mongoose = require( 'mongoose' );
    // var Todo     = mongoose.model( 'Todo' );
        // Redirect the page back to index after the record is created.
    // exports.create = function ( req, res ){
    //   new Todo({
    //     content    : req.body.content,
    //     updated_at : Date.now()
    //   }).save( function( err, todo, count ){
    //     res.redirect( '/' );
    //   });
    // };

    app.get('/business', function(req, res) {
        // use mongoose to get all businesses in the database
        Business.find(function(err, businesses) {
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