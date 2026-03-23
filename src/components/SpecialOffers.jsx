import React from 'react';
import { Star, TrendingUp, Award, Percent } from 'lucide-react';

const SpecialOffers = () => {
  const highlights = [
    {
      icon: Star,
      title: "Customer Favorite",
      description: "Pav Bhaji - Our signature dish loved by all!",
      color: "text-yellow-500"
    },
    {
      icon: TrendingUp,
      title: "Trending Now",
      description: "Paneer Tikka Chaat - Hot & Spicy!",
      color: "text-orange-500"
    },
    {
      icon: Award,
      title: "Premium Quality",
      description: "Fresh ingredients sourced daily",
      color: "text-green-500"
    },
    {
      icon: Percent,
      title: "Catering Packages",
      description: "Special rates for bulk orders & events",
      color: "text-blue-500"
    }
  ];

  return (
    <div className="bg-white py-8 px-4 mb-8 rounded-xl shadow-md">
      <div className="container mx-auto">
        <h3 className="text-2xl font-bold text-center text-gray-800 mb-6">
          ✨ What Makes Us Special
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {highlights.map((item, index) => (
            <div 
              key={index}
              className="flex flex-col items-center text-center p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
            >
              <item.icon className={`w-10 h-10 ${item.color} mb-3`} />
              <h4 className="font-bold text-gray-800 mb-2">{item.title}</h4>
              <p className="text-sm text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 bg-gradient-to-r from-primary-500 to-orange-500 text-white rounded-lg p-6 text-center">
          <p className="text-lg font-semibold mb-2">
            🎊 Planning an Event? We've Got You Covered!
          </p>
          <p className="text-sm opacity-90">
            Contact us for customized catering packages - Perfect for birthdays, weddings, corporate events & more!
          </p>
        </div>
      </div>
    </div>
  );
};

export default SpecialOffers;
