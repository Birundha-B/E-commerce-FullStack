const express = require('express');
const router = express.Router();
const Order = require('../models/order');
const Product = require('../models/product');
const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ msg: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    res.status(401).json({ msg: "Invalid token" });
  }
};

router.post('/', authMiddleware, async (req, res) => {
  const { user, productId, productName, price } = req.body;
  try {
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ msg: "Product not found" });
    if (product.stock <= 0) return res.status(400).json({ msg: "Product out of stock" });

    product.stock -= 1;
    await product.save();

    const newOrder = new Order({ user, productId, productName, price });
    await newOrder.save();

    res.json({ message: 'Order placed successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
