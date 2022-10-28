/*
  File Name: cars.js
  Author Name: Sravan Kumar Konudula
  Student Id: 301237930
  Web App Name: Favourite Car List
*/

// modules required for routing
let express = require("express");
let router = express.Router();
let mongoose = require("mongoose");

// define the car model
let car = require("../models/cars");

/* GET cars List page. READ */
router.get("/", (req, res, next) => {
  // find all cars in the cars collection
  car.find((err, cars) => {
    if (err) {
      return console.error(err);
    } else {
      res.render("cars/index", {
        title: "Cars",
        cars: cars,
      });
    }
  });
});

//  GET the Car Details page in order to add a new Car
router.get("/add", (req, res, next) => {
  debugger
   res.render("cars/add", {
    title: "Add Car Details",
  });
});

// POST process the Car  Details page and create a new Car  - CREATE
router.post("/add", (req, res, next) => {
  
  console.log("inside add method");
  let newcar = car({
    Carname: req.body.name,
    Category: req.body.category,
    Carmodel: req.body.model,
    Price: req.body.price
  });
  
  car.create(newcar, (err, car) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      //refresh the cars list
      res.redirect("/cars");
    }
  });
});

// GET the Car Details page in order to edit an existing Car
router.get("/edit/:id", (req, res, next) => {
  let id = req.params.id; //id of actual object
  console.log("id is: "+ id);
  car.findById(id, (err, cartoedit) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      //show the edit view
      res.render("cars/details", { title: "Edit Car details", cars: cartoedit });
    }
  });
});

// POST - process the information passed from the details form and update the document
router.post("/edit/:id", (req, res, next) => {
  
   let id = req.params.id; //id of actual object

   let updateCar = car({
     _id: id,
     Carname: req.body.name,
      Category: req.body.category,
      Carmodel: req.body.model,
      Price: req.body.price
   });
   car.updateOne({ _id: id }, updateCar, (err) => {
     if (err) {
       console.log(err);
       res.end(err);
     } else {
       //refresh the cars
       res.redirect("/cars");
     }
   });
});

// GET - process the delete
router.get("/delete/:price", (req, res, next) => {
  

   let price = req.params.price;

   car.remove(
    { Price: { $gt: price } }, 
    (err) => {
     if (err) {
       console.log(err);
       res.end(err);
     } else {
       //refresh car list
       res.redirect("/cars");
     }
   });

});

module.exports = router;
