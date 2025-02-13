const express = require("express");
const { userValidationRules, loginUserValidationRules } = require("../validation/user.validation");
const validate = require("../middleware/validate");
const UsersController = require("../controller/users.controller");
const router = express.Router();

// Get All Request
router.route(`/`)
    .get(UsersController.getUsers)

// Register Request
router.route(`/register`)
    .post(userValidationRules(), validate, UsersController.registerUser);

// Login Request
router.route(`/login`)
    .post(loginUserValidationRules(), validate, UsersController.loginUser);

module.exports = router