import React, { useState, useEffect } from 'react';
import { ArrowLeft, RefreshCw, Lock, LogOut, BarChart3 } from 'lucide-react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import OrderCard from '../components/OrderCard';

const Admin = () => {
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [previousOrderCount, setPreviousOrderCount] = useState(0);

  // Admin password - Change this to your desired password
  const ADMIN_PASSWORD = 'admin123';

  // Notification sound - plays when new order arrives
  const playNotificationSound = () => {
    // Create audio context for notification sound
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.value = 800;
    oscillator.type = 'sine';
    
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.5);
  };

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const response = await axios.get(`${apiUrl}/api/orders`);
      const newOrders = response.data;
      
      // Check if there's a new order (count increased)
      if (previousOrderCount > 0 && newOrders.length > previousOrderCount) {
        playNotificationSound();
      }
      
      setPreviousOrderCount(newOrders.length);
      setOrders(newOrders);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchOrders();
      // Auto-refresh every 10 seconds
      const interval = setInterval(fetchOrders, 10000);
      return () => clearInterval(interval);
    }
  }, [isAuthenticated]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setError('');
      setPassword('');
    } else {
      setError('Incorrect password. Please try again.');
      setPassword('');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setOrders([]);
    setFilter('all');
  };

  const handleUpdateStatus = async (orderId, newStatus) => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      await axios.patch(`${apiUrl}/api/orders/${orderId}`, { status: newStatus });
      fetchOrders();
    } catch (error) {
      console.error('Error updating order status:', error);
      alert('Failed to update order status');
    }
  };

  const filteredOrders = orders.filter(order => {
    if (filter === 'all') return true;
    return order.status === filter;
  });

  const getOrderCount = (status) => {
    return orders.filter(order => order.status === status).length;
  };

  // Login Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock size={40} className="text-primary-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Admin Login</h1>
            <p className="text-gray-600">Enter password to access admin panel</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                placeholder="Enter admin password"
                autoFocus
              />
              {error && (
                <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                  <span>⚠️</span> {error}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full btn-primary py-3 text-lg"
            >
              Login
            </button>

            <Link
              to="/"
              className="block text-center text-gray-600 hover:text-gray-800 transition-colors"
            >
              ← Back to Menu
            </Link>
          </form>

          <div className="mt-8 p-4 bg-gray-50 rounded-lg">
            <p className="text-xs text-gray-500 text-center">
              Default password: <code className="bg-gray-200 px-2 py-1 rounded">admin123</code>
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Admin Panel (only shown when authenticated)
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-gradient-to-r from-gray-900 to-gray-800 text-white sticky top-0 z-40 shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/" className="p-2 hover:bg-gray-700 rounded-full transition-colors">
                <ArrowLeft size={24} />
              </Link>
              <div>
                <h1 className="text-3xl font-bold text-primary-400">Admin Panel</h1>
                <p className="text-sm text-gray-300 mt-1">Order Management</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Link
                to="/analytics"
                className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg transition-colors"
                title="View Analytics"
              >
                <BarChart3 size={20} />
                <span className="hidden sm:inline">Analytics</span>
              </Link>
              <button
                onClick={fetchOrders}
                disabled={loading}
                className="p-2 hover:bg-gray-700 rounded-full transition-colors disabled:opacity-50"
                title="Refresh Orders"
              >
                <RefreshCw size={24} className={loading ? 'animate-spin' : ''} />
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
                title="Logout"
              >
                <LogOut size={20} />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Status Filter */}
        <div className="mb-8">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <button
              onClick={() => setFilter('all')}
              className={`p-4 rounded-xl font-semibold transition-all ${
                filter === 'all'
                  ? 'bg-primary-500 text-white shadow-lg scale-105'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              <div className="text-2xl font-bold">{orders.length}</div>
              <div className="text-sm">All Orders</div>
            </button>
            <button
              onClick={() => setFilter('pending')}
              className={`p-4 rounded-xl font-semibold transition-all ${
                filter === 'pending'
                  ? 'bg-yellow-500 text-white shadow-lg scale-105'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              <div className="text-2xl font-bold">{getOrderCount('pending')}</div>
              <div className="text-sm">Pending</div>
            </button>
            <button
              onClick={() => setFilter('accepted')}
              className={`p-4 rounded-xl font-semibold transition-all ${
                filter === 'accepted'
                  ? 'bg-blue-500 text-white shadow-lg scale-105'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              <div className="text-2xl font-bold">{getOrderCount('accepted')}</div>
              <div className="text-sm">Accepted</div>
            </button>
            <button
              onClick={() => setFilter('preparing')}
              className={`p-4 rounded-xl font-semibold transition-all ${
                filter === 'preparing'
                  ? 'bg-purple-500 text-white shadow-lg scale-105'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              <div className="text-2xl font-bold">{getOrderCount('preparing')}</div>
              <div className="text-sm">Preparing</div>
            </button>
            <button
              onClick={() => setFilter('served')}
              className={`p-4 rounded-xl font-semibold transition-all ${
                filter === 'served'
                  ? 'bg-green-500 text-white shadow-lg scale-105'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              <div className="text-2xl font-bold">{getOrderCount('served')}</div>
              <div className="text-sm">Served</div>
            </button>
          </div>
        </div>

        {/* Orders Grid */}
        {filteredOrders.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🍽️</div>
            <p className="text-xl text-gray-500">No orders found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredOrders.map(order => (
              <OrderCard
                key={order._id}
                order={order}
                onUpdateStatus={handleUpdateStatus}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Admin;
