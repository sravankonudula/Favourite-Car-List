/*
  File Name: cars.js
  Author Name: Sravan Kumar Konudula
  Student Id: 301237930
  Web App Name: Favourite Car List
*/

let mongoose = require("mongoose");

// create a model class
let Car = mongoose.Schema(
  {
    Carname: String,
    Category: String,
    Carmodel: String,
    Price: Number,
  },
  {
    collection: "cars",
  }
);

module.exports = mongoose.model("Car", Car);
