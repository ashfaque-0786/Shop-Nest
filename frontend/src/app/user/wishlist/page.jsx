"use client";
import React from "react";
import Link from "next/link";
import { FaHeart } from "react-icons/fa";
import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";
import toast from "react-hot-toast";

const WishlistPage = () => {
  const { wishlist, addToWishlist, isInWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleAddToCart = (product) => {
    addToCart(product, 1);
    toast.success('Added to cart!');
  };

  if (wishlist.length === 0) {
    return (
      <div className="min-h-screen mt-16 bg-gray-50 py-8 px-4 md:px-14">
        <div className="max-w-7xl mx-auto text-center">
          <FaHeart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Your Wishlist is Empty
          </h1>
          <p className="text-gray-600 mb-8">
            Browse our products and add your favorites to the wishlist!
          </p>
          <Link
            href="/browse-product"
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen mt-16 bg-gray-50 py-8 px-4 md:px-14">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">
          My Wishlist ({wishlist.length} items)
        </h1>        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {wishlist.map((product) => (
            <div
              key={product._id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 max-w-xl"
            >
              <div className="aspect-w-1 aspect-h-1 relative">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-64 object-contain"
                />
                <button
                  onClick={() => addToWishlist(product)}
                  className="absolute top-4 right-4 p-2 rounded-full text-red-500 bg-red-50 hover:text-red-600 hover:bg-red-100 shadow-md transition-colors"
                >
                  <FaHeart className="w-5 h-5" />
                </button>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {product.name}
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  {product.shortDescription}
                </p>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <span className="text-lg font-bold text-gray-900">
                      ₹{product.discountPrice}
                    </span>
                    {product.price > product.discountPrice && (
                      <span className="text-sm text-gray-500 line-through ml-2">
                        ₹{product.price}
                      </span>
                    )}
                  </div>
                  <span className="text-sm font-bold text-gray-600">
                    {product.brand}
                  </span>
                </div>
                <div className="flex gap-2">
                  <Link
                    href={`/view-product/${product._id}`}
                    className="flex-1 bg-blue-600 text-white text-center py-2 rounded-lg hover:bg-blue-700"
                  >
                    View Details
                  </Link>
                  <button 
                    onClick={() => handleAddToCart(product)}
                    className="px-4 py-2 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WishlistPage;
