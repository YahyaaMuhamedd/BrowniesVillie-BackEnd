const { body, validationResult } = require('express-validator');

const productValidationRules = () => {
    return [
        body('title')
            .isString()
            .withMessage('Name must be a string')
            .notEmpty()
            .withMessage('Name is required')
            .isLength({ min: 3 })
            .withMessage('Name must be at least 3 characters long'),
        body('price')
            .isNumeric()
            .withMessage('Price must be a number')
            .isFloat({ gt: 0 })
            .withMessage('Price must be greater than 0')
    ];
};

const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        // i want to to make the output of errors appear the meesage only not al of array
        // i want to make it like this
        // "Name must be at least 3 characters long"
        // "Price must be greater than 0"
        const errorMessages = errors.array().map(error => error.msg);
        return res.status(400).json({ error: errorMessages });
    }
    next();
};

module.exports = {
    productValidationRules,
    validate
};