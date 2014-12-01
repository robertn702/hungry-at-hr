// grab the business model we just created
var Business = require('./models/business');

// module.exports = function(app) {

//     // server routes ===========================================================
//     // handle things like api calls
//     // authentication routes

//     // sample api route
//     app.get('/business', function(req, res) {
//         // use mongoose to get all nerds in the database
//         Business.find(function(err, nerds) {

//             // if there is an error retrieving, send the error. 
//                             // nothing after res.send(err) will execute
//             if (err)
//                 res.send(err);

//             res.json(nerds); // return all nerds in JSON format
//         });
//     });

//     // route to handle creating goes here (app.post)
//     // route to handle delete goes here (app.delete)