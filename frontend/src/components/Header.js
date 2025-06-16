import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import authService from '../services/authService';

function Header() {
  const user = authService.getCurrentUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    authService.logout();
    navigate('/login');
  };

  return (
    <header className="header">
      <div className="logo">
        <Link to="/">3D Furniture Store</Link>
      </div>
      <nav>
        <ul>
          <li>
            <Link to="/products">Products</Link>
          </li>
          {user ? (
            <>
              <li>
                <button onClick={handleLogout}>Logout</button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/register">Register</Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Header;