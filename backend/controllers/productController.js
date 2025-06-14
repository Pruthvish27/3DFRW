const Product = require('../models/Product');

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
    // For now, assume any logged-in user can create a product.
    // In a real application, you'd check if the user has admin privileges.

    const newProduct = new Product(req.body); // Assuming req.body contains the product data

    const savedProduct = await newProduct.save();

    res.status(201).json(savedProduct); //201 Created
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

    // For now, assume any logged-in user can update a product.
    // In a real application, you'd check if the user has admin privileges.

    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true, // Return the updated document
      runValidators: true, // Run model validation
    });

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

    // For now, assume any logged-in user can delete a product.
    // In a real application, you'd check if the user has admin privileges.

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