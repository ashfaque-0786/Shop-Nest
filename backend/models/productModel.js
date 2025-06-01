const { Schema, model } = require("../connection");

const mySchema = new Schema({
  images: [{ type: String, required: true }], // Array of image URLs
  name: { type: String, required: true },
  shortDescription: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  brand: { type: String, required: true },
  price: { type: Number, required: true },
  discountPrice: { type: Number, default: 0 },
  stock: { type: Number, required: true },
  colorStock: [
    {
      color: String,
      stock: Number,
    },
  ],
  size: { type: String },
  weight: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = model("product", mySchema);