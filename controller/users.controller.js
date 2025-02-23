const { Error } = require("../middleware/Error");
const UserSchema = require("../models/user.model");
const { buildSearchQuery } = require("../middleware/SearchQuery");
const generateToken = require("../utils/jwt");

const getUsers = async (req, res) => {
    try {
        const Query = req.query;
        const page = Query.page || 1
        const limit = Query.limit || 10
        const skip = (page - 1) * 2
        const SearchQuery = buildSearchQuery(Query.search)

        const User = await UserSchema.find(SearchQuery, { "__v": false }).limit(limit).skip(skip)
        res.json({ status: "success", data: { users: User } })
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: `Faild to Login User Because ${err.message}` });
    }
};
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


module.exports = {
    getUsers,
    registerUser,
    loginUser,
};
