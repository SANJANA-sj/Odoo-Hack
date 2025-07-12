import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, ArrowRight, Recycle, Users, Heart, Star, Filter } from 'lucide-react';
import { useItems } from '../context/ItemContext';
import ItemCard from '../components/ItemCard';

export default function Landing() {
  const { items } = useItems();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Outerwear', 'Dresses', 'Tops', 'Bottoms', 'Shoes', 'Accessories'];

  const filteredItems = items
    .filter(item => item.approvalStatus === 'approved' && item.status === 'available')
    .filter(item => {
      const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });

  const featuredItems = filteredItems.slice(0, 6);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-emerald-50 via-blue-50 to-indigo-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Give Your Clothes a
              <span className="text-emerald-600 block">Second Life</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Join the sustainable fashion revolution. Exchange, swap, and discover amazing clothes 
              while reducing textile waste and building a greener future.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link
                to="/register"
                className="bg-emerald-600 text-white px-8 py-4 rounded-xl hover:bg-emerald-700 transition-all duration-200 font-semibold flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                <span>Start Swapping</span>
                <ArrowRight className="h-5 w-5" />
              </Link>
              <button
                onClick={() => document.getElementById('browse-section')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-white text-emerald-600 px-8 py-4 rounded-xl hover:bg-gray-50 transition-all duration-200 font-semibold border-2 border-emerald-600 hover:shadow-lg"
              >
                Browse Items
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
              <div className="text-center">
                <div className="bg-white p-6 rounded-2xl shadow-lg">
                  <Recycle className="h-8 w-8 text-emerald-600 mx-auto mb-3" />
                  <div className="text-3xl font-bold text-gray-900 mb-1">1,000+</div>
                  <div className="text-gray-600">Items Exchanged</div>
                </div>
              </div>
              <div className="text-center">
                <div className="bg-white p-6 rounded-2xl shadow-lg">
                  <Users className="h-8 w-8 text-blue-600 mx-auto mb-3" />
                  <div className="text-3xl font-bold text-gray-900 mb-1">500+</div>
                  <div className="text-gray-600">Community Members</div>
                </div>
              </div>
              <div className="text-center">
                <div className="bg-white p-6 rounded-2xl shadow-lg">
                  <Heart className="h-8 w-8 text-red-500 mx-auto mb-3" />
                  <div className="text-3xl font-bold text-gray-900 mb-1">50 tons</div>
                  <div className="text-gray-600">Waste Reduced</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Search & Browse Section */}
      <section id="browse-section" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Discover Amazing Items
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Browse through our curated collection of pre-loved clothing waiting for their next adventure
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-3xl mx-auto mb-8">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search for items, brands, or styles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors text-lg shadow-sm"
              />
            </div>
          </div>

          {/* Categories */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                  selectedCategory === category
                    ? 'bg-emerald-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Items Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {featuredItems.map((item) => (
              <ItemCard key={item.id} item={item} />
            ))}
          </div>

          {featuredItems.length === 0 && (
            <div className="text-center py-12">
              <div className="bg-gray-100 rounded-full p-6 w-24 h-24 mx-auto mb-4 flex items-center justify-center">
                <Search className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No items found</h3>
              <p className="text-gray-600">Try adjusting your search terms or browse different categories</p>
            </div>
          )}

          {featuredItems.length > 0 && filteredItems.length > 6 && (
            <div className="text-center mt-12">
              <button className="bg-emerald-600 text-white px-8 py-3 rounded-xl hover:bg-emerald-700 transition-colors font-medium">
                View All Items
              </button>
            </div>
          )}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How ReWear Works
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Three simple steps to start your sustainable fashion journey
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-emerald-100 rounded-full p-6 w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                <span className="text-2xl font-bold text-emerald-600">1</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">List Your Items</h3>
              <p className="text-gray-600">
                Upload photos and details of clothes you no longer wear. Set a point value or mark for direct swap.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-blue-100 rounded-full p-6 w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                <span className="text-2xl font-bold text-blue-600">2</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Browse & Connect</h3>
              <p className="text-gray-600">
                Discover amazing items from other community members. Request swaps or use points to claim items.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-orange-100 rounded-full p-6 w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                <span className="text-2xl font-bold text-orange-600">3</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Swap & Enjoy</h3>
              <p className="text-gray-600">
                Complete the exchange and enjoy your new-to-you clothes while helping reduce textile waste.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-emerald-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Make a Difference?
          </h2>
          <p className="text-xl text-emerald-100 mb-8">
            Join thousands of fashion-conscious individuals building a more sustainable future
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register"
              className="bg-white text-emerald-600 px-8 py-4 rounded-xl hover:bg-gray-50 transition-colors font-semibold"
            >
              Join the Community
            </Link>
            <Link
              to="/add-item"
              className="bg-emerald-700 text-white px-8 py-4 rounded-xl hover:bg-emerald-800 transition-colors font-semibold border-2 border-emerald-500"
            >
              List Your First Item
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}