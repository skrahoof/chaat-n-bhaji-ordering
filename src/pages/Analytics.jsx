import React, { useState, useEffect } from 'react';
import { ArrowLeft, Calendar, TrendingUp, DollarSign, ShoppingBag } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Analytics = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [dateRange, setDateRange] = useState('today');
  const [customStartDate, setCustomStartDate] = useState('');
  const [customEndDate, setCustomEndDate] = useState('');
  const [loading, setLoading] = useState(false);

  // Check authentication on mount
  useEffect(() => {
    const isAuthenticated = sessionStorage.getItem('adminAuthenticated') === 'true';
    if (!isAuthenticated) {
      navigate('/admin');
      return;
    }
    fetchOrders();
  }, [navigate]);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const response = await axios.get(`${apiUrl}/api/orders`);
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterOrdersByDate = () => {
    const now = new Date();
    let startDate;

    switch (dateRange) {
      case 'today':
        startDate = new Date(now.setHours(0, 0, 0, 0));
        break;
      case 'week':
        startDate = new Date(now.setDate(now.getDate() - 7));
        break;
      case 'month':
        startDate = new Date(now.setMonth(now.getMonth() - 1));
        break;
      case 'year':
        startDate = new Date(now.setFullYear(now.getFullYear() - 1));
        break;
      case 'custom':
        if (customStartDate && customEndDate) {
          const filtered = orders.filter(order => {
            const orderDate = new Date(order.timestamp);
            return orderDate >= new Date(customStartDate) && orderDate <= new Date(customEndDate + 'T23:59:59');
          });
          return filtered;
        }
        return orders;
      default:
        return orders;
    }

    return orders.filter(order => new Date(order.timestamp) >= startDate);
  };

  const filteredOrders = filterOrdersByDate();

  const calculateStats = () => {
    const totalOrders = filteredOrders.length;
    const totalRevenue = filteredOrders.reduce((sum, order) => sum + order.total, 0);
    const servedOrders = filteredOrders.filter(order => order.status === 'served').length;
    const pendingOrders = filteredOrders.filter(order => order.status === 'pending').length;

    // Calculate most popular items
    const itemCounts = {};
    filteredOrders.forEach(order => {
      order.items.forEach(item => {
        if (itemCounts[item.name]) {
          itemCounts[item.name].quantity += item.quantity;
          itemCounts[item.name].revenue += item.price * item.quantity;
        } else {
          itemCounts[item.name] = {
            quantity: item.quantity,
            revenue: item.price * item.quantity
          };
        }
      });
    });

    const popularItems = Object.entries(itemCounts)
      .sort((a, b) => b[1].quantity - a[1].quantity)
      .slice(0, 5);

    return {
      totalOrders,
      totalRevenue,
      servedOrders,
      pendingOrders,
      popularItems
    };
  };

  const stats = calculateStats();

  const getDateRangeLabel = () => {
    switch (dateRange) {
      case 'today':
        return 'Today';
      case 'week':
        return 'Last 7 Days';
      case 'month':
        return 'Last 30 Days';
      case 'year':
        return 'Last Year';
      case 'custom':
        return customStartDate && customEndDate 
          ? `${customStartDate} to ${customEndDate}`
          : 'Custom Range';
      default:
        return '';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-gradient-to-r from-primary-600 to-primary-700 text-white shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => navigate('/admin')} 
                className="p-2 hover:bg-primary-500 rounded-full transition-colors"
              >
                <ArrowLeft size={24} />
              </button>
              <div>
                <h1 className="text-3xl font-bold">Sales Analytics</h1>
                <p className="text-primary-100">{getDateRangeLabel()}</p>
              </div>
            </div>
            <TrendingUp size={32} />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Date Range Selector */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Calendar className="text-primary-600" size={24} />
            <h2 className="text-xl font-bold text-gray-800">Select Date Range</h2>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 mb-4">
            {['today', 'week', 'month', 'year', 'custom'].map((range) => (
              <button
                key={range}
                onClick={() => setDateRange(range)}
                className={`py-3 px-4 rounded-lg font-semibold transition-all ${
                  dateRange === range
                    ? 'bg-primary-500 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {range === 'today' && 'Today'}
                {range === 'week' && 'Last Week'}
                {range === 'month' && 'Last Month'}
                {range === 'year' && 'Last Year'}
                {range === 'custom' && 'Custom'}
              </button>
            ))}
          </div>

          {dateRange === 'custom' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Start Date</label>
                <input
                  type="date"
                  value={customStartDate}
                  onChange={(e) => setCustomStartDate(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">End Date</label>
                <input
                  type="date"
                  value={customEndDate}
                  onChange={(e) => setCustomEndDate(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                />
              </div>
            </div>
          )}
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <ShoppingBag className="text-blue-600" size={24} />
              </div>
              <span className="text-3xl font-bold text-gray-800">{stats.totalOrders}</span>
            </div>
            <h3 className="text-gray-600 font-semibold">Total Orders</h3>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <DollarSign className="text-green-600" size={24} />
              </div>
              <span className="text-3xl font-bold text-gray-800">₹{stats.totalRevenue}</span>
            </div>
            <h3 className="text-gray-600 font-semibold">Total Revenue</h3>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-2xl">✓</span>
              </div>
              <span className="text-3xl font-bold text-gray-800">{stats.servedOrders}</span>
            </div>
            <h3 className="text-gray-600 font-semibold">Completed Orders</h3>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                <span className="text-2xl">⏱</span>
              </div>
              <span className="text-3xl font-bold text-gray-800">{stats.pendingOrders}</span>
            </div>
            <h3 className="text-gray-600 font-semibold">Pending Orders</h3>
          </div>
        </div>

        {/* Popular Items */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Top 5 Popular Items</h2>
          <div className="space-y-4">
            {stats.popularItems.map(([itemName, data], index) => (
              <div key={itemName} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                    <span className="font-bold text-primary-600">#{index + 1}</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">{itemName}</h3>
                    <p className="text-sm text-gray-600">{data.quantity} orders</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold text-primary-600">₹{data.revenue}</p>
                  <p className="text-sm text-gray-600">Revenue</p>
                </div>
              </div>
            ))}
            {stats.popularItems.length === 0 && (
              <p className="text-center text-gray-500 py-8">No orders in this date range</p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Analytics;
