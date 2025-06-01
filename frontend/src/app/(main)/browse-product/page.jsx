"use client";
import axios from "axios";
import Link from "next/link";
import { useSearchParams } from 'next/navigation';
import React, { useState, useEffect } from "react";
import { FaSearch, FaFilter, FaSortAmountDown, FaTimes, FaHeart } from 'react-icons/fa';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';

const BrowseProduct = () => {
  const searchParams = useSearchParams();
  const [productList, setProductList] = useState([]);
  const [filters, setFilters] = useState({
    categories: [],
    brands: []
  });
  const [searchQuery, setSearchQuery] = useState(searchParams.get('query') || "");
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || "");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });
  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const { addToCart } = useCart();
  const { addToWishlist, isInWishlist } = useWishlist();
  const fetchProducts = async () => {
    try {
      // First, try to get all products if no filters are applied
      if (!searchQuery && !selectedCategory && !selectedBrand && !priceRange.min && !priceRange.max && !sortBy) {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/product/getall`);
        setProductList(res.data);
        
        // Get categories and brands from the products
        const categories = [...new Set(res.data.map(product => product.category))];
        const brands = [...new Set(res.data.map(product => product.brand))];
        setFilters({ categories, brands });
        return;
      }

      // If filters are applied, use the search endpoint
      const queryParams = new URLSearchParams({
        ...(searchQuery && { query: searchQuery }),
        ...(selectedCategory && { category: selectedCategory }),
        ...(selectedBrand && { brand: selectedBrand }),
        ...(priceRange.min && { minPrice: priceRange.min }),
        ...(priceRange.max && { maxPrice: priceRange.max }),
        ...(sortBy && { sortBy, sortOrder })
      });

      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/product/search?${queryParams}`);
      if (res.data.products) {
        setProductList(res.data.products);
        setFilters({
          categories: res.data.filters.categories || [],
          brands: res.data.filters.brands || []
        });
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      // Use getall as fallback if search fails
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/product/getall`);
        setProductList(res.data);
        const categories = [...new Set(res.data.map(product => product.category))];
        const brands = [...new Set(res.data.map(product => product.brand))];
        setFilters({ categories, brands });
      } catch (fallbackError) {
        console.error("Fallback error:", fallbackError);
        setProductList([]);
      }
    }
  };
  useEffect(() => {
    fetchProducts();
  }, [searchParams, selectedCategory, selectedBrand, sortBy, sortOrder]); // Trigger search when any filter changes

  const handleSearch = (e) => {
    e.preventDefault();
    fetchProducts();
  };

  const resetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("");
    setSelectedBrand("");
    setPriceRange({ min: "", max: "" });
    setSortBy("");
    setSortOrder("asc");
    fetchProducts();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Overlay for mobile filter sidebar */}
      {isFilterOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsFilterOpen(false)}
        />
      )}

      <div className="max-w-7xl  mx-auto px-4 sm:px-6 lg:px-8 " >
        <div className="flex flex-col lg:flex-row gap-6  pt-20">
          {/* Filter Sidebar */}
          <div className={`
            fixed lg:relative inset-y-0 left-0 z-1 
            w-80 bg-white lg:w-64 transform  pt-0
            ${isFilterOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
            transition-transform duration-300 ease-in-out
            overflow-y-auto
            lg:block lg:sticky lg:top-20 lg:h-[calc(100vh-5rem)]
          `}>
            <div className="p-4 border-b lg:border-none">
              <div className="flex items-center justify-between lg:hidden">
                <h2 className="text-lg font-medium">Filters</h2>
                <button
                  onClick={() => setIsFilterOpen(false)}
                  className="p-2 text-gray-500 hover:text-gray-700"
                >
                  <FaTimes className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="p-4">
              <form onSubmit={handleSearch} className="space-y-6">
                {/* Category Filter */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Category
                  </label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg p-2"
                  >
                    <option value="">All Categories</option>
                    {filters.categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Brand Filter */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Brand
                  </label>
                  <select
                    value={selectedBrand}
                    onChange={(e) => setSelectedBrand(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg p-2"
                  >
                    <option value="">All Brands</option>
                    {filters.brands.map((brand) => (
                      <option key={brand} value={brand}>
                        {brand}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Price Range */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Price Range
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      value={priceRange.min}
                      onChange={(e) =>
                        setPriceRange({ ...priceRange, min: e.target.value })
                      }
                      placeholder="Min"
                      className="w-1/2 border border-gray-300 rounded-lg p-2"
                    />
                    <input
                      type="number"
                      value={priceRange.max}
                      onChange={(e) =>
                        setPriceRange({ ...priceRange, max: e.target.value })
                      }
                      placeholder="Max"
                      className="w-1/2 border border-gray-300 rounded-lg p-2"
                    />
                  </div>
                </div>

                {/* Sort Options */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Sort By
                  </label>
                  <div className="flex gap-2">
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="w-2/3 border border-gray-300 rounded-lg p-2"
                    >
                      <option value="">None</option>
                      <option value="price">Price</option>
                      <option value="name">Name</option>
                      <option value="brand">Brand</option>
                    </select>
                    <button
                      type="button"
                      onClick={() =>
                        setSortOrder(sortOrder === "asc" ? "desc" : "asc")
                      }
                      className="w-1/3 border border-gray-300 rounded-lg p-2 flex items-center justify-center hover:bg-gray-50"
                    >
                      <FaSortAmountDown
                        className={`transform ${
                          sortOrder === "desc" ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <button
                    type="submit"
                    className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Apply Filters
                  </button>
                  <button
                    type="button"
                    onClick={resetFilters}
                    className="w-full px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    Reset All
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex-1">
            {/* Mobile Filter Button */}
            <div className="lg:hidden mb-4">
              <button
                onClick={() => setIsFilterOpen(true)}
                className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm flex items-center justify-center gap-2 hover:bg-gray-50"
              >
                <FaFilter className="w-5 h-5" />
                <span>Show Filters</span>
              </button>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 my-10">
              {productList.length > 0 ? (
                productList.map((product) => (
                  <div
                    key={product._id}
                    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
                  >
                    <div className="aspect-w-1 aspect-h-1 relative">
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-full h-64 object-contain"
                      />
                      <button
                        onClick={() => addToWishlist(product)}
                        className={`absolute top-4 right-4 p-2 rounded-full ${
                          isInWishlist(product._id)
                            ? 'text-red-500 bg-red-50'
                            : 'text-gray-400 bg-white'
                        } hover:text-red-500 hover:bg-red-50 shadow-md transition-colors`}
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
                          onClick={() => addToCart(product, 1)}
                          className="px-4 py-2 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50"
                        >
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-full text-center py-10">
                  <p className="text-gray-500 text-lg">No products found.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrowseProduct;
