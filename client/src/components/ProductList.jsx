import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "../styles/Home.css";

function ProductList() {
  const [products, setProducts] = useState([]);
  const role = localStorage.getItem('role');
  const username = localStorage.getItem('username');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/products');
        setProducts(res.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);

  const handleBuy = async (product) => {
    try {
      await axios.post('http://localhost:5000/api/orders', {
        user: username,
        productId: product._id,
        productName: product.name,
        price: product.price
      });
      alert(`Order placed for ${product.name}`);
    } catch (err) {
      alert('Failed to place order');
    }
  };

  return (
    <div className="product-list-container">
    <h1>Easy Buy Store</h1>
      <h2>Available Products</h2>

      <div className="product-grid">
        {products.map((p) => (
          <div key={p._id} className="product-card">
            <h3>{p.name}</h3>
            <img
              src={p.image}
              alt={p.name}
              className="product-image"
              onError={(e) => {
                e.target.src = "https://via.placeholder.com/150";
              }}
            />
            <p className="product-desc">{p.description}</p>
            <p className="product-price">₹{p.price}</p>
            {role === 'user' && (
              <button className="buy-button" onClick={() => handleBuy(p)}>
                Buy
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductList;
