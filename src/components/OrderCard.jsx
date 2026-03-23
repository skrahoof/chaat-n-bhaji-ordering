import React from 'react';
import { Clock, CheckCircle, ChefHat, Utensils } from 'lucide-react';

const OrderCard = ({ order, onUpdateStatus }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'accepted':
        return 'bg-orange-100 text-orange-800 border-orange-300';
      case 'preparing':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'served':
        return 'bg-green-100 text-green-800 border-green-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending':
        return <Clock size={20} />;
      case 'accepted':
        return <CheckCircle size={20} />;
      case 'preparing':
        return <ChefHat size={20} />;
      case 'served':
        return <Utensils size={20} />;
      default:
        return null;
    }
  };

  const getNextStatus = (currentStatus) => {
    switch (currentStatus) {
      case 'pending':
        return 'accepted';
      case 'accepted':
        return 'preparing';
      case 'preparing':
        return 'served';
      default:
        return null;
    }
  };

  const getNextStatusLabel = (currentStatus) => {
    switch (currentStatus) {
      case 'pending':
        return 'Accept Order';
      case 'accepted':
        return 'Start Preparing';
      case 'preparing':
        return 'Mark as Served';
      default:
        return null;
    }
  };

  const getButtonColor = (currentStatus) => {
    switch (currentStatus) {
      case 'pending':
        return 'bg-orange-500 hover:bg-orange-600 text-white';
      case 'accepted':
        return 'bg-blue-500 hover:bg-blue-600 text-white';
      case 'preparing':
        return 'bg-green-500 hover:bg-green-600 text-white';
      default:
        return 'btn-primary';
    }
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="card p-6 hover:shadow-xl transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h3 className="text-xl font-bold text-gray-800">Table {order.tableNumber}</h3>
            <span className={`px-3 py-1 rounded-full text-sm font-semibold border ${getStatusColor(order.status)} flex items-center gap-1`}>
              {getStatusIcon(order.status)}
              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
            </span>
          </div>
          <p className="text-gray-600">{order.customerName}</p>
          <p className="text-sm text-gray-500">{formatTime(order.timestamp)}</p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-primary-600">₹{order.total}</p>
        </div>
      </div>

      <div className="border-t pt-4 mb-4">
        <h4 className="font-semibold text-gray-700 mb-3">Order Items:</h4>
        <div className="space-y-2">
          {order.items.map((item, index) => (
            <div key={index} className="flex justify-between items-center text-sm">
              <span className="text-gray-700">
                {item.name} <span className="text-gray-500">x{item.quantity}</span>
              </span>
              <span className="font-semibold text-gray-800">₹{item.price * item.quantity}</span>
            </div>
          ))}
        </div>
      </div>

      {order.status !== 'served' && (
        <button
          onClick={() => onUpdateStatus(order._id, getNextStatus(order.status))}
          className={`w-full py-3 font-semibold rounded-lg transition-colors duration-200 ${getButtonColor(order.status)}`}
        >
          {getNextStatusLabel(order.status)}
        </button>
      )}
    </div>
  );
};

export default OrderCard;
