const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users",
        },
        name: {
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            trim: true,
        },
        phone: {
            type: String,
            required: true,
            trim: true
        },
        orderItems: [
            {
                // productId: { type: mongoose.Schema.Types.ObjectId, ref: "Products", required: true },
                name: { type: String, required: true },
                quantity: { type: Number, required: true, min: 1 },
                price: { type: Number, required: true, min: 0 }
            },

        ],
        totalPrice: {
            type: Number,
        },
        paymentMethod: {
            type: String,
            enum: ["cash", "InstaPay", "Vodafone Cash"],
            required: true
        },
        phoneThatPaid: {
            type: String,
        },
        referenceNumber: {
            type: String,
        },
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
            trim: true
        },
        status: {
            type: String,
            enum: ["pending", "confirmed", "shipped", "delivered", "cancelled"],
            default: "pending"
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Orders", orderSchema);
