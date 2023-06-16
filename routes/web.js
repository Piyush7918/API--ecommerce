const express = require('express')
const categoryController = require('../controllers/CategoryController');
const CategoryController = require('../controllers/CategoryController');
const ProductController = require('../controllers/ProductController');
const route = express.Router()

//CategoryController
route.post("/category",categoryController.categoryinsert);
route.get("/display", CategoryController.display);
route.get("/view/:id", CategoryController.view);
route.post("/update/:id", CategoryController.categoryupdate);
route.delete("/delete/:id", CategoryController.delete);

//ProductController
route.post("/product", ProductController.productinsert);
route.get("/pdisplay", ProductController.pdisplay);
route.get("/pview/:id", ProductController.pview);
route.post("/pupdate/:id", ProductController.productupdate);
route.delete("/pdelete/:id", ProductController.pdelete);



module.exports = route