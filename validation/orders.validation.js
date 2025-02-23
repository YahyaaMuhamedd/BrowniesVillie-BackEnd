const { body } = require("express-validator");

const orderValidationRules = () => {
    return [
        body("name")
            .isString().withMessage("Name must be a string")
            .notEmpty().withMessage("Name is required")
            .isLength({ min: 3 }).withMessage("Name must be at least 3 characters long"),

        body("email")
            .isEmail().withMessage("Email must be a valid email address")
            .normalizeEmail(),

        body("phone")
            .isMobilePhone().withMessage("Phone number must be a valid mobile number")
            .isLength({ min: 10, max: 11 })
            .withMessage("Phone number must be at least 10 digits long for home numbers and at least 11 digits long for phone numbers"),

        body("orderItems")
            .isArray({ min: 1 }).withMessage("Order items must be a non-empty array"),

        body("orderItems.*.productId")
            .isMongoId().withMessage("Each order item must have a valid productId"),

        body("orderItems.*.name")
            .isString().withMessage("Each order item must have a name")
            .notEmpty().withMessage("Product name is required"),

        body("orderItems.*.quantity")
            .isInt({ min: 1 }).withMessage("Quantity must be at least 1"),

        body("orderItems.*.price")
            .isFloat({ min: 0 }).withMessage("Price must be a positive number"),

        body("paymentMethod")
            .isString().withMessage("Payment method must be a string")
            .isIn(["cash", "credit_card", "paypal", "apple_pay", "google_pay"])
            .withMessage("Invalid payment method"),

        body("address")
            .isString().withMessage("Address must be a string")
            .notEmpty().withMessage("Address is required"),

        body("floor")
            .isInt({ min: 0 }).withMessage("Floor must be at least 0"),

        body("apartment")
            .isInt({ min: 1 }).withMessage("Apartment must be at least 1"),

        body("desc")
            .optional()
            .isString().withMessage("Description must be a string"),

        body("status")
            .optional()
            .isString().withMessage("Status must be a string")
            .isIn(["pending", "confirmed", "shipped", "delivered", "cancelled"])
            .withMessage("Invalid status value")
    ];
};

const orderValidationRulesUpdate = () => {

    return [
        body("status")
            .optional()
            .isString().withMessage("Status must be a string")
            .isIn(["pending", "confirmed", "shipped", "delivered", "cancelled"])
            .withMessage("Invalid status value")
    ];
}
module.exports = {
    orderValidationRules,
    orderValidationRulesUpdate
};
