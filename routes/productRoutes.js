const express = require('express');
const router = express.Router();
const Product = require('../models/product');

// Create a new product (POST)
router.post('/:id', async (req, res) => {
    try {
        // get the id in params
        const { id } = req.params;
        console.log("id", id);
        const product = new Product(req.body);
        product.userId = id;
        console.log("product", product);
        await product.save();
        res.status(201).json(product);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Get all products (GET) - with Population
router.get('/', async (req, res) => {
    try {
        const products = await Product.find().populate('userId', 'name email');
        res.json(products);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get a single product (GET)
router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id).populate('userId', 'name email');
        if (!product) return res.status(404).json({ message: 'Product not found' });
        res.json(product);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Update product (PATCH)
router.patch('/:id', async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
        if (!product) return res.status(404).json({ message: 'Product not found' });
        res.json(product);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete product (DELETE)
router.delete('/:id', async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) return res.status(404).json({ message: 'Product not found' });
        res.json({ message: 'Product deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
