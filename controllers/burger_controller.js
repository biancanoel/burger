var express = require("express");

//what does this mean??
var router = express.Router();

// Import the model (burger.js) to use its database functions.
var burger = require("../models/burger.js");

// Create all our routes and set up logic within those routes where required.


//When homee route is called
router.get("/", function(req, res) {
    //call sql query to get all from db
    burger.all(function(data) {
        //put the response from sql into an object
      var hbsObject = {
        burgers: data
      };
      console.log(hbsObject);
      //pass that object to index handlebars template and display that to user
      res.render("index", hbsObject);
    });
  });
  
  //When new burger route is called
  router.post("/api/burgers", function(req, res) {
      //calll the create new burger function to add it to sql, passing it the parameters col = name and col = devoured
    burger.create([
      "name", "devoured"
    ], [
        //those two cols should be filled with the info from the post request
      req.body.name, req.body.devoured
      //the result of the sql query to add a new burger..
    ], function(result) {
      // Send back the ID of the new quote
      res.json({ id: result.insertId });
    });
  });
  
  //when a burger needs to be updated
  router.put("/api/burger/:id", function(req, res) {
      //grab the id from the url, this will be the condition the sql query looks for to know which col to update
    var condition = "id = " + req.params.id;
    
    console.log("condition", condition);
    
    //call the udpdate function, passing it an object 
    burger.update({
        //this will determine if the updated entry is devoured or not, depends on what came from the api post request
      devoured: req.body.devoured
      //the condition will be the id of th item being updated, and cb function. 
    }, condition, function(result) {
      console.log(result);
      if (result.changedRows == 0) {
        // If no rows were changed, then the ID must not exist, so 404
        return res.status(404).end();
      } else {
        res.status(200).end();
      }
    });
  });
  
  router.delete("/api/burger/:id", function(req, res) {
    var condition = "id = " + req.params.id;
  
    burger.delete(condition, function(result) {
      if (result.affectedRows == 0) {
        // If no rows were changed, then the ID must not exist, so 404
        return res.status(404).end();
      } else {
        res.status(200).end();
      }
    });
  });
  
  // Export routes for server.js to use.
  module.exports = router;