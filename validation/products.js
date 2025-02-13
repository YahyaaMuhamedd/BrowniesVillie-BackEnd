const { body } = require('express-validator');

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

module.exports = {
    productValidationRules,
};