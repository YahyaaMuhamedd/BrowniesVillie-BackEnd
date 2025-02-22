const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users",
            required: true
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
            lowercase: true
        },
        phone: {
            type: String,
            required: true,
            trim: true
        },
        orderItems: [
            {
                productId: { type: mongoose.Schema.Types.ObjectId, ref: "Products", required: true },
                name: { type: String, required: true },
                quantity: { type: Number, required: true, min: 1 },
                price: { type: Number, required: true, min: 0 }
            }
        ],
        paymentMethod: {
            type: String,
            enum: ["cash", "credit_card", "paypal", "apple_pay", "google_pay"],
            required: true
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
