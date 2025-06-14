const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true, maxlength: 100 },
  description: { type: String, required: true },
  price: { type: Number, required: true, min: 0 },
  category: { type: String, required: true, trim: true, maxlength: 50 },
  images: [{ type: String }], // Array of image URLs
  model3D: { type: String, required: true }, // URL to the 3D model file (GLTF)
  specifications: { type: Object }, // JSON object for dimensions, materials, etc.
  // Additional fields:
  sku: { type: String, unique: true, trim: true }, // Stock Keeping Unit
  stockQuantity: { type: Number, default: 0, min: 0 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Product', productSchema);