'use client';
import React, { useState, useEffect } from 'react';
import { 
  FaUsers, 
  FaShoppingBag, 
  FaChartLine, 
  FaBox,
  FaArrowUp,
  FaArrowDown,
  FaRupeeSign
} from 'react-icons/fa';
import axios from 'axios';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalUsers: 0,
    totalRevenue: 0,
  });

  const [recentOrders, setRecentOrders] = useState([]);
  const [topProducts, setTopProducts] = useState([]);

  // Fetch dashboard statistics
  useEffect(() => {
    // TODO: Replace with actual API calls
    // Example data for demonstration
    setStats({
      totalProducts: 150,
      totalOrders: 1250,
      totalUsers: 850,
      totalRevenue: 125000,
    });

    setRecentOrders([
      { id: 1, customer: 'John Doe', product: 'Gaming Laptop', amount: 75000, status: 'Delivered' },
      { id: 2, customer: 'Jane Smith', product: 'Smartphone', amount: 25000, status: 'Processing' },
      { id: 3, customer: 'Mike Johnson', product: 'Headphones', amount: 2500, status: 'Pending' },
    ]);

    setTopProducts([
      { name: 'Gaming Laptop', sales: 50, stock: 25 },
      { name: 'Smartphone', sales: 85, stock: 120 },
      { name: 'Headphones', sales: 120, stock: 75 },
    ]);
  }, []);

  // Sample data for the revenue chart
  const revenueData = [
    { month: 'Jan', revenue: 65000 },
    { month: 'Feb', revenue: 85000 },
    { month: 'Mar', revenue: 75000 },
    { month: 'Apr', revenue: 95000 },
    { month: 'May', revenue: 125000 },
    { month: 'Jun', revenue: 115000 },
  ];

  return (
    <div className="p-6 space-y-8">
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Products */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Products</p>
              <h3 className="text-2xl font-bold">{stats.totalProducts}</h3>
              <p className="text-sm text-green-500 flex items-center mt-2">
                <FaArrowUp className="mr-1" /> 12% increase
              </p>
            </div>
            <div className="p-3 bg-blue-100 rounded-full">
              <FaBox className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        {/* Total Orders */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Orders</p>
              <h3 className="text-2xl font-bold">{stats.totalOrders}</h3>
              <p className="text-sm text-green-500 flex items-center mt-2">
                <FaArrowUp className="mr-1" /> 8% increase
              </p>
            </div>
            <div className="p-3 bg-green-100 rounded-full">
              <FaShoppingBag className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        {/* Total Users */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Users</p>
              <h3 className="text-2xl font-bold">{stats.totalUsers}</h3>
              <p className="text-sm text-green-500 flex items-center mt-2">
                <FaArrowUp className="mr-1" /> 15% increase
              </p>
            </div>
            <div className="p-3 bg-purple-100 rounded-full">
              <FaUsers className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>

        {/* Total Revenue */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Revenue</p>
              <h3 className="text-2xl font-bold">
                <FaRupeeSign className="inline-block mb-1" />
                {stats.totalRevenue.toLocaleString()}
              </h3>
              <p className="text-sm text-red-500 flex items-center mt-2">
                <FaArrowDown className="mr-1" /> 5% decrease
              </p>
            </div>
            <div className="p-3 bg-yellow-100 rounded-full">
              <FaChartLine className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Revenue Chart */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Revenue Overview</h2>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#4F46E5"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Recent Orders</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Product
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {recentOrders.map((order) => (
                  <tr key={order.id}>
                    <td className="px-6 py-4 whitespace-nowrap">{order.customer}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{order.product}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      ₹{order.amount.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        order.status === 'Delivered'
                          ? 'bg-green-100 text-green-800'
                          : order.status === 'Processing'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Top Products</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Product
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Sales
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Stock
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {topProducts.map((product, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap">{product.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{product.sales}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        product.stock > 50
                          ? 'bg-green-100 text-green-800'
                          : product.stock > 20
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {product.stock} units
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
