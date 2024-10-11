const express = require('express');
const Product = require('../models/Product');

const router = express.Router();

console.log("productAPI.js");

// Get all products
router.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find();
    console.log("SUCCESS");
    console.log(res.json(products));
    res.json(products);
  } catch (error) {
    console.log("ERROR");
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
