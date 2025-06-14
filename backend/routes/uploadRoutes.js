const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path'); // Import the 'path' module

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
      const filetypes = /jpg|jpeg|png|glb|gltf/;
      const mimetype = filetypes.test(file.mimetype);
      const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

      if (mimetype && extname) {
          return cb(null, true);
      }
      cb("Error: File upload only supports the following filetypes - " + filetypes);
  }
});

// Route for Single File Upload
router.post('/', upload.single('image'), (req, res) => {  //'image' is the field name in the form
  if (req.file) {
    res.json({
      message: 'File uploaded successfully',
      filename: req.file.filename, // Return the filename
      filepath: `/uploads/${req.file.filename}` // Construct the file path
    });
  } else {
    res.status(400).json({ message: 'No file uploaded' });
  }
});

module.exports = router;