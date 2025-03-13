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
            .isLength({ min: 10, max: 11 })
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

const addressValidationRules = () => {
    return [
        body('address')
            .notEmpty()
            .withMessage('address is required')
            .isLength({ min: 3 })
            .withMessage('address must be at least 3 characters long'),
        body('floor')
            .notEmpty()
            .withMessage('floor is required')
            .isNumeric()
            .withMessage('floor must be a number'),
        body('apartment')
            .notEmpty()
            .withMessage('apartment is required')
            .isNumeric()
            .withMessage('apartment must be a number'),
    ]
}

module.exports = {
    userValidationRules,
    loginUserValidationRules,
    addressValidationRules
}