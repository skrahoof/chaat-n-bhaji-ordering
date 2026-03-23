import React from 'react';
import { Plus, Minus } from 'lucide-react';

const MenuItem = ({ item, onAdd, quantity }) => {
  return (
    <div className="card hover:shadow-lg transition-shadow duration-200">
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <div className="flex-1">
            <h3 className="font-semibold text-lg text-gray-800">{item.name}</h3>
            <p className="text-sm text-gray-600 mt-1">{item.description}</p>
          </div>
          <div className="ml-4">
            <span className="text-xl font-bold text-primary-600">₹{item.price}</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between mt-4">
          {quantity > 0 ? (
            <div className="flex items-center gap-3">
              <button
                onClick={() => onAdd(item, -1)}
                className="w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center hover:bg-red-600 transition-colors"
              >
                <Minus size={16} />
              </button>
              <span className="font-semibold text-lg w-8 text-center">{quantity}</span>
              <button
                onClick={() => onAdd(item, 1)}
                className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center hover:bg-green-600 transition-colors"
              >
                <Plus size={16} />
              </button>
            </div>
          ) : (
            <button
              onClick={() => onAdd(item, 1)}
              className="btn-primary flex items-center gap-2"
            >
              <Plus size={18} />
              Add to Cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MenuItem;
