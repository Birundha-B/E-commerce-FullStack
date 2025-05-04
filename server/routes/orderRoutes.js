const express = require('express');
const router = express.Router();

// POST /api/orders
router.post('/', (req, res) => {
  const { items, total } = req.body;
  console.log('📦 Order received:', req.body);
  res.json({ message: 'Order placed successfully' });
});

module.exports = router;
