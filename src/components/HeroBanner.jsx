import React from 'react';
import { Sparkles, Phone, Utensils } from 'lucide-react';

const HeroBanner = () => {
  return (
    <div className="bg-gradient-to-r from-primary-600 via-primary-500 to-orange-500 text-white py-4 px-4 rounded-xl shadow-lg">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Left side - Message */}
          <div className="flex items-center gap-3">
            <Sparkles className="w-8 h-8 animate-pulse hidden md:block" />
            <div className="text-center md:text-left">
              <h2 className="text-xl md:text-2xl font-bold">
                Satsriakal Paaji! 🙏
              </h2>
              <p className="text-sm opacity-90">
                Authentic Street Food, Premium Quality
              </p>
            </div>
          </div>

          {/* Right side - Call to Action */}
          <a
            href="tel:+919177615696"
            className="inline-flex items-center gap-2 bg-white text-primary-600 hover:bg-gray-100 font-bold py-2 px-5 rounded-full shadow-lg transition-all hover:scale-105 text-sm md:text-base"
          >
            <Phone className="w-4 h-4" />
            Order: +91 9177615696
          </a>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
