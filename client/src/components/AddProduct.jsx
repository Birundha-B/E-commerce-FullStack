import { useState } from 'react';
import axios from 'axios';
import React from 'react';
import "../styles/AddProduct.css";

function AddProduct() {
  const [product, setProduct] = useState({ name: '', description: '', category: '', price: '', image: '' });

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/products', product);
      alert('Product added');
    } catch (err) {
      alert('Failed to add');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" placeholder="Name" onChange={handleChange} required />
      <input name="description" placeholder="Description" onChange={handleChange} />
      <input name="category" placeholder="Category" onChange={handleChange} />
      <input name="price" placeholder="Price" type="number" onChange={handleChange} />
      <input name="image" placeholder="Image URL" onChange={handleChange} />
      <button type="submit">Add Product</button>
    </form>
  );
}

export default AddProduct;