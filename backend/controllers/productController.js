const Product = require('../models/Product');
const multer = require('multer'); // Import multer
const path = require('path');

// Configure Multer Storage
const storage = multer.diskStorage({
    destination: 'uploads/', // Files will be saved in the 'uploads' directory
    filename: (req, file, cb) => {
        // Generate a unique filename
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const fileExtension = path.extname(file.originalname); // Get the file extension

        cb(null, file.fieldname + '-' + uniqueSuffix + fileExtension);
    }
});

// Create the Multer Upload Instance
const upload = multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
        const filetypes = /jpg|jpeg|png|glb|gltf|obj|fbx/; // Added obj and fbx
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

        if (mimetype && extname) {
            return cb(null, true);
        }
        cb("Error: File upload only supports the following filetypes - " + filetypes);
    }
});

// @desc   Get all products with search and filter
// @route  GET /api/products
// @access Public
const getAllProducts = async (req, res) => {
    try {
        const { searchTerm, category } = req.query;

        let query = {}; // Base query

        if (searchTerm) {
            query.name = { $regex: searchTerm, $options: 'i' }; // Case-insensitive search
        }

        if (category) {
            query.category = category;
        }

        const products = await Product.find(query);
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
    upload.fields([{ name: 'image', maxCount: 5 }, { name: 'model3D', maxCount: 1 }])(req, res, async (err) => {
        if (err) {
            console.error(err);
            return res.status(400).json({ message: 'File upload error', error: err.message });
        }

        try {
            const { name, description, price, category } = req.body;
            let specifications = {}; // Default to an empty object

            if (req.body.specifications) {
                try {
                    specifications = JSON.parse(req.body.specifications);
                } catch (parseError) {
                    return res.status(400).json({ message: 'Invalid specifications JSON', error: parseError.message });
                }
            }


            if (!req.files['image'] || req.files['image'].length === 0) {
                return res.status(400).json({ message: 'At least one image is required' });
            }

            if (!req.files['model3D'] || req.files['model3D'].length === 0) {
                return res.status(400).json({ message: 'A 3D model is required' });
            }

            const images = req.files['image'].map(file => '/uploads/' + file.filename);
            const model3D = '/uploads/' + req.files['model3D'][0].filename;

            const newProduct = new Product({
                name,
                description,
                price,
                category,
                images,
                model3D,
                specifications,
            });

            const savedProduct = await newProduct.save();
            res.status(201).json(savedProduct); // 201 Created
        } catch (error) {
            console.error(error);
            res.status(400).json({ message: 'Failed to create product', error: error.message }); // 400 Bad Request
        }
    });
};

// @desc   Update an existing product
// @route  PUT /api/products/:id
// @access Private (admin only)
const updateProduct = async (req, res) => {
    upload.fields([{ name: 'image', maxCount: 5 }, { name: 'model3D', maxCount: 1 }])(req, res, async (err) => {
        if (err) {
            console.error(err);
            return res.status(400).json({ message: 'File upload error', error: err.message });
        }

        try {
            const product = await Product.findById(req.params.id);

            if (!product) {
                return res.status(404).json({ message: 'Product not found' });
            }
            const { name, description, price, category } = req.body;
            let specifications = {}; // Default to an empty object

            if (req.body.specifications) {
                try {
                    specifications = JSON.parse(req.body.specifications);
                } catch (parseError) {
                    return res.status(400).json({ message: 'Invalid specifications JSON', error: parseError.message });
                }
            }
            let images = product.images;
            let model3D = product.model3D;
            if (req.files['image']) {
                images = req.files['image'].map(file => '/uploads/' + file.filename);
            }

            if (req.files['model3D']) {
                model3D = '/uploads/' + req.files['model3D'][0].filename;
            }

            const updatedProduct = await Product.findByIdAndUpdate(
                req.params.id,
                {
                    name,
                    description,
                    price,
                    category,
                    images,
                    model3D,
                    specifications,
                },
                {
                    new: true, // Return the updated document
                    runValidators: true, // Run model validation
                }
            );

            res.json(updatedProduct);
        } catch (error) {
            console.error(error);
            res.status(400).json({ message: 'Failed to update product', error: error.message });
        }
    });
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