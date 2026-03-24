import React, { useState, useEffect } from 'react';
import { ShoppingCart, QrCode } from 'lucide-react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import MenuItem from '../components/MenuItem';
import Cart from '../components/Cart';
import Footer from '../components/Footer';
import HeroBanner from '../components/HeroBanner';
import FeaturedItems from '../components/FeaturedItems';
import AnnouncementBar from '../components/AnnouncementBar';
import { menuData } from '../data/menuData';

const Menu = () => {
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [menu, setMenu] = useState(menuData); // Initialize with static data as fallback
  const [loading, setLoading] = useState(true);

  // Fetch menu from API
  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
        const response = await axios.get(`${apiUrl}/api/menu`);
        
        // If API returns data, use it; otherwise keep static data
        if (response.data.categories && response.data.categories.length > 0) {
          setMenu({ categories: response.data.categories });
        }
      } catch (error) {
        console.log('Using static menu data (API not available)');
        // Keep using static menuData as fallback
      } finally {
        setLoading(false);
      }
    };

    fetchMenu();
  }, []);

  // Scroll to top on page load/reload
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleAddToCart = (item, change) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(cartItem => cartItem.id === item.id);
      
      if (existingItem) {
        const newQuantity = existingItem.quantity + change;
        if (newQuantity <= 0) {
          return prevCart.filter(cartItem => cartItem.id !== item.id);
        }
        return prevCart.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: newQuantity }
            : cartItem
        );
      } else if (change > 0) {
        return [...prevCart, { ...item, quantity: 1 }];
      }
      return prevCart;
    });
  };

  const getItemQuantity = (itemId) => {
    const item = cart.find(cartItem => cartItem.id === itemId);
    return item ? item.quantity : 0;
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Announcement Bar */}
      <AnnouncementBar />
      
      {/* Header */}
      <header className="bg-gradient-to-r from-gray-900 to-gray-800 text-white sticky top-0 z-40 shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-primary-400">Chaat N Bhaji</h1>
              <p className="text-sm text-gray-300 mt-1">Authentic Street Food Experience</p>
            </div>
            <div className="flex items-center gap-3">
              <Link
                to="/qr"
                className="p-2 hover:bg-gray-700 rounded-full transition-colors"
                title="View QR Code"
              >
                <QrCode size={24} />
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 pb-32">
        {/* Featured Special Items - First Thing Customers See! */}
        <FeaturedItems 
          onAddToCart={handleAddToCart}
          getItemQuantity={getItemQuantity}
        />
        
        {/* Hero Banner */}
        <div className="my-8">
          <HeroBanner />
        </div>
        {/* Category Filter */}
        <div className="mb-8">
          <div className="flex gap-2 overflow-x-auto pb-4 scrollbar-hide">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-4 py-2 rounded-full font-semibold whitespace-nowrap transition-colors ${
                selectedCategory === null
                  ? 'bg-primary-500 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              All Items
            </button>
            {menu.categories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-full font-semibold whitespace-nowrap transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-primary-500 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Menu Items */}
        <div className="space-y-12">
          {menuData.categories
            .filter(category => !selectedCategory || category.id === selectedCategory)
            .map(category => (
              <div key={category.id}>
                <h2 className="text-2xl font-bold text-gray-800 mb-6 pb-2 border-b-4 border-primary-500 inline-block">
                  {category.name}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                  {category.items.map(item => (
                    <MenuItem
                      key={item.id}
                      item={item}
                      onAdd={handleAddToCart}
                      quantity={getItemQuantity(item.id)}
                    />
                  ))}
                </div>
              </div>
            ))}
        </div>
      </main>

      {/* Floating Cart Button */}
      {totalItems > 0 && (
        <button
          onClick={() => setShowCart(true)}
          className="fixed bottom-6 right-6 bg-primary-500 hover:bg-primary-600 text-white rounded-full shadow-2xl p-4 flex items-center gap-3 transition-all hover:scale-105 z-40"
        >
          <ShoppingCart size={24} />
          <div className="flex flex-col items-start">
            <span className="font-semibold">{totalItems} items</span>
            <span className="text-sm">₹{totalAmount}</span>
          </div>
          <div className="absolute -top-2 -right-2 bg-red-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">
            {totalItems}
          </div>
        </button>
      )}

      {/* Cart Modal */}
      {showCart && (
        <Cart
          cart={cart}
          onClose={() => setShowCart(false)}
          onUpdateQuantity={handleAddToCart}
          onClearCart={() => setCart([])}
        />
      )}

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Menu;
