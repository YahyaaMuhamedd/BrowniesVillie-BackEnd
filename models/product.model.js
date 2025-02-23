const mongoose = require('mongoose');

const Product = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String
    },
    image: {
        type: String
    }
}, { timestamps: true });


module.exports = mongoose.model('Product', Product);
