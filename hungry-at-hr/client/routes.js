// grab the business model we just created

// var Business = require('../server/app/models/business');

module.exports = function(app) {

// server routes ===========================================================
    app.get('/', function(req, res) {
        res.render(__dirname + '/index.html'); // load our client/index.html file
    });

    app.post('/add-business', function(req, res) {
        console.log(req.body);
        res.send(201, req.body);
    });

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