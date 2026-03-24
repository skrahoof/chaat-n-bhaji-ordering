import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { MongoClient, ObjectId } from 'mongodb';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env from parent directory (for local development only)
// In production (Render/Vercel), environment variables are set directly
if (process.env.NODE_ENV !== 'production') {
  dotenv.config({ path: path.join(__dirname, '..', '.env') });
  console.log('📁 .env path:', path.join(__dirname, '..', '.env'));
}

console.log('🔧 Starting server...');

const app = express();
const PORT = process.env.PORT || 5000;

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/chaatnbhaji';
console.log('🔗 MongoDB URI:', MONGODB_URI ? 'Found' : 'Not found');
let db;
let ordersCollection;
let menuCollection;

// Connect to MongoDB
async function connectToDatabase() {
  try {
    const client = new MongoClient(MONGODB_URI);
    await client.connect();
    console.log('✅ Connected to MongoDB');
    
    db = client.db('chaatnbhaji');
    ordersCollection = db.collection('orders');
    menuCollection = db.collection('menu');
    
    // Create indexes for better performance
    await ordersCollection.createIndex({ timestamp: -1 });
    await ordersCollection.createIndex({ status: 1 });
    await menuCollection.createIndex({ categoryId: 1 });
    
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1);
  }
}

// Middleware
const allowedOrigins = [
  'http://localhost:3000',
  'http://192.168.0.105:3000',
  'http://30.239.84.112:3000',
  'https://chaat-n-bhaji-ordering.vercel.app',
  'https://chaat-n-bhaji-ordering-krbhc6qu5-rahoof-shaiks-projects.vercel.app'
];

app.use(cors({
  origin: function(origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(null, true); // Allow all in development
    }
  },
  credentials: true
}));

app.use(bodyParser.json());

// Routes

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    database: db ? 'Connected' : 'Disconnected'
  });
});

// Get all orders
app.get('/api/orders', async (req, res) => {
  try {
    const orders = await ordersCollection
      .find({})
      .sort({ timestamp: -1 })
      .toArray();
    
    res.json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});

// Get orders by status
app.get('/api/orders/status/:status', async (req, res) => {
  try {
    const orders = await ordersCollection
      .find({ status: req.params.status })
      .sort({ timestamp: -1 })
      .toArray();
    
    res.json(orders);
  } catch (error) {
    console.error('Error fetching orders by status:', error);
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});

// Create new order
app.post('/api/orders', async (req, res) => {
  try {
    const newOrder = {
      ...req.body,
      timestamp: new Date().toISOString(),
      status: 'pending',
      createdAt: new Date()
    };
    
    const result = await ordersCollection.insertOne(newOrder);
    const insertedOrder = await ordersCollection.findOne({ _id: result.insertedId });
    
    res.status(201).json(insertedOrder);
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ error: 'Failed to create order' });
  }
});

// Update order status
app.patch('/api/orders/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    // Try to find by _id (MongoDB ObjectId) or by custom id field
    let query;
    try {
      // Always try to convert to ObjectId first
      query = { _id: new ObjectId(id) };
    } catch (e) {
      // If conversion fails, try as string
      query = { id: id };
    }
    
    // Update the document
    const updateResult = await ordersCollection.updateOne(
      query,
      { 
        $set: {
          ...req.body,
          updatedAt: new Date()
        }
      }
    );
    
    if (updateResult.matchedCount === 0) {
      return res.status(404).json({ error: 'Order not found' });
    }
    
    // Fetch and return the updated document
    const updatedOrder = await ordersCollection.findOne(query);
    res.json(updatedOrder);
  } catch (error) {
    console.error('Error updating order:', error);
    res.status(500).json({ error: 'Failed to update order' });
  }
});

// Delete order
app.delete('/api/orders/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    let query;
    if (ObjectId.isValid(id)) {
      query = { _id: new ObjectId(id) };
    } else {
      query = { id: id };
    }
    
    const result = await ordersCollection.deleteOne(query);
    
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'Order not found' });
    }
    
    res.json({ message: 'Order deleted successfully' });
  } catch (error) {
    console.error('Error deleting order:', error);
    res.status(500).json({ error: 'Failed to delete order' });
  }
});

// ===== MENU MANAGEMENT ENDPOINTS =====

// Get all menu items (grouped by category)
app.get('/api/menu', async (req, res) => {
  try {
    // Only fetch non-deleted items
    const menuItems = await menuCollection.find({ isDeleted: { $ne: true } }).toArray();
    
    // Group by category
    const categories = {};
    menuItems.forEach(item => {
      if (!categories[item.categoryId]) {
        categories[item.categoryId] = {
          id: item.categoryId,
          name: item.categoryName,
          items: []
        };
      }
      categories[item.categoryId].items.push({
        id: item._id,
        itemId: item.itemId,
        name: item.name,
        price: item.price,
        description: item.description
      });
    });
    
    res.json({ categories: Object.values(categories) });
  } catch (error) {
    console.error('Error fetching menu:', error);
    res.status(500).json({ error: 'Failed to fetch menu' });
  }
});

