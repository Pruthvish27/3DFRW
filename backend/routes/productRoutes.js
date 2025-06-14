const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { protect } = require('../middleware/authMiddleware'); // Import the auth middleware
const multer = require('multer');
const path = require('path');

//Configure Multer Storage
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
        const filetypes = /jpg|jpeg|png|glb|gltf|obj|fbx/;
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

        if (mimetype && extname) {
            return cb(null, true);
        }
        cb("Error: File upload only supports the following filetypes - " + filetypes);
    }
});

router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);
router.post('/', protect, productController.createProduct); // Requires authentication (admin)
router.put('/:id', protect, productController.updateProduct); // Requires authentication (admin)
router.delete('/:id', protect, productController.deleteProduct); // Requires authentication (admin)

module.exports = router;