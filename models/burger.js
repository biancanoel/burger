// Import the ORM to create functions that will interact with the database.
var orm = require("../config/orm.js");

var burger = {
    //function with a cb as a parameter
    all: function(cb) {
      //when all() is called, called the orm.all function, passing in "burgers" as the table name and this function as the callback function orm.all expects
      orm.all("burgers", function(res) {
        cb(res);
      });
    },
    // The variables cols and vals are arrays.
    create: function(cols, vals, cb) {
      orm.create("burgers", cols, vals, function(res) {
        cb(res);
      });
    },
    update: function(objColVals, condition, cb) {
      orm.update("burgers", objColVals, condition, function(res) {
        cb(res);
      });
    },
    delete: function(condition, cb) {
      orm.delete("burgers", condition, function(res) {
        cb(res);
      });
    }
  };
  
  // Export the database functions for the controller (burgerController.js).
  module.exports = burger;