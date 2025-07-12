import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Star } from 'lucide-react';
import { ClothingItem } from '../context/ItemContext';

interface ItemCardProps {
  item: ClothingItem;
  showActions?: boolean;
}

export default function ItemCard({ item, showActions = false }: ItemCardProps) {
  const getConditionColor = (condition: string) => {
    switch (condition.toLowerCase()) {
      case 'like new':
        return 'bg-emerald-100 text-emerald-800';
      case 'excellent':
        return 'bg-blue-100 text-blue-800';
      case 'good':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all duration-200 group">
      <Link to={`/item/${item.id}`} className="block">
        <div className="relative">
          <img 
            src={item.images[0]} 
            alt={item.title}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-200"
          />
          <div className="absolute top-3 right-3">
            <button className="p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors">
              <Heart className="h-4 w-4 text-gray-600 hover:text-red-500 transition-colors" />
            </button>
          </div>
          <div className="absolute bottom-3 left-3">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getConditionColor(item.condition)}`}>
              {item.condition}
            </span>
          </div>
        </div>
        
        <div className="p-4">
          <div className="flex items-start justify-between mb-2">
            <h3 className="font-semibold text-gray-900 group-hover:text-emerald-600 transition-colors line-clamp-1">
              {item.title}
            </h3>
            <div className="flex items-center space-x-1 text-emerald-600 ml-2">
              <Star className="h-4 w-4 fill-current" />
              <span className="text-sm font-medium">{item.pointsValue}</span>
            </div>
          </div>
          
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
            {item.description}
          </p>
          
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-2">
              <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-md text-xs">
                Size {item.size}
              </span>
              <span className="text-gray-500">•</span>
              <span className="text-gray-600">{item.category}</span>
            </div>
          </div>
          
          <div className="mt-3 pt-3 border-t border-gray-100">
            <p className="text-xs text-gray-500">
              Listed by <span className="font-medium text-gray-700">{item.uploaderName}</span>
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
}