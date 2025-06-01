const express = require('express');
const router = express.Router();
const Review = require('../models/reviewModel');
const verifyToken = require('../middlewares/verifyToken');

// Add a review
router.post('/add', verifyToken, async (req, res) => {
    try {
        const review = new Review({
            ...req.body,
            user: req.user._id
        });
        const savedReview = await review.save();
        await savedReview.populate('user', 'name');
        res.status(201).json(savedReview);
    } catch (error) {
        if (error.code === 11000) {
            res.status(400).json({ message: 'You have already reviewed this product' });
        } else {
            res.status(500).json({ message: error.message });
        }
    }
});

// Get reviews for a product
router.get('/product/:productId', async (req, res) => {
    try {
        const reviews = await Review.find({ product: req.params.productId })
            .populate('user', 'name')
            .sort({ createdAt: -1 });
        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get reviews by a user
router.get('/user', verifyToken, async (req, res) => {
    try {
        const reviews = await Review.find({ user: req.user._id })
            .populate('product', 'name images')
            .sort({ createdAt: -1 });
        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update a review
router.put('/:id', verifyToken, async (req, res) => {
    try {
        const review = await Review.findOne({ _id: req.params.id, user: req.user._id });
        if (!review) {
            return res.status(404).json({ message: 'Review not found or unauthorized' });
        }

        Object.assign(review, req.body);
        await review.save();
        await review.populate('user', 'name');
        res.status(200).json(review);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Delete a review
router.delete('/:id', verifyToken, async (req, res) => {
    try {
        const review = await Review.findOneAndDelete({ _id: req.params.id, user: req.user._id });
        if (!review) {
            return res.status(404).json({ message: 'Review not found or unauthorized' });
        }
        res.status(200).json({ message: 'Review deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;