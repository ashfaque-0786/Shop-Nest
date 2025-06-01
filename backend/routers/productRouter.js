const express = require('express');
const Model = require('../models/productModel');
const router = express.Router();

const jwt = require("jsonwebtoken");
const verifyToken = require('../middlewares/verifyToken');
require("dotenv").config();

router.post('/add', (req, res) => {
    console.log("🔍 Received Product Data:", JSON.stringify(req.body, null, 2));

    new Model(req.body).save()
    .then((result) => {
        console.log("✅ Saved to DB:", result);
        res.status(200).json(result);
    }).catch((err) => {
        console.log("❌ Error saving to DB:", err.message);
        res.status(500).json({ message: "DB Error", error: err.message });
    });
});

router.get('/getall',(req, res) => {
    Model.find()
    .then((result) => {
        res.status(200).json(result)
    })
    .catch((err) => {
        console.log(err);
    })
});

router.get('/getbyid/:id', (req, res) => {
    Model.findById(req.params.id)
    .then((result) => {
        res.status(200).json(result)
    })
    .catch((err) => {
        console.log(err);
    })
});

// Search and filter products
router.get('/search', async (req, res) => {
    try {
        const {
            query,
            category,
            brand,
            minPrice,
            maxPrice,
            sortBy,
            sortOrder = 'asc'
        } = req.query;

        // Build filter object
        let filter = {};
        
        // Search in name, description, and shortDescription
        if (query) {
            filter.$or = [
                { name: { $regex: query, $options: 'i' } },
                { description: { $regex: query, $options: 'i' } },
                { shortDescription: { $regex: query, $options: 'i' } }
            ];
        }

        // Category filter
        if (category) {
            filter.category = { $regex: category, $options: 'i' };
        }

        // Brand filter
        if (brand) {
            filter.brand = { $regex: brand, $options: 'i' };
        }

        // Price range filter
        if (minPrice || maxPrice) {
            filter.discountPrice = {};
            if (minPrice) filter.discountPrice.$gte = Number(minPrice);
            if (maxPrice) filter.discountPrice.$lte = Number(maxPrice);
        }

        // Build sort object
        let sort = {};
        if (sortBy) {
            sort[sortBy] = sortOrder === 'desc' ? -1 : 1;
        }

        const products = await Model.find(filter).sort(sort);
        
        // Get unique categories and brands for filters
        const categories = await Model.distinct('category');
        const brands = await Model.distinct('brand');
        
        res.status(200).json({
            products,
            filters: {
                categories,
                brands
            }
        });
    } catch (err) {
        console.error('Search error:', err);
        res.status(500).json({ message: 'Error searching products', error: err.message });
    }
});

// Delete a product
router.delete('/delete/:id', async (req, res) => {
    try {
        const result = await Model.findByIdAndDelete(req.params.id);
        if (!result) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (err) {
        console.error('Delete error:', err);
        res.status(500).json({ message: 'Error deleting product', error: err.message });
    }
});

// Update a product
router.put('/update/:id', async (req, res) => {
    try {
        const result = await Model.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        if (!result) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json(result);
    } catch (err) {
        console.error('Update error:', err);
        res.status(500).json({ message: 'Error updating product', error: err.message });
    }
});

module.exports = router;