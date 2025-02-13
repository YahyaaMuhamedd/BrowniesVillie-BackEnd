const { buildSearchQuery } = require("../middleware/SearchQuery");
const ProductSchema = require("../models/product.model");

const getProducts = async (req, res) => {
    try {
        const Query = req.query; // Extract search query parameter
        const page = Query.page || 1; // Default to page 1 if not provided
        const limit = Query.limit || 2; // Default to 10 items per page if not provided
        const skip = (page - 1) * 2
        const SearchQuery = buildSearchQuery(Query.search); // Build a search query

        const products = await ProductSchema.find(SearchQuery, { "__v": false }).limit(limit).skip(skip); // Fetch products from MongoDB
        res.json({ status: "success", data: products }); // Return the fetched products as JSON
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch products" });
    }
};

const getProductById = async (req, res) => {
    try {
        const product = await ProductSchema.findById(req.params.id, { "__v": false });

        if (!product) {
            return res.status(404).json({ ErrorMessage: 'Product not found' });
        }
        res.json({ status: "success", data: product });
    } catch (error) {
        res.status(500).json({ ErrorMessage: 'Invalid ID' });
    }



}

const createProduct = (req, res) => {
    const NewProduct = req.body;

    new ProductSchema(NewProduct).save();
    res.json({ status: "success", data: NewProduct });
}

const updateProduct = async (req, res) => {
    try {
        const ProductID = req.params.id;
        const UpdatedCourse = await ProductSchema.findByIdAndUpdate(ProductID, { $set: { ...req.body } });

        res.status(200).json({ status: "success", data: UpdatedCourse }); // Return the updated product
    } catch (error) {
        res.status(500).json({ ErrorMessage: error.message });
    }

}

const deleteProduct = async (req, res) => {

    try {
        const ProductID = req.params.id;
        const DeleteProduct = await ProductSchema.findByIdAndDelete(ProductID);

        res.status(200).json({ success: true, message: "Product Deleted Successfully", data: null });

    } catch (error) {
        res.status(500).json({ ErrorMessage: error.message });
    }

}

module.exports = { getProducts, getProductById, createProduct, updateProduct, deleteProduct }