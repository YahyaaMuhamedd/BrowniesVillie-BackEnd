const express = require("express");
const { orderValidationRules, orderValidationRulesUpdate } = require("../validation/orders.validation");
const validate = require("../middleware/validate");
const authenticateUser = require("../middleware/authenticateUser");
const ordersController = require("../controller/orders.controller");

const router = express.Router();

// 🔒 Protected Route: Fetch Orders (Requires JWT)
// 🛒 Public Route: Create Order, Register/Login, and Return Token
router.route("/")
    .get(authenticateUser, ordersController.getOrders)
    .post(orderValidationRules(), validate, ordersController.createOrder);


router.patch("/:id", orderValidationRulesUpdate(), validate, ordersController.updateProduct);

module.exports = router;