// Get all categories
app.get('/api/menu/categories', async (req, res) => {
  try {
    const categories = await menuCollection.distinct('categoryId');
    const categoryDetails = await menuCollection.aggregate([
      {
        $group: {
          _id: '$categoryId',
          name: { $first: '$categoryName' }
        }
      }
    ]).toArray();
    
    const formattedCategories = categoryDetails.map(cat => ({
      id: cat._id,
      name: cat.name
    }));
    
    res.json(formattedCategories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
});

// Add new menu item
app.post('/api/menu', async (req, res) => {
  try {
    const { categoryId, categoryName, itemId, name, price, description } = req.body;
    
    const newItem = {
      categoryId,
      categoryName,
      itemId,
      name,
      price: parseFloat(price),
      description,
      isDeleted: false,
      createdAt: new Date()
    };
    
    const result = await menuCollection.insertOne(newItem);
    const insertedItem = await menuCollection.findOne({ _id: result.insertedId });
    
    res.status(201).json(insertedItem);
  } catch (error) {
    console.error('Error adding menu item:', error);
    res.status(500).json({ error: 'Failed to add menu item' });
  }
});

// Update menu item
app.patch('/api/menu/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { categoryId, categoryName, itemId, name, price, description } = req.body;
    
    const updateData = {
      categoryId,
      categoryName,
      itemId,
      name,
      price: parseFloat(price),
      description,
      updatedAt: new Date()
    };
    
    const result = await menuCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updateData }
    );
    
    if (result.matchedCount === 0) {
      return res.status(404).json({ error: 'Menu item not found' });
    }
    
    const updatedItem = await menuCollection.findOne({ _id: new ObjectId(id) });
    res.json(updatedItem);
  } catch (error) {
    console.error('Error updating menu item:', error);
    res.status(500).json({ error: 'Failed to update menu item' });
  }
});

// Soft delete menu item
app.delete('/api/menu/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const result = await menuCollection.updateOne(
      { _id: new ObjectId(id) },
      { 
        $set: { 
          isDeleted: true,
          deletedAt: new Date()
        }
      }
    );
    
    if (result.matchedCount === 0) {
      return res.status(404).json({ error: 'Menu item not found' });
    }
    
    res.json({ message: 'Menu item deleted successfully' });
  } catch (error) {
    console.error('Error deleting menu item:', error);
    res.status(500).json({ error: 'Failed to delete menu item' });
  }
});

// Get deleted menu items (for backup/restore)
app.get('/api/menu/deleted', async (req, res) => {
  try {
    const deletedItems = await menuCollection.find({ isDeleted: true }).toArray();
    
    // Group by category
    const categories = {};
    deletedItems.forEach(item => {
      if (!categories[item.categoryId]) {
        categories[item.categoryId] = {
          id: item.categoryId,
          name: item.categoryName,
          items: []
        };
      }
      categories[item.categoryId].items.push({
        id: item._id,
        itemId: item.itemId,
        name: item.name,
        price: item.price,
        description: item.description,
        deletedAt: item.deletedAt
      });
    });
    
    res.json({ categories: Object.values(categories) });
  } catch (error) {
    console.error('Error fetching deleted items:', error);
    res.status(500).json({ error: 'Failed to fetch deleted items' });
  }
});

// Restore deleted menu item
app.patch('/api/menu/:id/restore', async (req, res) => {
  try {
    const { id } = req.params;
    
    const result = await menuCollection.updateOne(
      { _id: new ObjectId(id) },
      { 
        $set: { isDeleted: false },
        $unset: { deletedAt: "" }
      }
    );
    
    if (result.matchedCount === 0) {
      return res.status(404).json({ error: 'Menu item not found' });
    }
    
    const restoredItem = await menuCollection.findOne({ _id: new ObjectId(id) });
    res.json({ message: 'Menu item restored successfully', item: restoredItem });
  } catch (error) {
    console.error('Error restoring menu item:', error);
    res.status(500).json({ error: 'Failed to restore menu item' });
  }
});

// Permanently delete menu item (admin only - use with caution)
app.delete('/api/menu/:id/permanent', async (req, res) => {
  try {
    const { id } = req.params;
    
    const result = await menuCollection.deleteOne({ _id: new ObjectId(id) });
    
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'Menu item not found' });
    }
    
    res.json({ message: 'Menu item permanently deleted' });
  } catch (error) {
    console.error('Error permanently deleting menu item:', error);
    res.status(500).json({ error: 'Failed to permanently delete menu item' });
  }
});

// Get analytics/statistics
app.get('/api/analytics', async (req, res) => {
  try {
    const totalOrders = await ordersCollection.countDocuments();
    const pendingOrders = await ordersCollection.countDocuments({ status: 'pending' });
    const completedOrders = await ordersCollection.countDocuments({ status: 'completed' });
    
    // Calculate total revenue
    const orders = await ordersCollection.find({ status: 'completed' }).toArray();
    const totalRevenue = orders.reduce((sum, order) => sum + (order.total || 0), 0);
    
    res.json({
      totalOrders,
      pendingOrders,
      completedOrders,
      totalRevenue,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error fetching analytics:', error);
    res.status(500).json({ error: 'Failed to fetch analytics' });
  }
});

// Start server
async function startServer() {
  try {
    console.log('🔌 Attempting to connect to MongoDB...');
    await connectToDatabase();
    console.log('✅ Database connection successful!');
    
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
      console.log(`📊 API endpoints available at http://localhost:${PORT}/api`);
      console.log(`💾 Using MongoDB for persistent storage`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error.message);
    process.exit(1);
  }
}

console.log('🚀 Calling startServer()...');
startServer();
