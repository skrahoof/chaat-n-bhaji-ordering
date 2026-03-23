import React, { useState } from 'react';
import { ShoppingCart, X, Send } from 'lucide-react';
import axios from 'axios';

const Cart = ({ cart, onClose, onUpdateQuantity, onClearCart }) => {
  const [tableNumber, setTableNumber] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handlePlaceOrder = async () => {
    if (!tableNumber || !customerName) {
      alert('Please enter table number and name');
      return;
    }

    setIsSubmitting(true);
    try {
      const orderData = {
        tableNumber,
        customerName,
        items: cart,
        total,
        timestamp: new Date().toISOString(),
        status: 'pending'
      };

      const apiUrl = import.meta.env.VITE_API_URL || '/api';
      await axios.post(`${apiUrl}/orders`, orderData);
      
      setOrderPlaced(true);
      setTimeout(() => {
        onClearCart();
        onClose();
        setOrderPlaced(false);
        setTableNumber('');
        setCustomerName('');
      }, 2000);
    } catch (error) {
      console.error('Error placing order:', error);
      alert('Failed to place order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const generateWhatsAppMessage = () => {
    const message = `*New Order - Chaat N Bhaji*\n\n*Table:* ${tableNumber}\n*Name:* ${customerName}\n\n*Items:*\n${cart.map(item => `• ${item.name} x${item.quantity} - ₹${item.price * item.quantity}`).join('\n')}\n\n*Total: ₹${total}*`;
    const encodedMessage = encodeURIComponent(message);
    // Replace with your WhatsApp number
    const phoneNumber = '919876543210'; // Change this to your actual number
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
  };

  if (orderPlaced) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl p-8 max-w-md w-full text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Order Placed!</h2>
          <p className="text-gray-600">Your order has been received. We'll prepare it shortly!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end sm:items-center justify-center z-50">
      <div className="bg-white rounded-t-3xl sm:rounded-2xl w-full sm:max-w-2xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center gap-3">
            <ShoppingCart className="text-primary-600" size={24} />
            <h2 className="text-2xl font-bold text-gray-800">Your Cart</h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <X size={24} />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6">
          {cart.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingCart size={64} className="mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500 text-lg">Your cart is empty</p>
            </div>
          ) : (
            <div className="space-y-4">
              {cart.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800">{item.name}</h3>
                    <p className="text-sm text-gray-600">₹{item.price} each</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onUpdateQuantity(item, -1)}
                        className="w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center hover:bg-red-600"
                      >
                        -
                      </button>
                      <span className="font-semibold w-8 text-center">{item.quantity}</span>
                      <button
                        onClick={() => onUpdateQuantity(item, 1)}
                        className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center hover:bg-green-600"
                      >
                        +
                      </button>
                    </div>
                    <span className="font-bold text-lg w-20 text-right">₹{item.price * item.quantity}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Order Details & Checkout */}
        {cart.length > 0 && (
          <div className="border-t p-6 space-y-4">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Table Number *
                </label>
                <input
                  type="text"
                  placeholder="Enter table number (e.g., 5)"
                  value={tableNumber}
                  onChange={(e) => setTableNumber(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Your Name *
                </label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all"
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-xl font-bold py-4 border-t-2 border-b-2 border-gray-200">
              <span className="text-gray-800">Total</span>
              <span className="text-primary-600">₹{total}</span>
            </div>

            <button
              onClick={handlePlaceOrder}
              disabled={isSubmitting}
              className="w-full btn-primary py-4 text-lg font-bold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  Placing Order...
                </>
              ) : (
                <>
                  <Send size={20} />
                  Place Order
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
