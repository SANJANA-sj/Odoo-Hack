import React from 'react';
import { Link } from 'react-router-dom';
import { Plus, Star, Package, ArrowUpDown, Calendar, Edit, Trash2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useItems } from '../context/ItemContext';
import ItemCard from '../components/ItemCard';

export default function Dashboard() {
  const { user } = useAuth();
  const { getUserItems, deleteItem } = useItems();

  if (!user) return null;

  const userItems = getUserItems(user.id);
  const activeItems = userItems.filter(item => item.status === 'available');
  const pendingItems = userItems.filter(item => item.status === 'pending');
  const completedSwaps = userItems.filter(item => item.status === 'swapped');

  const handleDeleteItem = (itemId: string) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      deleteItem(itemId);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
              <div className="flex items-center space-x-6 mb-6 md:mb-0">
                <div className="relative">
                  {user.avatar ? (
                    <img 
                      src={user.avatar} 
                      alt={user.name}
                      className="h-20 w-20 rounded-full object-cover ring-4 ring-emerald-100"
                    />
                  ) : (
                    <div className="h-20 w-20 bg-emerald-100 rounded-full flex items-center justify-center ring-4 ring-emerald-100">
                      <span className="text-2xl font-bold text-emerald-600">
                        {user.name.charAt(0)}
                      </span>
                    </div>
                  )}
                  <div className="absolute -bottom-2 -right-2 bg-emerald-500 text-white rounded-full p-1">
                    <Star className="h-4 w-4 fill-current" />
                  </div>
                </div>
                
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    Welcome back, {user.name.split(' ')[0]}!
                  </h1>
                  <p className="text-gray-600 mb-3">
                    Continue building a sustainable wardrobe
                  </p>
                  <div className="flex items-center space-x-4">
                    <div className="bg-emerald-100 px-4 py-2 rounded-xl">
                      <span className="text-emerald-700 font-semibold">
                        {user.points} Points Available
                      </span>
                    </div>
                    <div className="text-sm text-gray-500">
                      Member since {new Date().toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </div>
              
              <Link
                to="/add-item"
                className="bg-emerald-600 text-white px-6 py-3 rounded-xl hover:bg-emerald-700 transition-colors font-medium flex items-center space-x-2 shadow-lg"
              >
                <Plus className="h-5 w-5" />
                <span>List New Item</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Active Listings</p>
                <p className="text-3xl font-bold text-gray-900">{activeItems.length}</p>
              </div>
              <div className="bg-emerald-100 p-3 rounded-lg">
                <Package className="h-6 w-6 text-emerald-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Pending Swaps</p>
                <p className="text-3xl font-bold text-gray-900">{pendingItems.length}</p>
              </div>
              <div className="bg-orange-100 p-3 rounded-lg">
                <ArrowUpDown className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Completed</p>
                <p className="text-3xl font-bold text-gray-900">{completedSwaps.length}</p>
              </div>
              <div className="bg-green-100 p-3 rounded-lg">
                <Calendar className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Total Points</p>
                <p className="text-3xl font-bold text-gray-900">{user.points}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-lg">
                <Star className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>
        </div>

        {/* My Listings */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">My Listings</h2>
            <Link
              to="/add-item"
              className="text-emerald-600 hover:text-emerald-700 font-medium flex items-center space-x-1"
            >
              <Plus className="h-4 w-4" />
              <span>Add Item</span>
            </Link>
          </div>
          
          {userItems.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {userItems.map((item) => (
                <div key={item.id} className="relative group">
                  <ItemCard item={item} />
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="flex space-x-1">
                      <button
                        onClick={() => handleDeleteItem(item.id)}
                        className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  {item.approvalStatus === 'pending' && (
                    <div className="absolute top-2 left-2">
                      <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded-full text-xs font-medium">
                        Pending Approval
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="bg-gray-100 rounded-full p-8 w-24 h-24 mx-auto mb-4 flex items-center justify-center">
                <Package className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No items listed yet</h3>
              <p className="text-gray-600 mb-6">Start sharing your clothes with the community</p>
              <Link
                to="/add-item"
                className="bg-emerald-600 text-white px-6 py-3 rounded-xl hover:bg-emerald-700 transition-colors font-medium inline-flex items-center space-x-2"
              >
                <Plus className="h-5 w-5" />
                <span>List Your First Item</span>
              </Link>
            </div>
          )}
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Activity</h2>
          
          <div className="space-y-4">
            <div className="flex items-center space-x-4 p-4 bg-emerald-50 rounded-xl">
              <div className="bg-emerald-100 p-2 rounded-lg">
                <Plus className="h-5 w-5 text-emerald-600" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-900">Welcome to ReWear!</p>
                <p className="text-sm text-gray-600">You received 50 welcome points</p>
              </div>
              <span className="text-sm text-gray-500">Just now</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}