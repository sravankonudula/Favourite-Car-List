/*
  File Name: index.js
  Author Name: Sravan Kumar Konudula
  Student Id: 301237930
  Web App Name: Favourite Car List
*/

// modules required for routing
let express = require("express");
let router = express.Router();
let mongoose = require("mongoose");

// define the game model
let car = require("../models/cars");

/* GET home page. wildcard */
router.get("/", (req, res, next) => {
  res.render("content/index", {
    title: "Home",
    cars: "",
  });
});

module.exports = router;
