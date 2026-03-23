import React from 'react';
import { Sparkles, Phone, Utensils } from 'lucide-react';

const HeroBanner = () => {
  return (
    <div className="bg-gradient-to-r from-primary-600 via-primary-500 to-orange-500 text-white py-12 px-4">
      <div className="container mx-auto text-center">
        <div className="flex justify-center mb-4">
          <Sparkles className="w-12 h-12 animate-pulse" />
        </div>
        
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          Satsriakal Paaji! 🙏
        </h2>
        
        <p className="text-xl md:text-2xl font-semibold mb-2">
          Authentic Street Food, Premium Quality
        </p>
        
        <p className="text-lg mb-6 max-w-2xl mx-auto opacity-90">
          Experience the taste of authentic Indian chaat & bhaji made with fresh ingredients and served with love
        </p>

        <div className="flex flex-wrap justify-center gap-4 mb-6">
          <div className="bg-white/20 backdrop-blur-sm rounded-lg px-6 py-3 flex items-center gap-2">
            <Utensils className="w-5 h-5" />
            <span className="font-semibold">100% Hygienic Kitchen</span>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-lg px-6 py-3 flex items-center gap-2">
            <Sparkles className="w-5 h-5" />
            <span className="font-semibold">Fresh Daily</span>
          </div>
        </div>

        <a
          href="tel:+919177615696"
          className="inline-flex items-center gap-2 bg-white text-primary-600 hover:bg-gray-100 font-bold py-3 px-8 rounded-full shadow-lg transition-all hover:scale-105"
        >
          <Phone className="w-5 h-5" />
          Order Now: +91 9177615696
        </a>

        <p className="mt-4 text-sm opacity-90">
          🎉 Special Catering Services Available for Events & Parties!
        </p>
      </div>
    </div>
  );
};

export default HeroBanner;
