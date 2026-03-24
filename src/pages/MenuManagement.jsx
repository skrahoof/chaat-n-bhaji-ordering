import React, { useState, useEffect } from 'react';
import { ArrowLeft, Plus, Edit2, Trash2, Save, X, RotateCcw, Archive } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const MenuManagement = () => {
  const navigate = useNavigate();
  const [menuItems, setMenuItems] = useState([]);
  const [deletedItems, setDeletedItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [viewMode, setViewMode] = useState('active'); // 'active' or 'deleted'
  
  // Form state
  const [formData, setFormData] = useState({
    categoryId: '',
    categoryName: '',
    itemId: '',
    name: '',
    price: '',
    description: ''
  });

  // Predefined categories
  const predefinedCategories = [
    { id: 'puri', name: 'WHY WORRY!! HAVE PURI' },
    { id: 'dahi-ka-swaad', name: 'DAHI KA SWAAD' },
    { id: 'pav', name: 'WOW !! PAV' },
    { id: 'chaat', name: 'LET HAVE SOME CHAAT!!' },
    { id: 'pav-bhaji', name: 'SAT SRI AKAL PAAJI !! KAO PAV BHAJI' },
    { id: 'bajji', name: 'BAJJI IS AN EMOTION' },
    { id: 'mixtures', name: 'MIXTURES' },
    { id: 'specials', name: 'CHAAT N BHAJI SPECIALS' }
  ];

  // Check authentication on mount
  useEffect(() => {
    const isAuthenticated = sessionStorage.getItem('adminAuthenticated') === 'true';
    if (!isAuthenticated) {
      navigate('/admin');
      return;
    }
    fetchMenuItems();
    fetchDeletedItems();
  }, [navigate]);

  const fetchMenuItems = async () => {
    setLoading(true);
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const response = await axios.get(`${apiUrl}/api/menu`);
      setMenuItems(response.data.categories || []);
    } catch (error) {
      console.error('Error fetching menu:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchDeletedItems = async () => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const response = await axios.get(`${apiUrl}/api/menu/deleted`);
      setDeletedItems(response.data.categories || []);
    } catch (error) {
      console.error('Error fetching deleted items:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Auto-fill category name when category is selected
    if (name === 'categoryId') {
      const selectedCategory = predefinedCategories.find(cat => cat.id === value);
      if (selectedCategory) {
        setFormData(prev => ({ ...prev, categoryName: selectedCategory.name }));
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      
      if (editingItem) {
        // Update existing item
        await axios.patch(`${apiUrl}/api/menu/${editingItem.id}`, formData);
      } else {
        // Add new item
        await axios.post(`${apiUrl}/api/menu`, formData);
      }
      
      // Reset form and refresh
      resetForm();
      fetchMenuItems();
    } catch (error) {
      console.error('Error saving menu item:', error);
      alert('Failed to save menu item. Please try again.');
    }
  };

  const handleEdit = (item, categoryId, categoryName) => {
    setEditingItem(item);
    setFormData({
      categoryId,
      categoryName,
      itemId: item.itemId || '',
      name: item.name,
      price: item.price.toString(),
      description: item.description
    });
    setShowAddForm(true);
  };

  const handleDelete = async (itemId, itemName) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete "${itemName}"?\n\nDon't worry! You can restore it later from the "Deleted Items" tab.`
    );

    if (!confirmDelete) return;

    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      await axios.delete(`${apiUrl}/api/menu/${itemId}`);
      fetchMenuItems();
      fetchDeletedItems();
    } catch (error) {
      console.error('Error deleting menu item:', error);
      alert('Failed to delete menu item. Please try again.');
    }
  };

  const handleRestore = async (itemId, itemName) => {
    const confirmRestore = window.confirm(
      `Restore "${itemName}" back to the menu?`
    );

    if (!confirmRestore) return;

    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      await axios.patch(`${apiUrl}/api/menu/${itemId}/restore`);
      fetchMenuItems();
      fetchDeletedItems();
    } catch (error) {
      console.error('Error restoring menu item:', error);
      alert('Failed to restore menu item. Please try again.');
    }
  };

  const resetForm = () => {
    setFormData({
      categoryId: '',
      categoryName: '',
      itemId: '',
      name: '',
      price: '',
      description: ''
    });
    setEditingItem(null);
    setShowAddForm(false);
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
                <h1 className="text-3xl font-bold">Menu Management</h1>
                <p className="text-primary-100">Add, edit, or remove menu items</p>
              </div>
            </div>
            <button
              onClick={() => setShowAddForm(true)}
              className="flex items-center gap-2 px-6 py-3 bg-white text-primary-600 rounded-lg font-semibold hover:bg-primary-50 transition-colors"
            >
              <Plus size={20} />
              Add New Item
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* View Mode Tabs */}
        <div className="mb-6 flex gap-3">
          <button
            onClick={() => setViewMode('active')}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${
              viewMode === 'active'
                ? 'bg-primary-600 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            <Plus size={20} />
            Active Menu ({menuItems.reduce((sum, cat) => sum + cat.items.length, 0)})
          </button>
          <button
            onClick={() => setViewMode('deleted')}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${
              viewMode === 'deleted'
                ? 'bg-red-600 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            <Archive size={20} />
            Deleted Items ({deletedItems.reduce((sum, cat) => sum + cat.items.length, 0)})
          </button>
        </div>

        {/* Add/Edit Form Modal */}
        {showAddForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-800">
                    {editingItem ? 'Edit Menu Item' : 'Add New Menu Item'}
                  </h2>
                  <button
                    onClick={resetForm}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <X size={24} />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Category Selection */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Category *
                    </label>
                    <select
                      name="categoryId"
                      value={formData.categoryId}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                    >
                      <option value="">Select a category</option>
                      {predefinedCategories.map(cat => (
                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                      ))}
                    </select>
                  </div>

                  {/* Item ID */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Item ID (optional, for internal use)
                    </label>
                    <input
                      type="text"
                      name="itemId"
                      value={formData.itemId}
                      onChange={handleInputChange}
                      placeholder="e.g., pani-puri"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                    />
                  </div>

                  {/* Item Name */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Item Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      placeholder="e.g., Pani Puri (10 pcs)"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                    />
                  </div>

                  {/* Price */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Price (₹) *
                    </label>
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleInputChange}
                      required
                      min="0"
                      step="1"
                      placeholder="e.g., 80"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                    />
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Description *
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      required
                      rows="3"
                      placeholder="e.g., Crispy puris filled with spicy tangy water"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none resize-none"
                    />
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3 pt-4">
                    <button
                      type="submit"
                      className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-colors"
                    >
                      <Save size={20} />
                      {editingItem ? 'Update Item' : 'Add Item'}
                    </button>
                    <button
                      type="button"
                      onClick={resetForm}
                      className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* Menu Items List */}
        {loading ? (
          <div className="text-center py-16">
            <div className="text-4xl mb-4">⏳</div>
            <p className="text-xl text-gray-500">Loading menu...</p>
          </div>
        ) : viewMode === 'active' ? (
          menuItems.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🍽️</div>
              <p className="text-xl text-gray-500 mb-4">No menu items found</p>
              <p className="text-gray-400">Click "Add New Item" to create your first menu item</p>
            </div>
          ) : (
            <div className="space-y-8">
              {menuItems.map(category => (
              <div key={category.id} className="bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">{category.name}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {category.items.map(item => (
                    <div
                      key={item.id}
                      className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-800">{item.name}</h3>
                          <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                          <p className="text-lg font-bold text-primary-600 mt-2">₹{item.price}</p>
                        </div>
                      </div>
                      <div className="flex gap-2 mt-3">
                        <button
                          onClick={() => handleEdit(item, category.id, category.name)}
                          className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-blue-500 text-white rounded-lg text-sm font-semibold hover:bg-blue-600 transition-colors"
                        >
                          <Edit2 size={16} />
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(item.id, item.name)}
                          className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-red-500 text-white rounded-lg text-sm font-semibold hover:bg-red-600 transition-colors"
                        >
                          <Trash2 size={16} />
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          )
        ) : (
          /* Deleted Items View */
          deletedItems.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">✨</div>
              <p className="text-xl text-gray-500 mb-4">No deleted items</p>
              <p className="text-gray-400">Deleted items will appear here and can be restored</p>
            </div>
          ) : (
            <div className="space-y-8">
              {deletedItems.map(category => (
              <div key={category.id} className="bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">{category.name}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {category.items.map(item => (
                    <div
                      key={item.id}
                      className="border border-red-200 bg-red-50 rounded-lg p-4 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-800">{item.name}</h3>
                          <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                          <p className="text-lg font-bold text-primary-600 mt-2">₹{item.price}</p>
                          {item.deletedAt && (
                            <p className="text-xs text-red-600 mt-2">
                              Deleted: {new Date(item.deletedAt).toLocaleDateString('en-IN')}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="flex gap-2 mt-3">
                        <button
                          onClick={() => handleRestore(item.id, item.name)}
                          className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-green-500 text-white rounded-lg text-sm font-semibold hover:bg-green-600 transition-colors"
                        >
                          <RotateCcw size={16} />
                          Restore
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          )
        )}
      </main>
    </div>
  );
};

export default MenuManagement;
