const express = require("express");
const { userValidationRules, loginUserValidationRules, addressValidationRules } = require("../validation/user.validation");
const authenticateUser = require("../middleware/authenticateUser");
const validate = require("../middleware/validate");
const UsersController = require("../controller/users.controller");
const router = express.Router();

// Get All Request
router.route(`/`)
    .get(authenticateUser, UsersController.getUsers)

// Get Single Request
router.route(`/:id`)
    .get(authenticateUser, UsersController.getUserById)

// Register Request
router.route(`/register`)
    .post(userValidationRules(), validate, UsersController.registerUser);

// Login Request
router.route(`/login`)
    .post(loginUserValidationRules(), validate, UsersController.loginUser);

router.route(`/addAddress`)
    .post(addressValidationRules(), authenticateUser, validate, UsersController.addAddress)


router.get("/protected-route", authenticateUser, (req, res) => {
    res.json({ message: "You have access!", user: req.user });
});


module.exports = router