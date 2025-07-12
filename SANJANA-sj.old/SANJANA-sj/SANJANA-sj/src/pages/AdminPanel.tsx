import React, { useState } from 'react';
import { Check, X, Eye, Trash2, AlertCircle, Users, Package, Star } from 'lucide-react';
import { useItems } from '../context/ItemContext';
import ItemCard from '../components/ItemCard';

export default function AdminPanel() {
  const { items, updateItem, deleteItem, getPendingItems } = useItems();
  const [selectedTab, setSelectedTab] = useState<'pending' | 'all' | 'stats'>('pending');

  const pendingItems = getPendingItems();
  const approvedItems = items.filter(item => item.approvalStatus === 'approved');
  const rejectedItems = items.filter(item => item.approvalStatus === 'rejected');

  const handleApprove = (itemId: string) => {
    updateItem(itemId, { approvalStatus: 'approved' });
  };

  const handleReject = (itemId: string) => {
    if (window.confirm('Are you sure you want to reject this item?')) {
      updateItem(itemId, { approvalStatus: 'rejected' });
    }
  };

  const handleDelete = (itemId: string) => {
    if (window.confirm('Are you sure you want to permanently delete this item?')) {
      deleteItem(itemId);
    }
  };

  const totalUsers = 500; // Mock data
  const totalSwaps = 150; // Mock data

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Panel</h1>
          <p className="text-gray-600">Manage items and oversee community activity</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Pending Review</p>
                <p className="text-3xl font-bold text-orange-600">{pendingItems.length}</p>
              </div>
              <div className="bg-orange-100 p-3 rounded-lg">
                <AlertCircle className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Total Items</p>
                <p className="text-3xl font-bold text-emerald-600">{items.length}</p>
              </div>
              <div className="bg-emerald-100 p-3 rounded-lg">
                <Package className="h-6 w-6 text-emerald-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Total Users</p>
                <p className="text-3xl font-bold text-blue-600">{totalUsers}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-lg">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Completed Swaps</p>
                <p className="text-3xl font-bold text-purple-600">{totalSwaps}</p>
              </div>
              <div className="bg-purple-100 p-3 rounded-lg">
                <Star className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-t-xl border border-gray-100 border-b-0">
          <div className="flex space-x-8 px-6">
            <button
              onClick={() => setSelectedTab('pending')}
              className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                selectedTab === 'pending'
                  ? 'border-orange-500 text-orange-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Pending Items ({pendingItems.length})
            </button>
            <button
              onClick={() => setSelectedTab('all')}
              className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                selectedTab === 'all'
                  ? 'border-emerald-500 text-emerald-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              All Items ({items.length})
            </button>
            <button
              onClick={() => setSelectedTab('stats')}
              className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                selectedTab === 'stats'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Statistics
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-b-xl border border-gray-100 border-t-0 p-6">
          {selectedTab === 'pending' && (
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Items Pending Review</h2>
              
              {pendingItems.length === 0 ? (
                <div className="text-center py-12">
                  <div className="bg-gray-100 rounded-full p-6 w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                    <Check className="h-8 w-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">All caught up!</h3>
                  <p className="text-gray-600">No items are waiting for review.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                  {pendingItems.map((item) => (
                    <div key={item.id} className="relative">
                      <ItemCard item={item} />
                      
                      {/* Admin Actions Overlay */}
                      <div className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 transition-opacity rounded-xl flex items-center justify-center">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleApprove(item.id)}
                            className="bg-emerald-500 text-white p-3 rounded-lg hover:bg-emerald-600 transition-colors"
                            title="Approve"
                          >
                            <Check className="h-5 w-5" />
                          </button>
                          <button
                            onClick={() => handleReject(item.id)}
                            className="bg-red-500 text-white p-3 rounded-lg hover:bg-red-600 transition-colors"
                            title="Reject"
                          >
                            <X className="h-5 w-5" />
                          </button>
                          <button
                            onClick={() => window.open(`/item/${item.id}`, '_blank')}
                            className="bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition-colors"
                            title="View Details"
                          >
                            <Eye className="h-5 w-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {selectedTab === 'all' && (
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-6">All Items</h2>
              
              <div className="space-y-6">
                {/* Filter Tabs */}
                <div className="flex space-x-4">
                  <div className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-sm font-medium">
                    Approved: {approvedItems.length}
                  </div>
                  <div className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium">
                    Rejected: {rejectedItems.length}
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                  {items.map((item) => (
                    <div key={item.id} className="relative">
                      <ItemCard item={item} />
                      
                      {/* Status Badge */}
                      <div className="absolute top-2 left-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          item.approvalStatus === 'approved' 
                            ? 'bg-emerald-100 text-emerald-800'
                            : item.approvalStatus === 'rejected'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-orange-100 text-orange-800'
                        }`}>
                          {item.approvalStatus}
                        </span>
                      </div>

                      {/* Admin Actions */}
                      <div className="absolute top-2 right-2 opacity-0 hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {selectedTab === 'stats' && (
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Platform Statistics</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="font-semibold text-gray-900 mb-4">Item Statistics</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Items</span>
                      <span className="font-medium">{items.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Approved</span>
                      <span className="font-medium text-emerald-600">{approvedItems.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Pending</span>
                      <span className="font-medium text-orange-600">{pendingItems.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Rejected</span>
                      <span className="font-medium text-red-600">{rejectedItems.length}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="font-semibold text-gray-900 mb-4">Category Breakdown</h3>
                  <div className="space-y-3">
                    {Object.entries(
                      items.reduce((acc, item) => {
                        acc[item.category] = (acc[item.category] || 0) + 1;
                        return acc;
                      }, {} as Record<string, number>)
                    ).map(([category, count]) => (
                      <div key={category} className="flex justify-between">
                        <span className="text-gray-600">{category}</span>
                        <span className="font-medium">{count}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}