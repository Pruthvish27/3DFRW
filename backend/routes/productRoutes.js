const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { protect } = require('../middleware/authMiddleware'); // Import the auth middleware

router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);
router.post('/', protect, productController.createProduct); // Requires authentication (admin)
router.put('/:id', protect, productController.updateProduct); // Requires authentication (admin)
router.delete('/:id', protect, productController.deleteProduct); // Requires authentication (admin)

module.exports = router;