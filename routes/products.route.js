const express = require("express");
const { productValidationRules } = require("../validation/products");
const ProductsController = require("../controller/Products.Controller");
const validate = require("../middleware/validate");
const authenticateUser = require("../middleware/authenticateUser");
const router = express.Router();

router.route("/")
    .get(ProductsController.getProducts)
    .post(productValidationRules(), authenticateUser, validate, ProductsController.createProduct)

router.route("/:id")
    .get(ProductsController.getProductById)
    .patch(productValidationRules(), authenticateUser, validate, ProductsController.updateProduct)
    .delete(authenticateUser, ProductsController.deleteProduct)

module.exports = router