const { Error } = require("../middleware/Error");
const Order = require("../models/orders.model");
const User = require("../models/user.model");
const generateToken = require("../utils/jwt");


// 📌 Create Order, Register/Login, and Return JWT
const createOrder = async (req, res) => {
    try {
        const { email, phone, name, orderItems, paymentMethod, address, floor, apartment, desc } = req.body;

        if (!email || !phone || !name || !orderItems || orderItems.length === 0) {
            return Error(res, 400, "All fields are required, and orderItems cannot be empty.");
        }

        let user = await User.findOne({ phone });

        if (!user) {
            user = new User({ name, email, phone });
            await user.save();
        } else {
            user.name = name;
            user.email = email;
            await user.save();
        }

        const token = generateToken(user);

        const newOrder = new Order({
            userId: user._id,
            name,
            email,
            phone,
            orderItems,
            paymentMethod,
            address,
            floor,
            apartment,
            desc,
            status: "pending"
        });

        await newOrder.save();

        res.json({
            status: "success",
            message: user.isNew ? "User registered and order placed successfully" : "User logged in and order placed successfully",
            user: { name: user.name, email: user.email, phone: user.phone },
            token,
            order: newOrder
        });
    } catch (error) {
        console.error(error);
        return Error(res, 500, "Error processing order.");
    }
};

// 🔒 Get Orders (Requires Authentication)
const getOrders = async (req, res) => {
    try {
        const orders = await Order.find({ userId: req.user.userId });
        res.json({ status: "success", data: orders });
    } catch (err) {
        console.error(err);
        return Error(res, 500, err.message);
    }
};

module.exports = { createOrder, getOrders };
