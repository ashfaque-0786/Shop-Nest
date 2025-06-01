'use client';
import React from 'react';
import { useCart } from '@/context/CartContext';
import { FaTrash, FaMinus, FaPlus } from 'react-icons/fa';
import Link from 'next/link';

const CartPage = () => {
  const { cart, removeFromCart, updateQuantity, clearCart, getCartTotal } = useCart();

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
            <p className="text-gray-600 mb-6">Looks like you haven't added anything to your cart yet.</p>
            <Link
              href="/browse-product"
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="bg-blue-50">
        <div className="min-h-screen max-w-3xl rounded-md  mx-auto  pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Shopping Cart</h2>
            <button
              onClick={clearCart}
              className="text-red-600 hover:text-red-800 font-medium"
            >
              Clear Cart
            </button>
          </div>

          <div className="space-y-4">
            {cart.map((item) => (
              <div
                key={`${item._id}-${item.color}`}
                className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 border rounded-lg"
              >
                {/* Product Image */}
                <div className="w-24 h-24 flex-shrink-0">
                  <img
                    src={item.images[0]}
                    alt={item.name}
                    className="w-full h-full object-contain"
                  />
                </div>

                {/* Product Info */}
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
                  <p className="text-sm text-gray-600">{item.shortDescription}</p>
                  {item.color && (
                    <p className="text-sm text-gray-600">Color: {item.color}</p>
                  )}
                </div>

                {/* Price and Quantity */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <div className="flex items-center border rounded-lg">
                    <button
                      onClick={() => updateQuantity(item._id, item.quantity - 1, item.color)}
                      className="p-2 hover:bg-gray-100"
                      disabled={item.quantity <= 1}
                    >
                      <FaMinus className="w-4 h-4" />
                    </button>
                    <span className="px-4 py-2 border-x">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item._id, item.quantity + 1, item.color)}
                      className="p-2 hover:bg-gray-100"
                    >
                      <FaPlus className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="text-right">
                    <p className="text-lg font-bold text-gray-900">
                      ₹{item.discountPrice * item.quantity}
                    </p>
                    {item.price > item.discountPrice && (
                      <p className="text-sm text-gray-500 line-through">
                        ₹{item.price * item.quantity}
                      </p>
                    )}
                  </div>

                  <button
                    onClick={() => removeFromCart(item._id, item.color)}
                    className="text-red-600 hover:text-red-800 p-2"
                  >
                    <FaTrash className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Cart Summary */}
          <div className="mt-8 border-t pt-8">
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-medium text-gray-900">Subtotal</span>
              <span className="text-2xl font-bold text-gray-900">₹{getCartTotal()}</span>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="../browse-product"
                className="flex-1 px-6 py-3 text-center border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
              >
                Continue Shopping
              </Link>              <Link
                href="/user/checkout"
                className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-center"
              >
                Proceed to Checkout
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default CartPage;
