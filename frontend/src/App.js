import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import ProductList from './pages/ProductList';
import ProductDetails from './pages/ProductDetails';
import Login from './pages/Login';
import Register from './pages/Register';
import Logout from './components/Logout';
import Header from './components/Header'; // Import the Header component
import Footer from './components/Footer'; // Import the Footer component
import './App.css';

function App() {
  return (
    <Router>
      <div className="container">
        <Header /> {/* Add the Header component */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/logout" element={<Logout />} />
        </Routes>
        <Footer /> {/* Add the Footer component */}
      </div>
    </Router>
  );
}

export default App;