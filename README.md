# Chaat N Bhaji - Food Ordering System

A modern, mobile-responsive food ordering web application for "Chaat N Bhaji" chat center. Customers can scan a QR code, browse the menu, place orders, and staff can manage orders through an admin panel.

## Features

### Customer Features
- 📱 **Mobile-Responsive Menu**: Beautiful, easy-to-navigate menu with categories
- 🛒 **Shopping Cart**: Add/remove items, adjust quantities
- 📋 **Order Placement**: Submit orders with table number and name
- 💬 **WhatsApp Integration**: Option to send orders via WhatsApp
- 📱 **QR Code Access**: Scan QR code to access menu instantly

### Admin Features
- 📊 **Order Dashboard**: View all orders in real-time
- 🔄 **Order Status Management**: 
  - Pending → Accepted → Preparing → Served
- 🎯 **Filter Orders**: Filter by status (All, Pending, Accepted, Preparing, Served)
- 🔔 **Auto-Refresh**: Orders refresh automatically every 10 seconds

## Tech Stack

- **Frontend**: React 18, Vite, TailwindCSS
- **Backend**: Node.js, Express
- **Icons**: Lucide React
- **QR Code**: qrcode.react
- **HTTP Client**: Axios

## Installation

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Setup Instructions

1. **Navigate to project directory**
   ```bash
   cd C:\Users\al86389\CascadeProjects\chaat-n-bhaji-ordering
   ```

2. **Install frontend dependencies**
   ```bash
   npm install
   ```

3. **Install backend dependencies**
   ```bash
   cd server
   npm install
   cd ..
   ```

## Running the Application

### Option 1: Run Both Frontend and Backend Together (Recommended)
```bash
npm run dev:all
```

### Option 2: Run Separately

**Terminal 1 - Frontend (Vite Dev Server)**
```bash
npm run dev
```
Access at: http://localhost:3000

**Terminal 2 - Backend (Express Server)**
```bash
npm run server
```
API runs at: http://localhost:5000

## Usage

### For Customers

1. **Access the Menu**:
   - Scan the QR code (available at `/qr` route)
   - Or directly visit the website URL

2. **Browse & Order**:
   - Browse menu items by category
   - Add items to cart
   - Enter table number and name
   - Place order or send via WhatsApp

### For Staff/Admin

1. **Access Admin Panel**:
   - Navigate directly to `/admin` (not visible to customers)
   - Enter admin password (default: `admin123`)
   - Login to access order management

2. **Manage Orders**:
   - View all incoming orders
   - Filter by status
   - Update order status through the workflow:
     - **Pending**: New order received
     - **Accepted**: Order acknowledged
     - **Preparing**: Food being prepared
     - **Served**: Order completed
   - Click **Logout** to exit admin panel

### QR Code Setup

1. Navigate to `/qr` route
2. Download the QR code
3. Print and place on tables or at entrance
4. Customers scan to access menu

## WhatsApp Integration

To enable WhatsApp ordering:

1. Open `src/components/Cart.jsx`
2. Find line 49:
   ```javascript
   const phoneNumber = '919876543210'; // Change this to your actual number
   ```
3. Replace with your WhatsApp business number (include country code)

## Project Structure

```
chaat-n-bhaji-ordering/
├── src/
│   ├── components/
│   │   ├── Cart.jsx           # Shopping cart modal
│   │   ├── MenuItem.jsx       # Menu item card
│   │   └── OrderCard.jsx      # Admin order card
│   ├── pages/
│   │   ├── Menu.jsx           # Customer menu page
│   │   ├── Admin.jsx          # Admin dashboard
│   │   └── QRCode.jsx         # QR code display/download
│   ├── data/
│   │   └── menuData.js        # Menu items data
│   ├── App.jsx                # Main app component
│   ├── main.jsx               # Entry point
│   └── index.css              # Global styles
├── server/
│   ├── data/
│   │   └── orders.json        # Order storage
│   ├── server.js              # Express server
│   └── package.json           # Server dependencies
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── README.md
```

## API Endpoints

- `GET /api/orders` - Get all orders
- `POST /api/orders` - Create new order
- `PATCH /api/orders/:id` - Update order status
- `DELETE /api/orders/:id` - Delete order
- `GET /api/health` - Health check

## Customization

### Change Admin Password
**IMPORTANT**: Change the default admin password before deployment!

Edit `src/pages/Admin.jsx` (line 16):
```javascript
const ADMIN_PASSWORD = 'admin123'; // Change this to a secure password
```

### Update Menu Items
Edit `src/data/menuData.js` to add/modify menu items and categories.

### Change Colors
Edit `tailwind.config.js` to customize the color scheme.

### Modify Order Workflow
Edit `src/components/OrderCard.jsx` to customize the order status workflow.

## Production Deployment

### Build for Production
```bash
npm run build
```

### Deploy
- Frontend: Deploy the `dist` folder to any static hosting (Vercel, Netlify, etc.)
- Backend: Deploy the `server` folder to Node.js hosting (Heroku, Railway, etc.)
- Update API URLs in production

## Troubleshooting

### Orders not appearing in admin panel
- Check if backend server is running on port 5000
- Verify API proxy in `vite.config.js`

### WhatsApp not opening
- Ensure phone number format is correct (country code + number)
- Check if WhatsApp is installed on the device

### QR Code not working
- Ensure the URL in QR code matches your deployment URL
- For local testing, use your local network IP

## Support

For issues or questions, please contact the development team.

## License

Proprietary - Chaat N Bhaji © 2026
