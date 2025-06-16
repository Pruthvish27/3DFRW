import React from 'react';
import { Link } from 'react-router-dom';
import authService from '../services/authService';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

function Home() {
  const user = authService.getCurrentUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login'); // Redirect to home page if logged in
    }
  }, [navigate]);
  return (
    <div>
      <h1>Home Page</h1>
      <p>Welcome to our 3D Furniture Store!</p>
      <ul>
        <li>
          <Link to="/products">View Products</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/register">Register</Link>
        </li>
        <li>
          <Link to="/logout">Logout</Link>
        </li>
      </ul>
    </div>
  );
}

export default Home;