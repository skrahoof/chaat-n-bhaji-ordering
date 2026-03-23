import React from 'react';
import { Instagram, Mail, Phone, Clock, MapPin, Award, Shield, Truck } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-12 mt-12">
      <div className="container mx-auto px-4">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          
          {/* About Section */}
          <div>
            <h3 className="text-xl font-bold text-primary-400 mb-4">Chaat N Bhaji</h3>
            <p className="text-gray-300 text-sm mb-4">
              Authentic Indian street food with premium quality and hygiene standards. 
              We cater to your special events!
            </p>
            <div className="flex gap-4">
              <a
                href="https://www.instagram.com/chaatnbhaji"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-700 hover:bg-primary-500 p-2 rounded-full transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-primary-400">Contact Us</h4>
            <div className="space-y-3">
              <a
                href="tel:+919177615696"
                className="flex items-center gap-2 text-gray-300 hover:text-primary-400 transition-colors text-sm"
              >
                <Phone size={18} className="flex-shrink-0" />
                <span>+91 9177615696</span>
              </a>
              
              <a
                href="mailto:skrahoof123@gmail.com"
                className="flex items-center gap-2 text-gray-300 hover:text-primary-400 transition-colors text-sm"
              >
                <Mail size={18} className="flex-shrink-0" />
                <span>skrahoof123@gmail.com</span>
              </a>
              
              <div className="flex items-start gap-2 text-gray-300 text-sm">
                <MapPin size={18} className="flex-shrink-0 mt-1" />
                <span>Serving delicious food across the city</span>
              </div>
            </div>
          </div>

          {/* Business Hours */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-primary-400">Business Hours</h4>
            <div className="space-y-2 text-sm text-gray-300">
              <div className="flex items-center gap-2">
                <Clock size={18} className="flex-shrink-0" />
                <div>
                  <p className="font-semibold">Mon - Sun</p>
                  <p>10:00 AM - 10:00 PM</p>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-700">
                <p className="flex items-center gap-2 text-primary-400 font-semibold">
                  <Truck size={18} />
                  Fast Delivery Available
                </p>
              </div>
            </div>
          </div>

          {/* Why Choose Us */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-primary-400">Why Choose Us</h4>
            <div className="space-y-3 text-sm text-gray-300">
              <div className="flex items-start gap-2">
                <Shield size={18} className="flex-shrink-0 text-green-400 mt-1" />
                <div>
                  <p className="font-semibold">100% Hygienic</p>
                  <p className="text-xs">Prepared in clean environment</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Award size={18} className="flex-shrink-0 text-yellow-400 mt-1" />
                <div>
                  <p className="font-semibold">Premium Quality</p>
                  <p className="text-xs">Fresh ingredients daily</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Truck size={18} className="flex-shrink-0 text-blue-400 mt-1" />
                <div>
                  <p className="font-semibold">Catering Services</p>
                  <p className="text-xs">Perfect for events & parties</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 my-6"></div>

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
          <p>
            © {new Date().getFullYear()} Chaat N Bhaji. All rights reserved.
          </p>
          <p className="text-center">
            Website created by{' '}
            <a 
              href="mailto:skrahoof123@gmail.com" 
              className="text-primary-400 hover:text-primary-300 transition-colors font-semibold"
            >
              SK Rahoof
            </a>
            {' '}| +91 9177615696
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
