const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
        unique: true,
    },
    addresses: [
        {
            address: {
                type: String,
                required: true
            },
            floor: {
                type: Number,
                required: true
            },
            apartment: {
                type: Number,
                required: true
            },
            desc: {
                type: String,
            }
        }
    ],
    myOrders: [
        {
            orderItems: [
                {
                    name: { type: String, required: true },
                    quantity: { type: Number, required: true, min: 1 },
                    price: { type: Number, required: true, min: 0 }
                }
            ],
            totalPrice: Number,
            paymentMethod: String,
            address: String,
            floor: Number,
            apartment: Number,
            desc: String,
            status: { type: String, default: "pending" },
            createdAt: { type: Date, default: Date.now }
        }
    ]
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
