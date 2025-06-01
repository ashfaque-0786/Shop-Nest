"use client";
import axios from "axios";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import {
  FaShoppingCart,
  FaStar,
  FaTruck,
  FaBox,
  FaShieldAlt,
} from "react-icons/fa";
import toast from "react-hot-toast";
import { useCart } from "@/context/CartContext";

const ViewProduct = () => {
  const { id } = useParams();
  const [productData, setProductData] = useState({});
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState("");
  const { addToCart } = useCart();

  const fetchProductData = async () => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/product/getbyid/${id}`
      );
      setProductData(res.data);
      if (res.data.colorStock && res.data.colorStock.length > 0) {
        setSelectedColor(res.data.colorStock[0].color);
      }
      console.log(res.data);
    } catch (error) {
      console.error("Error fetching product:", error);
      toast.error("Failed to load product details");
    }
  };

  useEffect(() => {
    fetchProductData();
  }, [id]);

  const getStockForColor = (color) => {
    const colorStock = productData.colorStock?.find((cs) => cs.color === color);
    return colorStock?.stock || 0;
  };

  const handleAddToCart = () => {
    if (productData.colorStock?.length > 0 && !selectedColor) {
      toast.error("Please select a color");
      return;
    }
    addToCart(productData, quantity, selectedColor);
  };

  const handleBuyNow = () => {
    handleAddToCart();
    // TODO: Implement redirect to cart/checkout
    toast.success("Redirecting to checkout...");
  };

  return (
    <div className="min-h-screen mt-16 bg-gray-50 py-8 px-4 md:px-14">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 md:px-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Image Gallery */}
            <div className="space-y-4">
              <div className="aspect-square rounded-xl overflow-hidden bg-gray-100 border">
                <img
                  src={productData.images?.[selectedImage]}
                  alt={productData.name}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="grid grid-cols-4 gap-4">
                {productData.images?.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-square rounded-lg overflow-hidden bg-gray-50 border hover:border-blue-500 transition-all ${
                      selectedImage === index ? "ring-2 ring-blue-500" : ""
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${productData.name} ${index + 1}`}
                      className="w-full h-full object-contain"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Details */}
            <div className="space-y-6">
              {/* Basic Info */}
              <div className="space-y-2">
                <p className="text-sm text-blue-600 font-medium">
                  {productData.category}
                </p>
                <h1 className="text-3xl font-bold text-gray-900">
                  {productData.name}
                </h1>
                <p className="text-lg text-gray-600">{productData.brand}</p>
              </div>

              {/* Short Description */}
              <p className="text-gray-600 text-lg">
                {productData.shortDescription}
              </p>

              {/* Rating */}
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, index) => (
                    <FaStar key={index} className="w-5 h-5 text-yellow-400" />
                  ))}
                </div>
                <span className="text-sm text-gray-500">(50 Reviews)</span>
              </div>

              {/* Price */}
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <p className="text-3xl font-bold text-gray-900">
                    ₹{productData.discountPrice}
                  </p>
                  {productData.price > productData.discountPrice && (
                    <p className="text-xl text-gray-500 line-through">
                      ₹{productData.price}
                    </p>
                  )}
                </div>
                {productData.price > productData.discountPrice && (
                  <p className="text-green-600 font-medium">
                    Save ₹{productData.price - productData.discountPrice} (
                    {Math.round(
                      ((productData.price - productData.discountPrice) /
                        productData.price) *
                        100
                    )}
                    % OFF)
                  </p>
                )}
              </div>

              {/* Color Selection */}
              {productData.colorStock && productData.colorStock.length > 0 && (
                <div className="space-y-3">
                  <label className="text-sm font-medium text-gray-700">
                    Colors
                  </label>
                  <div className="flex flex-wrap gap-3">
                    {productData.colorStock.map((cs) => (
                      <button
                        key={cs.color}
                        onClick={() => setSelectedColor(cs.color)}
                        className={`px-4 py-2 rounded-md border ${
                          selectedColor === cs.color
                            ? "border-blue-500 bg-blue-50 text-blue-700"
                            : "border-gray-300 hover:border-blue-500"
                        }`}
                      >
                        {cs.color} ({cs.stock})
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity */}
              <div className="space-y-3">
                <label
                  htmlFor="quantity"
                  className="text-sm font-medium text-gray-700"
                >
                  Quantity
                </label>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center border border-gray-300 rounded-md">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-4 py-2 border-r border-gray-300 hover:bg-gray-100"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      id="quantity"
                      value={quantity}
                      onChange={(e) =>
                        setQuantity(Math.max(1, parseInt(e.target.value)))
                      }
                      className="w-20 text-center border-none focus:ring-0"
                    />
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-4 py-2 border-l border-gray-300 hover:bg-gray-100"
                    >
                      +
                    </button>
                  </div>
                  <span className="text-sm text-gray-500">
                    {selectedColor &&
                      `${getStockForColor(selectedColor)} units available`}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-4">
                <button
                  onClick={handleBuyNow}
                  className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                >
                  Buy Now
                </button>
                <button
                  onClick={handleAddToCart}
                  className="flex items-center justify-center space-x-2 flex-1 border border-blue-600 text-blue-600 py-3 px-6 rounded-lg hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                >
                  <FaShoppingCart className="w-5 h-5" />
                  <span>Add to Cart</span>
                </button>
              </div>

              {/* Features */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t">
                <div className="flex flex-col items-center text-center space-y-2">
                  <FaTruck className="w-6 h-6 text-blue-600" />
                  <span className="text-sm font-medium">Free Delivery</span>
                </div>
                <div className="flex flex-col items-center text-center space-y-2">
                  <FaBox className="w-6 h-6 text-blue-600" />
                  <span className="text-sm font-medium">7 Day Return</span>
                </div>
                <div className="flex flex-col items-center text-center space-y-2">
                  <FaShieldAlt className="w-6 h-6 text-blue-600" />
                  <span className="text-sm font-medium">2 Year Warranty</span>
                </div>
              </div>
            </div>
          </div>
          <div className="space-y-6 grid grid-cols-2 gap-8 mt-10 ">
            {/* Description Section */}
            <div className="mt-6  border-t pt-8 ">
              <h2 className="text-2xl font-bold mb-4">Product Details</h2>
              <div className="prose max-w-none">
                <p className="text-gray-600 whitespace-pre-line">
                  {productData.description}
                </p>
              </div>
            </div>

            {/* Specifications */}
            <div className="mt-12 border-t pt-8  px-20">
              <h2 className="text-2xl font-bold mb-4">Specifications</h2>
              <div className="grid grid-cols-1 md:grid-cols-1 gap-8">
                <div className="space-y-4">
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-gray-600">Brand</span>
                    <span className="font-medium">{productData.brand}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-gray-600">Category</span>
                    <span className="font-medium">{productData.category}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-gray-600">Weight</span>
                    <span className="font-medium">{productData.weight} </span>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-gray-600">Size</span>
                    <span className="font-medium">{productData.size}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-gray-600">Total Stock</span>
                    <span className="font-medium">
                      {productData.stock} units
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewProduct;
