'use client';
import { createContext, useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    // Load cart from localStorage on mount
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  useEffect(() => {
    // Update localStorage and cart count when cart changes
    localStorage.setItem('cart', JSON.stringify(cart));
    setCartCount(cart.reduce((total, item) => total + item.quantity, 0));
  }, [cart]);
  const addToCart = (product, quantity = 1, selectedColor = '') => {
    let isUpdate = false;
    setCart(prevCart => {
      const existingItemIndex = prevCart.findIndex(
        item => item._id === product._id && item.color === selectedColor
      );

      if (existingItemIndex > -1) {
        // Update quantity if item exists
        isUpdate = true;
        const newCart = [...prevCart];
        newCart[existingItemIndex].quantity += quantity;
        return newCart;
      } else {
        // Add new item
        return [...prevCart, { ...product, quantity, color: selectedColor }];
      }
    });
    // Show toast notification after state update
    toast.success(isUpdate ? 'Cart updated successfully!' : 'Added to cart successfully!');
  };
  const removeFromCart = (productId, color = '') => {
    setCart(prevCart => 
      prevCart.filter(item => !(item._id === productId && item.color === color))
    );
    // Show toast notification after state update, in the next render cycle
    setTimeout(() => toast.success('Item removed from cart'), 0);
  };

  const updateQuantity = (productId, quantity, color = '') => {
    if (quantity < 1) return;
    setCart(prevCart => 
      prevCart.map(item => 
        item._id === productId && item.color === color
          ? { ...item, quantity }
          : item
      )
    );
  };
  const clearCart = () => {
    setCart([]);
    // Show toast notification after state update, in the next render cycle
    setTimeout(() => toast.success('Cart cleared'), 0);
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + (item.discountPrice * item.quantity), 0);
  };

  return (
    <CartContext.Provider value={{
      cart,
      cartCount,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getCartTotal
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

