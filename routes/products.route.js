const express = require("express");
const { productValidationRules, validate } = require("../validation/products");
const ProductsController = require("../controller/Products.Controller");
const router = express.Router();

// Get All Request
router.get("/", ProductsController.getProducts);

// Get Single Request
router.get(`/:id`, ProductsController.getProductById);

// Post Request
router.post(`/`, productValidationRules(), validate, ProductsController.createProduct);

// PATCH request 
router.patch(`/:id`, productValidationRules(), validate, ProductsController.updateProduct);

// Delete Request
router.delete(`/:id`, ProductsController.deleteProduct);

module.exports = router