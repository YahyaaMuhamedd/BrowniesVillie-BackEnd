const express = require("express");
const { productValidationRules } = require("../validation/products");
const ProductsController = require("../controller/Products.Controller");
const validate = require("../middleware/validate");
const router = express.Router();

router.route("/")
    .get(ProductsController.getProducts)
    .post(productValidationRules(), validate, ProductsController.createProduct)

router.route("/:id")
    .get(ProductsController.getProductById)
    .patch(productValidationRules(), validate, ProductsController.updateProduct)
    .delete(ProductsController.deleteProduct)

module.exports = router