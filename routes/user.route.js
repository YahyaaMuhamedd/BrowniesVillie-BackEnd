const express = require("express");
const { userValidationRules, loginUserValidationRules } = require("../validation/user.validation");
const authenticateUser = require("../middleware/authenticateUser");
const validate = require("../middleware/validate");
const UsersController = require("../controller/users.controller");
const router = express.Router();

// Get All Request
router.route(`/`)
    .get(authenticateUser, UsersController.getUsers)

// Register Request
router.route(`/register`)
    .post(userValidationRules(), validate, UsersController.registerUser);

// Login Request
router.route(`/login`)
    .post(loginUserValidationRules(), validate, UsersController.loginUser);


router.get("/protected-route", authenticateUser, (req, res) => {
    res.json({ message: "You have access!", user: req.user });
});


module.exports = router