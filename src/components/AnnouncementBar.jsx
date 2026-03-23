import React from 'react';

const AnnouncementBar = () => {
  return (
    <div className="bg-gradient-to-r from-primary-600 to-primary-500 text-white py-2 overflow-hidden">
      <div className="animate-marquee whitespace-nowrap">
        <span className="inline-block px-8">
          🎉 We Accept Catering Orders for All Events
        </span>
        <span className="inline-block px-8">
          🧼 100% Hygienic Kitchen & Quality Products
        </span>
        <span className="inline-block px-8">
          ⭐ Fresh Food Prepared Daily with Premium Ingredients
        </span>
        <span className="inline-block px-8">
          🚚 Fast Service & Dine-In Available
        </span>
        <span className="inline-block px-8">
          💯 Authentic Street Food Experience
        </span>
        {/* Duplicate for seamless loop */}
        <span className="inline-block px-8">
          🎉 We Accept Catering Orders for All Events
        </span>
        <span className="inline-block px-8">
          🧼 100% Hygienic Kitchen & Quality Products
        </span>
        <span className="inline-block px-8">
          ⭐ Fresh Food Prepared Daily with Premium Ingredients
        </span>
        <span className="inline-block px-8">
          🚚 Fast Service & Dine-In Available
        </span>
        <span className="inline-block px-8">
          💯 Authentic Street Food Experience
        </span>
      </div>
    </div>
  );
};

export default AnnouncementBar;
