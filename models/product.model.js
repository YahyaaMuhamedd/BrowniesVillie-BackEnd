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
});

const ProductSchema = mongoose.model('Product', Product);

module.exports = ProductSchema;