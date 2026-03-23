import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Menu from './pages/Menu';
import Admin from './pages/Admin';
import QRCodePage from './pages/QRCode';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Menu />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/qr" element={<QRCodePage />} />
      </Routes>
    </Router>
  );
}

export default App;
