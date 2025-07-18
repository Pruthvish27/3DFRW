const Product = require('../models/Product');
const multer = require('multer'); // Import multer
const path = require('path');

// @desc   Get all products
// @route  GET /api/products
// @access Public
const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find({}); // Fetch all products
        res.json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to get products', error: error.message });
    }
};

// @desc   Get a product by ID
// @route  GET /api/products/:id
// @access Public
const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.json(product);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to get product', error: error.message });
    }
};

// @desc   Create a new product
// @route  POST /api/products
// @access Private (admin only)
const createProduct = async (req, res) => {
    try {
        const { name, description, price, category, images, model3D, specifications } = req.body;
        //const images = req.body.images;
        //const model3D = req.body.model3D;

        const newProduct = new Product({
            name,
            description,
            price,
            category,
            images,
            model3D,
            specifications
        });

        const savedProduct = await newProduct.save();
        res.status(201).json(savedProduct); // 201 Created
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: 'Failed to create product', error: error.message }); // 400 Bad Request
    }
};

// @desc   Update an existing product
// @route  PUT /api/products/:id
// @access Private (admin only)
const updateProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const { name, description, price, category, images, model3D, specifications } = req.body;

        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            {
                name,
                description,
                price,
                category,
                images,
                model3D,
                specifications
            },
            {
                new: true, // Return the updated document
                runValidators: true // Run model validation
            }
        );

        res.json(updatedProduct);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: 'Failed to update product', error: error.message });
    }
};

// @desc   Delete a product
// @route  DELETE /api/products/:id
// @access Private (admin only)
const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        await Product.findByIdAndDelete(req.params.id);

        res.json({ message: 'Product deleted' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to delete product', error: error.message });
    }
};

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
};