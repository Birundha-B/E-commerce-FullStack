const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  category: String,
  price: Number,
  image: String,
  stock: { type: Number, required: true, default: 1 } // Added stock field
});

module.exports = mongoose.model('Product', productSchema);
