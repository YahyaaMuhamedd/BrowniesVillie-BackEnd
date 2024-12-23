let data = require("../data/products");
const ProductSchema = require("../models/product.model");

const getProducts = async (req, res) => {
    const Products = await ProductSchema.find();
    res.json(Products);
}

const getProductById = async (req, res) => {
    try {
        const product = await ProductSchema.findById(req.params.id)

        if (!product) {
            return res.status(404).json({ ErrorMessage: 'Product not found' });
        }
        res.json(product);
    } catch (error) {
        res.status(500).json({ ErrorMessage: 'Invalid ID' });
    }



}

const createProduct = (req, res) => {
    const NewProduct = req.body;

    new ProductSchema(NewProduct).save();
    res.json(NewProduct);
}

const updateProduct = async (req, res) => {
    try {
        const ProductID = req.params.id;
        const UpdatedCourse = await ProductSchema.findByIdAndUpdate(ProductID, { $set: { ...req.body } });

        res.status(200).json(UpdatedCourse); // Return the updated product
    } catch (error) {
        res.status(500).json({ ErrorMessage: error.message });
    }

}

const deleteProduct = async (req, res) => {

    try {
        const ProductID = req.params.id;
        const DeleteProduct = await ProductSchema.findByIdAndDelete(ProductID);

        res.status(200).json({ success: true, message: "Product Deleted Successfully" });

    } catch (error) {
        res.status(500).json({ ErrorMessage: error.message });
    }

}

module.exports = { getProducts, getProductById, createProduct, updateProduct, deleteProduct }