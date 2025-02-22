const express = require("express");
const { orderValidationRules } = require("../validation/orders.validation");
const validate = require("../middleware/validate");
const authenticateUser = require("../middleware/authenticateUser");
const ordersController = require("../controller/orders.controller");

const router = express.Router();

// 🔒 Protected Route: Fetch Orders (Requires JWT)
router.get("/", authenticateUser, ordersController.getOrders);

// 🛒 Public Route: Create Order, Register/Login, and Return Token
router.post("/", orderValidationRules(), validate, ordersController.createOrder);

module.exports = router;
