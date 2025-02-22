const { Error } = require("../middleware/Error");
const UserSchema = require("../models/user.model");
const { buildSearchQuery } = require("../middleware/SearchQuery");

const getUsers = async (req, res) => {
    try {
        const Query = req.query;
        const page = Query.page || 1
        const limit = Query.limit || 10
        const skip = (page - 1) * 2
        const SearchQuery = buildSearchQuery(Query.search)

        const User = await UserSchema.find(SearchQuery, { "__v": false }).limit(limit).skip(skip)
        res.json({ status: "success", data: { user: User } })
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: `Faild to Login User Because ${err.message}` });
    }
};
const registerUser = async (req, res) => {
    try {
        const { name, email, phone } = req.body;

        const existingUser = await UserSchema.findOne({ phone });
        if (existingUser) {
            return Error(res, 400, "Phone Already Exists");
        }

        const newUser = new UserSchema({ name, email, phone });
        await newUser.save();

        return res.json({ status: "success", data: newUser });
    } catch (err) {
        return Error(res, 500, err.message);
    }
};

const loginUser = (req, res) => {
    try {

        const { email, phone } = req.body;
        const loginUser = UserSchema.findOne({ email, phone });



        if (!loginUser) {
            return Error(res, 404, "Invalid Email or Phone Number");
        }

        return res.json({ status: "success", data: loginUser });
    } catch (err) {
        return Error(res, 400, err.message);

    }
}


module.exports = {
    getUsers,
    registerUser,
    loginUser,
};
