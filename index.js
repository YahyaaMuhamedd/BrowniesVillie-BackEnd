require("dotenv").config();
const express = require("express");
const cors = require("cors")
const mongoose = require("mongoose");
const productsRoute = require("./routes/products.route");
const usersRoute = require("./routes/user.route");
const ordersRoute = require("./routes/orders.route");


const app = express();
const port = 4000;

app.use(express.json());
app.use(cors());
app.use("/api/products", productsRoute);
app.use("/api/users", usersRoute);
app.use("/api/orders", ordersRoute);


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);

})


const MongoDBURL = process.env.MONGODB_URL;
mongoose.connect(MongoDBURL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('connected to mongodb');

    }).catch((err) => {
        console.log(err);
    })


// const client = new MongoClient(uri, {
//     serverApi: {
//         version: ServerApiVersion.v1,
//         strict: true,
//         deprecationErrors: true,
//     }
// });


// async function run() {
//     try {
//         // Connect the client to the server	(optional starting in v4.7)
//         await client.connect();
//         // Send a ping to confirm a successful connection
//         await client.db("browniesvillie").command({ ping: 1 });
//         await client.db("browniesvillie").collection("Products");

//         console.log("Connected correctly to server");

//         // Get Collection

//         const collection = client.db("browniesvillie").collection("Products");
//         const data = await collection.find({}).toArray();


//         // Insert Into Collection
//         await collection.insertOne({
//             "title": "Brownies Nuts",
//             "description": "Brownies Filed With Nuts",
//             "price": 150

//         })
//         // Get Data From Collection
//         console.log(data);
//     } finally {
//         // Ensures that the client will close when you finish/error
//         await client.close();
//     }
// }
// run().catch(console.dir);