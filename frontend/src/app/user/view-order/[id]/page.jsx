"use client";
import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { IconLoader2, IconShoppingCart } from '@tabler/icons-react';
import Image from 'next/image';

const ViewOrder = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrderDetails();
  }, [id]);

  const fetchOrderDetails = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        window.location.href = '/login';
        return;
      }

      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/order/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setOrder(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching order details:', error);
      toast.error('Failed to load order details');
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
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <IconLoader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  if (!order) {
    return (
      <div className="text-center py-12">
        <IconShoppingCart className="w-16 h-16 mx-auto text-gray-400 mb-4" />
        <h3 className="text-xl font-medium text-gray-900 dark:text-white">Order not found</h3>
        <p className="mt-2 text-gray-500 dark:text-gray-400">The order you're looking for doesn't exist.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold dark:text-white">Order Details</h1>
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
        </span>
      </div>

      <div className="bg-white dark:bg-neutral-900 rounded-lg shadow overflow-hidden">
        <div className="p-6">
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Order ID</h3>
              <p className="mt-1 text-sm dark:text-white">#{order._id.slice(-8)}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Date Placed</h3>
              <p className="mt-1 text-sm dark:text-white">{formatDate(order.createdAt)}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Amount</h3>
              <p className="mt-1 text-sm dark:text-white">${order.totalAmount.toFixed(2)}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Payment Status</h3>
              <p className="mt-1 text-sm dark:text-white">{order.paymentStatus}</p>
            </div>
          </div>

          <div className="border-t dark:border-neutral-800 pt-6">
            <h3 className="text-lg font-medium dark:text-white mb-4">Items</h3>
            <div className="space-y-4">
              {order.items.map((item) => (
                <div key={item._id} className="flex gap-4">
                  <div className="relative w-20 h-20 rounded-lg overflow-hidden">
                    <Image
                      src={item.product.image}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-medium dark:text-white">{item.product.name}</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Quantity: {item.quantity}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Price: ${item.price.toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {order.shippingAddress && (
            <div className="border-t dark:border-neutral-800 pt-6 mt-6">
              <h3 className="text-lg font-medium dark:text-white mb-4">Shipping Address</h3>
              <address className="text-sm text-gray-500 dark:text-gray-400 not-italic">
                {order.shippingAddress.street}<br />
                {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}<br />
                {order.shippingAddress.country}
              </address>
            </div>
          )}

          {order.trackingInfo && (
            <div className="border-t dark:border-neutral-800 pt-6 mt-6">
              <h3 className="text-lg font-medium dark:text-white mb-4">Tracking Information</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">{order.trackingInfo}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewOrder;
