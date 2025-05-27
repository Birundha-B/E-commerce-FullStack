import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "../styles/Home.css";

function ProductList() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const role = localStorage.getItem('role');
  const email = localStorage.getItem('email');

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
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:5000/api/orders', {
        user: email,
        productId: product._id,
        productName: product.name,
        price: product.price
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      alert(`Order placed for ${product.name}`);
    } catch (err) {
      alert('Failed to place order');
    }
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="product-list-container">
      <div className="banner">
        <h1>Easy Buy Store</h1>
        <p>Explore and order from a wide range of quality products</p>
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-bar"
        />
      </div>

      <div className="product-grid">
        {filteredProducts.map((p) => (
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
            <p className="product-stock">Stock: {p.stock}</p>

            {role === 'user' && p.stock > 0 && (
              <button className="buy-button" onClick={() => handleBuy(p)}>
                Buy
              </button>
            )}
            {p.stock === 0 && <p className="out-of-stock">Out of Stock</p>}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductList;
