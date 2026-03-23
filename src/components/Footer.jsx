import React from 'react';
import { Instagram, Mail, Phone } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-8 mt-12">
      <div className="container mx-auto px-4">
        {/* About Section */}
        <div className="mb-6 text-center">
          <h3 className="text-xl font-bold text-primary-400 mb-3">Chaat N Bhaji</h3>
          <p className="text-gray-300 text-sm max-w-2xl mx-auto">
            We accept catering orders and prepare all our dishes with the highest standards of hygiene and quality. 
            Fresh ingredients, authentic flavors, and exceptional service - that's our promise to you!
          </p>
        </div>

        {/* Social & Contact Links */}
        <div className="flex flex-wrap justify-center items-center gap-6 mb-6">
          <a
            href="https://www.instagram.com/chaatnbhaji"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:text-primary-400 transition-colors"
          >
            <Instagram size={20} />
            <span className="text-sm">@chaatnbhaji</span>
          </a>
          
          <a
            href="tel:+919177615696"
            className="flex items-center gap-2 hover:text-primary-400 transition-colors"
          >
            <Phone size={20} />
            <span className="text-sm">+91 9177615696</span>
          </a>
          
          <a
            href="mailto:skrahoof123@gmail.com"
            className="flex items-center gap-2 hover:text-primary-400 transition-colors"
          >
            <Mail size={20} />
            <span className="text-sm">skrahoof123@gmail.com</span>
          </a>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 my-6"></div>

        {/* Copyright & Credits */}
        <div className="text-center text-sm text-gray-400">
          <p className="mb-2">
            © {new Date().getFullYear()} Chaat N Bhaji. All rights reserved.
          </p>
          <p>
            Website created by{' '}
            <a 
              href="mailto:skrahoof123@gmail.com" 
              className="text-primary-400 hover:text-primary-300 transition-colors font-semibold"
            >
              SK Rahoof
            </a>
            {' '}| Contact: +91 9177615696
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
