import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 5000;

// Middleware
// Configure CORS to allow requests from frontend
const allowedOrigins = [
  'http://localhost:3000',
  'http://192.168.0.105:3000',
  'http://30.239.84.112:3000',
  // Add your Vercel URL here after deployment
  // Example: 'https://chaat-n-bhaji-ordering.vercel.app'
];

app.use(cors({
  origin: function(origin, callback) {
    // Allow requests with no origin (mobile apps, Postman, etc.)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      // For development, allow all origins
      // In production, you should restrict this
      callback(null, true);
    }
  },
  credentials: true
}));

app.use(bodyParser.json());

// Data file path
const ordersFilePath = path.join(__dirname, 'data', 'orders.json');

// Ensure data directory and file exist
const ensureDataFile = () => {
  const dataDir = path.join(__dirname, 'data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  if (!fs.existsSync(ordersFilePath)) {
    fs.writeFileSync(ordersFilePath, JSON.stringify([], null, 2));
  }
};

// Read orders from file
const readOrders = () => {
  ensureDataFile();
  const data = fs.readFileSync(ordersFilePath, 'utf8');
  return JSON.parse(data);
};

// Write orders to file
const writeOrders = (orders) => {
  ensureDataFile();
  fs.writeFileSync(ordersFilePath, JSON.stringify(orders, null, 2));
};

// Generate unique ID
const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

// Routes

// Get all orders
app.get('/api/orders', (req, res) => {
  try {
    const orders = readOrders();
    // Sort by timestamp, newest first
    orders.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    res.json(orders);
  } catch (error) {
    console.error('Error reading orders:', error);
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});

// Create new order
app.post('/api/orders', (req, res) => {
  try {
    const orders = readOrders();
    const newOrder = {
      id: generateId(),
      ...req.body,
      timestamp: new Date().toISOString(),
      status: 'pending'
    };
    orders.push(newOrder);
    writeOrders(orders);
    res.status(201).json(newOrder);
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ error: 'Failed to create order' });
  }
});

// Update order status
app.patch('/api/orders/:id', (req, res) => {
  try {
    const orders = readOrders();
    const orderIndex = orders.findIndex(order => order.id === req.params.id);
    
    if (orderIndex === -1) {
      return res.status(404).json({ error: 'Order not found' });
    }
    
    orders[orderIndex] = {
      ...orders[orderIndex],
      ...req.body
    };
    
    writeOrders(orders);
    res.json(orders[orderIndex]);
  } catch (error) {
    console.error('Error updating order:', error);
    res.status(500).json({ error: 'Failed to update order' });
  }
});

// Delete order (optional)
app.delete('/api/orders/:id', (req, res) => {
  try {
    const orders = readOrders();
    const filteredOrders = orders.filter(order => order.id !== req.params.id);
    
    if (orders.length === filteredOrders.length) {
      return res.status(404).json({ error: 'Order not found' });
    }
    
    writeOrders(filteredOrders);
    res.json({ message: 'Order deleted successfully' });
  } catch (error) {
    console.error('Error deleting order:', error);
    res.status(500).json({ error: 'Failed to delete order' });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📊 API endpoints available at http://localhost:${PORT}/api`);
  ensureDataFile();
});
