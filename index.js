require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const helmet = require("helmet"); // For securing headers
const rateLimit = require("express-rate-limit"); // For request limiting
const morgan = require("morgan"); // For logging requests
const productsRoute = require("./routes/products.route");
const usersRoute = require("./routes/user.route");
const ordersRoute = require("./routes/orders.route");

const app = express();
const port = process.env.PORT || 4000;

// ✅ Middleware
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

// ✅ Rate Limiting (Prevent DDoS Attacks)
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per window
});
app.use(limiter);

// ✅ Routes
app.use("/api/products", productsRoute);
app.use("/api/users", usersRoute);
app.use("/api/orders", ordersRoute);

// ✅ MongoDB Connection
const MongoDBURL = process.env.MONGODB_URL;

mongoose.connect(MongoDBURL, {
    autoIndex: false, // Disable auto-indexing in production for better performance
})
    .then(() => console.log('🟢 Connected to MongoDB'))
    .catch((err) => console.error('🔴 MongoDB connection error:', err));

// ✅ Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: "Internal Server Error" });
});

// ✅ Start Server
app.listen(port, () => {
    console.log(`🚀 Server is running on port ${port}`);
});
