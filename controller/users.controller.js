const { Error } = require("../middleware/Error");
const UserSchema = require("../models/user.model");
const { buildSearchQuery } = require("../middleware/SearchQuery");
const generateToken = require("../utils/jwt");

const getUsers = async (req, res) => {
    try {
        const query = req.query;
        const page = parseInt(query.page) || 1; // Default to page 1
        const limit = parseInt(query.limit) || 10; // Default to 10 items per page
        const skip = (page - 1) * limit;

        const searchQuery = query.search ? buildSearchQuery(query.search) : {};

        const users = await UserSchema.find({ ...searchQuery }, { "__v": false })
            .limit(limit)
            .skip(skip);

        res.json({ status: "success", data: { users } });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: `Failed to fetch users: ${err.message}` });
    }
};

const getUserById = async (req, res) => {
    try {
        const user = await UserSchema.findById(req.params.id, { "__v": false });

        if (!user) {
            return res.status(404).json({ ErrorMessage: 'Product not found' });
        }
        res.json({ status: "success", data: user });
    } catch (error) {
        res.status(500).json({ ErrorMessage: 'Invalid ID' });
    }



}

const registerUser = async (req, res) => {
    try {
        const { name, email, phone } = req.body;

        const existingUser = await UserSchema.findOne({ email, phone });
        if (existingUser) {
            return Error(res, 400, "Phone Already Exists");
        }
        const newUser = new UserSchema({ name, email, phone });
        await newUser.save();
        const loginUser = await UserSchema.findOne({ email, phone });
        const token = generateToken(loginUser);

        return res.json({ status: "success", message: "User Registered Successfully", data: { loginUser, token } });
    } catch (err) {
        return Error(res, 500, err.message);
    }
};

const loginUser = async (req, res) => {
    try {

        const { email, phone } = req.body;
        const loginUser = await UserSchema.findOne({ email, phone });



        if (!loginUser) {
            return Error(res, 404, "Invalid Email or Phone Number");
        }
        const token = generateToken(loginUser);

        return res.json({ status: "success", message: "User Logged In Successfully", data: { loginUser, token } });
    } catch (err) {
        return Error(res, 401, err.message);

    }
}

const addAddress = async (req, res) => {
    try {
        const { phone, address, floor, apartment, desc } = req.body;

        const user = await UserSchema.findOne({ phone });
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        const isAddressExists = user.addresses.some(addr =>
            addr.address === address &&
            addr.floor === floor &&
            addr.apartment === apartment &&
            addr.desc === desc
        );

        if (isAddressExists) {
            return res.status(400).json({ message: "Address already exists." });
        }

        user.addresses.push({ address, floor, apartment, desc });
        await user.save();

        res.json({ message: "Address added successfully", user });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error adding address." });
    }
};



module.exports = {
    getUsers,
    getUserById,
    registerUser,
    loginUser,
    addAddress
};
