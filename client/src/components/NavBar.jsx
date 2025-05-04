import { Link } from 'react-router-dom';
import React from 'react';
import "../styles/navbar.css";


function NavBar() {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/login">Login</Link>
      <Link to="/signup">Signup</Link>
      <Link to="/add-product">Add Product</Link>
    </nav>
  );
}

export default NavBar;
