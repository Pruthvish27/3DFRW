const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes'); // Import product routes

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

// Use User Routes
app.use('/api/users', userRoutes); // Mount user routes under /api/users
app.use('/api/products', productRoutes); // Mount product routes under /api/products

app.get('/', (req, res) => {
  res.send('3D Furniture Store Backend is Running!');
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});