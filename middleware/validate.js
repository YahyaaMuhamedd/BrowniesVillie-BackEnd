const { validationResult } = require('express-validator');

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

module.exports = validate;