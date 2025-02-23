const { Error } = require("../middleware/Error");
const Order = require("../models/orders.model");
const User = require("../models/user.model");
const { buildSearchQuery } = require("../middleware/SearchQuery");
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
        const Query = req.query; // Extract search query parameter
        const page = Query.page || 1; // Default to page 1 if not provided
        const limit = Query.limit || 2; // Default to 10 items per page if not provided
        const skip = (page - 1) * 2
        const SearchQuery = buildSearchQuery(Query.search); // Build a search query
        const orders = await Order.find({ SearchQuery }, { "__v": false }).limit(limit).skip(skip);
        res.json({ status: "success", data: orders });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch orders" });
    }
};

const updateProduct = async (req, res) => {
    try {
        const orderID = req.params.id;
        const updateOrder = await Order.findByIdAndUpdate(orderID, req.body, { new: true });
        res.status(200).json({ status: "success", data: updateOrder, message: "Order Updated Successfully", });
    } catch (err) {
        return Error(res, 500, err.message);
    }
}

module.exports = { createOrder, getOrders, updateProduct };
