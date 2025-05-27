const express = require('express');
const Product = require('../models/product');
const router = express.Router();
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

router.get('/', async (req, res) => {
  const { search, category } = req.query;
  const filter = {};
  if (search) filter.name = { $regex: search, $options: 'i' };
  if (category) filter.category = category;
  const products = await Product.find(filter);
  res.json(products);
});

router.post('/', authMiddleware, async (req, res) => {
  try {
    const { name, description, category, price, image, stock } = req.body;
    const newProduct = new Product({ name, description, category, price, image, stock });
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
