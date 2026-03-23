import React from 'react';
import { Star, Flame, TrendingUp } from 'lucide-react';

const FeaturedItems = ({ onAddToCart, getItemQuantity }) => {
  // Featured special items from CHAAT N BHAJI SPECIALS category
  const featuredItems = [
    {
      id: 'chicken-kheema-stuffed-bajji',
      name: 'Chicken Kheema Stuffed Bajji',
      price: 180,
      description: 'Bajji stuffed with chicken mince - Our signature special!',
      image: '🌶️',
      badge: 'Chef Special',
      badgeColor: 'bg-red-500'
    },
    {
      id: 'paneer-stuffed-mirchi-bajji',
      name: 'Paneer Stuffed Mirchi Bajji',
      price: 150,
      description: 'Chili fritters stuffed with paneer - Hot & delicious!',
      image: '🧀',
      badge: 'Trending',
      badgeColor: 'bg-orange-500'
    },
    {
      id: 'egg-kheema-stuffed-bajji',
      name: 'Egg Kheema Stuffed Bajji',
      price: 150,
      description: 'Bajji stuffed with egg mince - Must try!',
      image: '🥚',
      badge: 'Popular',
      badgeColor: 'bg-yellow-500'
    }
  ];

  return (
    <div className="mb-8">
      <div className="bg-gradient-to-r from-primary-600 to-orange-500 text-white py-4 px-6 rounded-t-2xl">
        <div className="flex items-center justify-center gap-2">
          <Star className="w-6 h-6 animate-pulse" />
          <h2 className="text-2xl md:text-3xl font-bold">Today's Special Items</h2>
          <Star className="w-6 h-6 animate-pulse" />
        </div>
        <p className="text-center text-sm mt-1 opacity-90">Must-try dishes loved by our customers!</p>
      </div>

      <div className="bg-white rounded-b-2xl shadow-xl p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredItems.map((item) => {
            const quantity = getItemQuantity(item.id);
            return (
              <div
                key={item.id}
                className="relative bg-gradient-to-br from-gray-50 to-white border-2 border-primary-200 rounded-xl p-5 hover:shadow-lg transition-all hover:scale-105"
              >
                {/* Badge */}
                <div className={`absolute -top-3 -right-3 ${item.badgeColor} text-white text-xs font-bold px-3 py-1 rounded-full shadow-md flex items-center gap-1`}>
                  <Flame className="w-3 h-3" />
                  {item.badge}
                </div>

                {/* Item Image/Emoji */}
                <div className="text-6xl text-center mb-3">{item.image}</div>

                {/* Item Details */}
                <h3 className="text-xl font-bold text-gray-800 text-center mb-2">
                  {item.name}
                </h3>
                <p className="text-sm text-gray-600 text-center mb-3 min-h-[40px]">
                  {item.description}
                </p>

                {/* Price */}
                <div className="text-center mb-4">
                  <span className="text-2xl font-bold text-primary-600">₹{item.price}</span>
                </div>

                {/* Add to Cart Button */}
                {quantity === 0 ? (
                  <button
                    onClick={() => onAddToCart(item, 1)}
                    className="w-full bg-primary-500 hover:bg-primary-600 text-white font-bold py-3 rounded-lg transition-colors shadow-md"
                  >
                    Add to Cart
                  </button>
                ) : (
                  <div className="flex items-center justify-between bg-primary-500 text-white rounded-lg p-2">
                    <button
                      onClick={() => onAddToCart(item, -1)}
                      className="w-10 h-10 bg-white text-primary-600 rounded-lg font-bold text-xl hover:bg-gray-100 transition-colors"
                    >
                      -
                    </button>
                    <span className="font-bold text-lg">{quantity}</span>
                    <button
                      onClick={() => onAddToCart(item, 1)}
                      className="w-10 h-10 bg-white text-primary-600 rounded-lg font-bold text-xl hover:bg-gray-100 transition-colors"
                    >
                      +
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Call to Action */}
        <div className="mt-6 text-center">
          <p className="text-gray-600 text-sm">
            ⬇️ Scroll down to see our full menu with more delicious options!
          </p>
        </div>
      </div>
    </div>
  );
};

export default FeaturedItems;
