const { body } = require('express-validator');


const userValidationRules = () => {
    return [
        body('name')
            .notEmpty()
            .withMessage('name is required')
            .isLength({ min: 3 })
            .withMessage('name must be at least 3 characters long'),
        body('email')
            .isEmail()
            .withMessage('email must be a valid email address'),
        body('phone')
            .isNumeric()
            .withMessage('phone number must be a number')
            .isLength({ min: 10 })
            .withMessage('phone number must be at least 10 digits long'),


    ]
}

const loginUserValidationRules = () => {
    return [
        body('email')
            .isEmail()
            .withMessage('email must be a valid email address'),
        body('phone')
            .isAlphanumeric()
            .withMessage('phone is required')
    ]
}

module.exports = {
    userValidationRules,
    loginUserValidationRules
}