import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import ProductList from './pages/ProductList';
import ProductDetails from './pages/ProductDetails';
import Login from './pages/Login';
import Register from './pages/Register';
import Logout from './components/Logout';
import './App.css'; // Import the CSS file

function App() {
  return (
    <Router>
      <div className="container"> {/* Add a container div */}
        {/* Navigation (Header) - We'll create this later */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/logout" element={<Logout />} />
        </Routes>
        {/* Footer - We'll create this later */}
      </div>
    </Router>
  );
}

export default App;