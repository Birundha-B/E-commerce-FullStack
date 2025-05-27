// src/components/NavBar.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './navbar.css';

function NavBar() {
  const role = localStorage.getItem('role');
  const email = localStorage.getItem('email');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/" className="brand">🛒 EasyBuy</Link>
      </div>
      <div className="navbar-links">
        <Link to="/">Home</Link>
        {role === 'admin' && <Link to="/add-product">Add Product</Link>}
        {!email && <Link to="/login">Login</Link>}
        {!email && <Link to="/signup">Signup</Link>}
        {email && <button className="logout-btn" onClick={handleLogout}>Logout</button>}
      </div>
    </nav>
  );
}

export default NavBar;
