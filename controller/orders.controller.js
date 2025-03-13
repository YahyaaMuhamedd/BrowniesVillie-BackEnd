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
            return res.status(400).json({ message: "All fields are required, and orderItems cannot be empty." });
        }

        let user = await User.findOne({ phone });

        if (!user) {
            user = new User({
                name,
                email,
                phone,
                addresses: [{ address, floor, apartment, desc }],
                myOrders: []
            });
            await user.save();
        } else {
            const isAddressExists = user.addresses.some(addr =>
                addr.address === address &&
                addr.floor === floor &&
                addr.apartment === apartment &&
                addr.desc === desc
            );

            if (!isAddressExists) {
                user.addresses.push({ address, floor, apartment, desc });
                await user.save();
            }
        }
        const totalPrice = orderItems.reduce((total, item) => {
            return total + item.price * item.quantity;
        }, 0);

        const newOrder = await Order.create({
            userId: user._id,
            name,
            email,
            phone,
            orderItems,
            totalPrice,
            paymentMethod,
            address,
            floor,
            apartment,
            desc,
            status: "pending"
        });

        // Push only the order details to myOrders
        const userOrder = {
            orderId: newOrder._id, // To get order details later
            orderItems,
            totalPrice,
            paymentMethod,
            address,
            floor,
            apartment,
            desc,
            status: "pending"
        };

        user.myOrders.push(userOrder);
        await user.save();

        const token = generateToken(user);

        res.json({
            status: "success",
            message: user.isNew ? "User registered and order placed successfully" : "User logged in and order placed successfully",
            user: { name: user.name, email: user.email, phone: user.phone },
            token,
            order: newOrder
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error processing order." });
    }
};


// 🔒 Get Orders (Requires Authentication)
const getOrders = async (req, res) => {
    try {
        const query = req.query; // Extract search query parameter
        const page = parseInt(query.page) || 1; // Default to page 1
        const limit = parseInt(query.limit) || 10; // Default to 10 items per page
        const skip = (page - 1) * limit;

        // Handle search query
        const searchQuery = query.search ? buildSearchQuery(query.search) : {};

        const orders = await Order.find({ ...searchQuery }, { "__v": false })
            .limit(limit)
            .skip(skip);

        res.json({ status: "success", data: orders });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch orders" });
    }
};

const updateOrder = async (req, res) => {
    try {
        const orderID = req.params.id;
        const updateOrder = await Order.findByIdAndUpdate(orderID, req.body, { new: true });
        res.status(200).json({ status: "success", data: updateOrder, message: "Order Updated Successfully", });
    } catch (err) {
        return Error(res, 500, err.message);
    }
}

module.exports = { createOrder, getOrders, updateOrder };
