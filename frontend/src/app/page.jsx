"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  FaShippingFast,
  FaHeadset,
  FaShieldAlt,
  FaCreditCard,
  FaArrowRight,
  FaStar,
  FaFire
} from "react-icons/fa";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const HomePage = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch featured products from different categories
  const fetchFeaturedProducts = async () => {
    try {
      const categories = ['Electronics', 'Fashion', 'Home & Living', 'Beauty'];
      let allProducts = [];

      // Fetch products from each category
      for (const category of categories) {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/product/search?category=${category}`);
        // Take first two products from each category
        const categoryProducts = res.data.products.slice(0, 2);
        allProducts = [...allProducts, ...categoryProducts];
      }

      setFeaturedProducts(allProducts);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching featured products:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeaturedProducts();
  }, []);

  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: true,
    fade: true,
  };

  const carouselImages = [
    {
      url: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?ixlib=rb-4.0.3",
      title: "Luxury Home Decor",
      subtitle: "Transform your living space",
      cta: "View Collection",
      theme: "light"
    },
    {
      url: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3",
      title: "Summer Collection 2025",
      subtitle: "Discover the latest trends and exclusive deals",
      cta: "Shop Now",
      theme: "light"
    },
    {
      url: "https://images.unsplash.com/photo-1468495244123-6c6c332eeece?ixlib=rb-4.0.3",
      title: "Premium Electronics",
      subtitle: "Up to 40% off on selected items",
      cta: "Explore Deals",
      theme: "dark"
    },
  
  ];

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="relative">
          <Slider {...carouselSettings}>
            {carouselImages.map((slide, index) => (
              <div key={index} className="relative h-[85vh]">
                <div
                  className="absolute inset-0 bg-cover bg-center transform transition-transform duration-1000 hover:scale-105"
                  style={{
                    backgroundImage: `url(${slide.url})`,
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent"></div>
                  <div className="absolute inset-0 flex items-center">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                      <div className="max-w-xl space-y-6">
                        <h1 className={`text-5xl md:text-6xl font-bold leading-tight ${slide.theme === 'light' ? 'text-white' : 'text-white'}`}>
                          {slide.title}
                        </h1>
                        <p className={`text-xl md:text-2xl ${slide.theme === 'light' ? 'text-gray-100' : 'text-gray-200'}`}>
                          {slide.subtitle}
                        </p>
                        <Link
                          href="/browse-product"
                          className="inline-flex items-center px-8 py-4 bg-white text-gray-900 rounded-full font-medium hover:bg-gray-100 transition duration-300 group"
                        >
                          {slide.cta}
                          <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </section>

        <div className="w-full h-px bg-gray-200 max-w-7xl mx-auto"></div>

        {/* Categories Grid */}
        <section className="pb-20 pt-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl font-bold text-gray-900">
              Explore Categories
            </h2>
            <p className="text-lg text-gray-800 max-w-2xl mx-auto">
              Discover our curated collections across popular categories
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mx-10">
            {[
              {
                name: "Electronics",
                image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?ixlib=rb-4.0.3",
                color: "from-blue-500/80"
              },
              {
                name: "Fashion",
                image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-4.0.3",
                color: "from-pink-500/80"
              },
              {
                name: "Home & Living",
                image: "https://images.unsplash.com/photo-1484101403633-562f891dc89a?ixlib=rb-4.0.3",
                color: "from-green-500/80"
              },
              {
                name: "Beauty",
                image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-4.0.3",
                color: "from-purple-500/80"
              },
              {
                name: "Books",
                image: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?ixlib=rb-4.0.3",
                color: "from-yellow-500/80"
              },
              {
                name: "Sports & Fitness",
                image: "https://images.unsplash.com/photo-1517963879433-6ad2b056d712?ixlib=rb-4.0.3",
                color: "from-red-500/80"
              },
              {
                name: "Toys & Games",
                image: "https://images.unsplash.com/photo-1558877385-81a1c7e67d72?ixlib=rb-4.0.3",
                color: "from-indigo-500/80"
              },
              {
                name: "Automotive",
                image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?ixlib=rb-4.0.3",
                color: "from-slate-500/80"
              },
            ].map((category) => (
              <Link
                href={`/browse-product?category=${encodeURIComponent(category.name)}`}
                key={category.name}
                className="group relative rounded-2xl overflow-hidden aspect-square bg-gray-100 hover:shadow-2xl transition duration-500"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-100 transition-opacity z-10"></div>
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                  <h3 className="text-xl font-semibold text-white mb-2">{category.name}</h3>
                  <span className="inline-flex items-center text-white text-sm">
                    Shop Now <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <div className="w-full h-px bg-gray-200 max-w-7xl mx-auto"></div>

        {/* Features Section */}
        <section className="bg-gray-50 py-20 bg-gradient-to-br from-blue-50 to-purple-50 ">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid mx-10 grid-cols-1 md:grid-cols-4 gap-8">
              {[
                {
                  icon: <FaShippingFast className="w-6 h-6 text-white" />,
                  title: "Free Shipping",
                  desc: "On orders over ₹500",
                  bg: "bg-blue-600",
                },
                {
                  icon: <FaHeadset className="w-6 h-6 text-white" />,
                  title: "24/7 Support",
                  desc: "Talk to our experts",
                  bg: "bg-green-600",
                },
                {
                  icon: <FaShieldAlt className="w-6 h-6 text-white" />,
                  title: "Secure Payment",
                  desc: "100% secure checkout",
                  bg: "bg-purple-600",
                },
                {
                  icon: <FaCreditCard className="w-6 h-6 text-white" />,
                  title: "Easy Returns",
                  desc: "30-day return policy",
                  bg: "bg-red-600",
                },
              ].map((feature, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div className={`w-12 h-12 flex items-center justify-center rounded-xl mb-4 ${feature.bg}`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="w-full h-px bg-gray-200 max-w-7xl mx-auto"></div>

        {/* Featured Products Section */}
        <section className="pt-10 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="flex flex-col items-center text-center mb-16">
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-sm font-medium mb-4">
              <FaFire className="w-4 h-4 mr-2" />
              Featured Collections
            </span>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Trending Products
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl">
              Discover our handpicked selection of premium products across popular categories
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center items-center min-h-[400px]">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mx-10">
              {featuredProducts.map((product) => (
                <Link
                  href={`/view-product/${product._id}`}
                  key={product._id}
                  className="group bg-white rounded-2xl shadow hover:shadow-xl transition-all duration-300"
                >
                  <div className="aspect-w-1 aspect-h-1 relative overflow-hidden rounded-t-2xl">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute top-4 right-4">
                      <span className="inline-flex items-center px-3 py-1 rounded-full bg-red-50 text-red-600 text-sm font-medium">
                        -{Math.round(((product.price - product.discountPrice) / product.price) * 100)}%
                      </span>
                    </div>
                    <div className="absolute top-4 left-4">
                      {/* <span className="inline-flex items-center px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-sm font-medium">
                        {product.category}
                      </span> */}
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center">
                          <FaStar className="w-4 h-4 text-yellow-400" />
                          <span className="ml-1 text-sm text-gray-600">4.5</span>
                        </div>
                        <span className="text-sm font-medium text-gray-500">{product.brand}</span>
                      </div>
                      <h3 className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                        {product.name}
                      </h3>
                      <div className="flex items-baseline mt-2 space-x-2">
                        <span className="text-2xl font-bold text-gray-900">
                          ₹{product.discountPrice.toLocaleString()}
                        </span>
                        <span className="text-sm text-gray-500 line-through">
                          ₹{product.price.toLocaleString()}
                        </span>
                      </div>
                    </div>
                    <button className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-800 transition-colors duration-300 flex items-center justify-center gap-2">
                      <span>View Details</span>
                      <FaArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>

        <div className="w-full h-px bg-gray-200 max-w-7xl mx-auto"></div>

        {/* Newsletter Section */}
        <section className="relative pb-20 pt-10 overflow-hidden bg-gray-50">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50"></div>
          </div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center space-y-8">
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-sm font-medium">
                Newsletter
              </span>
              <h2 className="text-4xl font-bold text-gray-900">
                Stay Updated with ShopNest
              </h2>
              <p className="text-lg text-gray-600">
                Subscribe to our newsletter for exclusive offers, new arrivals, and insider-only discounts
              </p>
              <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-6 py-4 rounded-xl border-2 border-gray-200 focus:outline-none focus:border-blue-500 transition-colors duration-300"
                />
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-8 py-4 rounded-xl hover:bg-blue-700 transition-all duration-300 transform hover:translate-x-1 flex items-center justify-center"
                >
                  Subscribe <FaArrowRight className="ml-2" />
                </button>
              </form>
              <p className="text-sm text-gray-500">
                By subscribing, you agree to our Privacy Policy and consent to receive updates.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default HomePage;
