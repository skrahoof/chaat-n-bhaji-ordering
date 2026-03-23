import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { ArrowLeft, Download } from 'lucide-react';
import { Link } from 'react-router-dom';

const QRCodePage = () => {
  // Determine URLs based on environment
  const isProduction = window.location.hostname !== 'localhost';
  const productionUrl = window.location.origin;
  const networkUrl = 'http://192.168.0.105:3000';
  const localUrl = 'http://localhost:3000';
  
  // Use production URL if deployed, otherwise network URL
  const [menuUrl, setMenuUrl] = useState(isProduction ? productionUrl : networkUrl);

  const downloadQR = () => {
    const svg = document.getElementById('qr-code');
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      const pngFile = canvas.toDataURL('image/png');
      
      const downloadLink = document.createElement('a');
      downloadLink.download = 'chaat-n-bhaji-qr-code.png';
      downloadLink.href = pngFile;
      downloadLink.click();
    };
    
    img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-gradient-to-r from-gray-900 to-gray-800 text-white sticky top-0 z-40 shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Link to="/" className="p-2 hover:bg-gray-700 rounded-full transition-colors">
              <ArrowLeft size={24} />
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-primary-400">QR Code</h1>
              <p className="text-sm text-gray-300 mt-1">Scan to order</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Scan to Order
            </h2>
            <p className="text-gray-600 mb-6">
              Customers can scan this QR code to view the menu and place orders
            </p>

            {/* URL Selector */}
            <div className="mb-8">
              <p className="text-sm font-semibold text-gray-700 mb-3">Select QR Code URL:</p>
              <div className="flex gap-3 justify-center">
                <button
                  onClick={() => setMenuUrl(networkUrl)}
                  className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                    menuUrl === networkUrl
                      ? 'bg-primary-500 text-white shadow-lg'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  📱 Mobile Network
                </button>
                <button
                  onClick={() => setMenuUrl(localUrl)}
                  className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                    menuUrl === localUrl
                      ? 'bg-primary-500 text-white shadow-lg'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  💻 Localhost
                </button>
              </div>
            </div>

            {/* QR Code */}
            <div className="bg-white p-8 rounded-xl inline-block shadow-inner mb-8">
              <QRCodeSVG
                id="qr-code"
                value={menuUrl}
                size={300}
                level="H"
                includeMargin={true}
                imageSettings={{
                  src: '',
                  height: 50,
                  width: 50,
                  excavate: true,
                }}
              />
            </div>

            {/* URL Display */}
            <div className="mb-8">
              <p className="text-sm text-gray-500 mb-2">Menu URL:</p>
              <code className="bg-gray-100 px-4 py-2 rounded-lg text-sm text-gray-700 break-all">
                {menuUrl}
              </code>
            </div>

            {/* Download Button */}
            <button
              onClick={downloadQR}
              className="btn-primary py-3 px-6 text-lg flex items-center gap-2 mx-auto"
            >
              <Download size={20} />
              Download QR Code
            </button>

            {/* Admin Link */}
            <div className="mt-8">
              <Link
                to="/admin"
                className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-primary-600 transition-colors"
              >
                🔐 Admin Panel Access
              </Link>
            </div>

            {/* Instructions */}
            <div className="mt-12 text-left bg-gray-50 rounded-xl p-6">
              <h3 className="font-bold text-lg mb-4 text-gray-800">How to use:</h3>
              <ol className="space-y-3 text-gray-700">
                <li className="flex gap-3">
                  <span className="font-bold text-primary-600">1.</span>
                  <span>Download and print this QR code</span>
                </li>
                <li className="flex gap-3">
                  <span className="font-bold text-primary-600">2.</span>
                  <span>Place it on tables or at the entrance</span>
                </li>
                <li className="flex gap-3">
                  <span className="font-bold text-primary-600">3.</span>
                  <span>Customers scan the code with their phone camera</span>
                </li>
                <li className="flex gap-3">
                  <span className="font-bold text-primary-600">4.</span>
                  <span>They can browse the menu and place orders directly</span>
                </li>
                <li className="flex gap-3">
                  <span className="font-bold text-primary-600">5.</span>
                  <span>Orders appear in the admin panel for processing</span>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default QRCodePage;
