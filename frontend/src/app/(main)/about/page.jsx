import React from 'react';
import { FaShieldAlt, FaTruck, FaUsers, FaStore } from 'react-icons/fa';

const AboutPage = () => {
  return (
    <div className="bg-gray-50 min-h-screen py-12">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">About ShopNest</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Your trusted destination for quality products and exceptional shopping experience
          </p>
        </div>
      </section>

      {/* Mission and Vision */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-900">Our Mission</h2>
            <p className="text-lg text-gray-600">
              To provide our customers with the best shopping experience through quality products, 
              competitive prices, and exceptional customer service. We strive to make online shopping 
              accessible, convenient, and enjoyable for everyone.
            </p>
          </div>
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-900">Our Vision</h2>
            <p className="text-lg text-gray-600">
              To become the leading e-commerce platform known for trust, quality, and customer satisfaction. 
              We aim to revolutionize online shopping by incorporating innovative technologies and 
              maintaining the highest standards of service.
            </p>
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: <FaUsers className="w-8 h-8" />, number: "10K+", label: "Happy Customers" },
              { icon: <FaStore className="w-8 h-8" />, number: "5K+", label: "Products" },
              { icon: <FaTruck className="w-8 h-8" />, number: "15K+", label: "Orders Delivered" },
              { icon: <FaShieldAlt className="w-8 h-8" />, number: "99%", label: "Satisfaction Rate" },
            ].map((stat, index) => (
              <div key={index} className="text-center space-y-2">
                <div className="text-blue-600 inline-block">{stat.icon}</div>
                <div className="text-3xl font-bold text-gray-900">{stat.number}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Our Leadership Team</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              name: "John Doe",
              position: "CEO & Founder",
              image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
            },
            {
              name: "Jane Smith",
              position: "Head of Operations",
              image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
            },
            {
              name: "Mike Johnson",
              position: "Technical Director",
              image: "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
            },
          ].map((member, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
              <img
                src={member.image}
                alt={member.name}
                className="w-full h-64 object-cover"
              />
              <div className="p-6 text-center">
                <h3 className="text-xl font-semibold text-gray-900">{member.name}</h3>
                <p className="text-gray-600">{member.position}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Our Core Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Quality First",
                description: "We ensure that every product meets our high-quality standards before reaching our customers.",
              },
              {
                title: "Customer Satisfaction",
                description: "Our customers' satisfaction is our top priority, and we strive to exceed their expectations.",
              },
              {
                title: "Innovation",
                description: "We continuously innovate and improve our services to provide the best shopping experience.",
              },
            ].map((value, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow-md">
                <h3 className="text-xl font-semibold mb-4">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="bg-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Want to Know More?</h2>
          <p className="text-xl mb-8">Get in touch with us for any questions or concerns</p>
          <a
            href="/contact"
            className="inline-block bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition duration-300"
          >
            Contact Us
          </a>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
