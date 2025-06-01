const { Schema, model } = require('../connection');

const reviewSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'user', required: true },
    product: { type: Schema.Types.ObjectId, ref: 'product', required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

// Prevent duplicate reviews from same user for same product
reviewSchema.index({ user: 1, product: 1 }, { unique: true });

module.exports = model('review', reviewSchema);