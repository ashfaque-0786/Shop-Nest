"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { IconLoader2, IconPackage } from '@tabler/icons-react';

const TrackOrder = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        window.location.href = '/login';
        return;
      }

      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/order/user`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setOrders(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching orders:', error);
      toast.error('Failed to load orders');
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'shipped':
        return 'bg-purple-100 text-purple-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <IconLoader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="text-center py-12">
        <IconPackage className="w-16 h-16 mx-auto text-gray-400 mb-4" />
        <h3 className="text-xl font-medium text-gray-900 dark:text-white">No orders found</h3>
        <p className="mt-2 text-gray-500 dark:text-gray-400">You haven't placed any orders yet.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold dark:text-white">Track Orders</h1>
      
      <div className="grid gap-6">
        {orders.map((order) => (
          <div key={order._id} className="bg-white dark:bg-neutral-900 rounded-lg shadow p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-medium dark:text-white">
                  Order #{order._id.slice(-8)}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Placed on {formatDate(order.createdAt)}
                </p>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
              </span>
            </div>

            <div className="border-t dark:border-neutral-800 pt-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500 dark:text-gray-400">Items</span>
                <span className="font-medium dark:text-white">{order.items.length}</span>
              </div>
              <div className="flex justify-between text-sm mt-2">
                <span className="text-gray-500 dark:text-gray-400">Total Amount</span>
                <span className="font-medium dark:text-white">${order.totalAmount.toFixed(2)}</span>
              </div>
            </div>

            {order.trackingInfo && (
              <div className="mt-4 bg-gray-50 dark:bg-neutral-800 rounded p-4">
                <h4 className="text-sm font-medium mb-2 dark:text-white">Tracking Information</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">{order.trackingInfo}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrackOrder;
