import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, Heart, Share2, MessageCircle, User } from 'lucide-react';
import { useItems } from '../context/ItemContext';
import { useAuth } from '../context/AuthContext';
import ItemCard from '../components/ItemCard';

export default function ItemDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getItemById, items } = useItems();
  const { user } = useAuth();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const item = id ? getItemById(id) : null;

  if (!item) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Item not found</h1>
          <button
            onClick={() => navigate('/')}
            className="text-emerald-600 hover:text-emerald-700 font-medium"
          >
            Return to browse
          </button>
        </div>
      </div>
    );
  }

  const similarItems = items
    .filter(i => i.id !== item.id && i.category === item.category && i.approvalStatus === 'approved')
    .slice(0, 4);

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

  const handleSwapRequest = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    
    // Mock swap request
    alert('Swap request sent! The owner will be notified.');
  };

  const handlePointsRedeem = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    
    if (user.points < item.pointsValue) {
      alert('You need more points to redeem this item.');
      return;
    }
    
    // Mock points redemption
    alert(`Item redeemed for ${item.pointsValue} points!`);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <div className="bg-white border-b border-gray-100 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center space-x-2 text-gray-600 hover:text-emerald-600 transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Back</span>
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <div>
            <div className="relative">
              <img
                src={item.images[selectedImageIndex]}
                alt={item.title}
                className="w-full h-96 lg:h-[500px] object-cover rounded-2xl shadow-lg"
              />
              <button className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm p-3 rounded-full hover:bg-white transition-colors">
                <Heart className="h-5 w-5 text-gray-600 hover:text-red-500 transition-colors" />
              </button>
            </div>
            
            {item.images.length > 1 && (
              <div className="flex space-x-3 mt-4 overflow-x-auto">
                {item.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                      selectedImageIndex === index
                        ? 'border-emerald-500'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${item.title} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Item Details */}
          <div>
            <div className="flex items-start justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{item.title}</h1>
                <div className="flex items-center space-x-3">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getConditionColor(item.condition)}`}>
                    {item.condition}
                  </span>
                  <span className="text-gray-500">•</span>
                  <span className="text-gray-600">Size {item.size}</span>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-1 bg-emerald-100 px-3 py-2 rounded-lg">
                  <Star className="h-5 w-5 text-emerald-600 fill-current" />
                  <span className="font-semibold text-emerald-700">{item.pointsValue}</span>
                </div>
                <button className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
                  <Share2 className="h-5 w-5 text-gray-600" />
                </button>
              </div>
            </div>

            <p className="text-gray-700 text-lg leading-relaxed mb-8">
              {item.description}
            </p>

            {/* Item Details */}
            <div className="bg-gray-50 rounded-xl p-6 mb-8">
              <h3 className="font-semibold text-gray-900 mb-4">Item Details</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-sm text-gray-600">Category</span>
                  <p className="font-medium text-gray-900">{item.category}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Type</span>
                  <p className="font-medium text-gray-900">{item.type}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Size</span>
                  <p className="font-medium text-gray-900">{item.size}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Condition</span>
                  <p className="font-medium text-gray-900">{item.condition}</p>
                </div>
              </div>
              
              {item.tags.length > 0 && (
                <div className="mt-4">
                  <span className="text-sm text-gray-600 block mb-2">Tags</span>
                  <div className="flex flex-wrap gap-2">
                    {item.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Owner Info */}
            <div className="bg-emerald-50 rounded-xl p-6 mb-8">
              <div className="flex items-center space-x-4">
                <div className="bg-emerald-100 p-3 rounded-full">
                  <User className="h-6 w-6 text-emerald-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Listed by {item.uploaderName}</h4>
                  <p className="text-sm text-gray-600">
                    Active member • Responds within 24 hours
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            {user && user.id !== item.uploaderId ? (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <button
                    onClick={handleSwapRequest}
                    className="bg-emerald-600 text-white py-4 px-6 rounded-xl hover:bg-emerald-700 transition-colors font-semibold flex items-center justify-center space-x-2"
                  >
                    <MessageCircle className="h-5 w-5" />
                    <span>Request Swap</span>
                  </button>
                  
                  <button
                    onClick={handlePointsRedeem}
                    disabled={user.points < item.pointsValue}
                    className={`py-4 px-6 rounded-xl font-semibold flex items-center justify-center space-x-2 transition-colors ${
                      user.points >= item.pointsValue
                        ? 'bg-orange-600 text-white hover:bg-orange-700'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    <Star className="h-5 w-5" />
                    <span>
                      {user.points >= item.pointsValue
                        ? `Redeem (${item.pointsValue} points)`
                        : `Need ${item.pointsValue - user.points} more points`
                      }
                    </span>
                  </button>
                </div>
                
                <p className="text-center text-sm text-gray-600">
                  You have {user.points} points available
                </p>
              </div>
            ) : user && user.id === item.uploaderId ? (
              <div className="bg-blue-50 rounded-xl p-6 text-center">
                <p className="text-blue-700 font-medium">This is your listing</p>
                <p className="text-blue-600 text-sm mt-1">
                  Manage your items from your dashboard
                </p>
              </div>
            ) : (
              <div className="text-center">
                <p className="text-gray-600 mb-4">Sign in to swap or redeem items</p>
                <button
                  onClick={() => navigate('/login')}
                  className="bg-emerald-600 text-white px-8 py-3 rounded-xl hover:bg-emerald-700 transition-colors font-medium"
                >
                  Sign In
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Similar Items */}
        {similarItems.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Similar Items</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {similarItems.map((similarItem) => (
                <ItemCard key={similarItem.id} item={similarItem} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}