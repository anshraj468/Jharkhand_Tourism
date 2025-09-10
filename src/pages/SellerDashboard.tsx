import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { 
  ShoppingBag, 
  Package, 
  DollarSign, 
  Users,
  TrendingUp,
  Plus,
  Eye,
  Edit,
  Star,
  // Calendar,
  AlertCircle,
  CheckCircle
} from 'lucide-react';


const SellerDashboard: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  const products = [
    {
      id: 1,
      name: 'Handwoven Tribal Basket',
      price: '₹850',
      stock: 12,
      sold: 28,
      image: 'https://images.pexels.com/photos/1070360/pexels-photo-1070360.jpeg?auto=compress&cs=tinysrgb&w=400',
      status: 'active'
    },
    {
      id: 2,
      name: 'Traditional Dokra Art',
      price: '₹1,200',
      stock: 5,
      sold: 15,
      image: 'https://images.pexels.com/photos/1070360/pexels-photo-1070360.jpeg?auto=compress&cs=tinysrgb&w=400',
      status: 'active'
    },
    {
      id: 3,
      name: 'Bamboo Wind Chime',
      price: '₹450',
      stock: 0,
      sold: 42,
      image: 'https://images.pexels.com/photos/1070360/pexels-photo-1070360.jpeg?auto=compress&cs=tinysrgb&w=400',
      status: 'out_of_stock'
    }
  ];

  const recentOrders = [
    {
      id: 1,
      customer: 'Anita Verma',
      product: 'Handwoven Tribal Basket',
      amount: '₹850',
      date: '2025-01-20',
      status: 'completed'
    },
    {
      id: 2,
      customer: 'Rohit Gupta',
      product: 'Traditional Dokra Art',
      amount: '₹1,200',
      date: '2025-01-19',
      status: 'shipped'
    },
    {
      id: 3,
      customer: 'Meera Shah',
      product: 'Bamboo Wind Chime',
      amount: '₹450',
      date: '2025-01-18',
      status: 'processing'
    }
  ];

  const salesData = {
    thisMonth: '₹18,500',
    lastMonth: '₹15,200',
    totalSales: '₹125,000',
    pendingOrders: 8
  };

  const customerReviews = [
    {
      id: 1,
      customer: 'Sunita Kumari',
      product: 'Handwoven Tribal Basket',
      rating: 5,
      comment: 'Beautiful craftsmanship! Exactly what I was looking for.',
      date: '3 days ago'
    },
    {
      id: 2,
      customer: 'Dev Sharma',
      product: 'Traditional Dokra Art',
      rating: 4,
      comment: 'Great quality, fast delivery. Highly recommended!',
      date: '1 week ago'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
    
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Header */}
        <div className="bg-gradient-to-r from-orange-600 to-red-600 rounded-xl text-white p-8 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <h1 className="text-3xl font-bold mb-2">
                Welcome, {user?.name}!
              </h1>
              <p className="text-orange-100 text-lg">
                Showcase your beautiful handicrafts to the world
              </p>
            </div>
            <div className="mt-4 md:mt-0 flex space-x-4">
              <button className="bg-white text-orange-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center">
                <Plus className="h-5 w-5 mr-2" />
                Add Product
              </button>
              <button className="bg-orange-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-800 transition-colors flex items-center">
                <Package className="h-5 w-5 mr-2" />
                Manage Orders
              </button>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-lg shadow-sm mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8 px-6">
              {[
                { id: 'overview', label: 'Overview', icon: TrendingUp },
                { id: 'products', label: 'Products', icon: Package },
                { id: 'orders', label: 'Orders', icon: ShoppingBag },
                { id: 'analytics', label: 'Analytics', icon: DollarSign }
              ].map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setActiveTab(id)}
                  className={`flex items-center py-4 px-2 border-b-2 font-medium text-sm ${
                    activeTab === id
                      ? 'border-orange-500 text-orange-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="h-5 w-5 mr-2" />
                  {label}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Quick Stats */}
              <div className="grid md:grid-cols-4 gap-6">
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <div className="flex items-center">
                    <div className="bg-green-100 p-3 rounded-lg">
                      <DollarSign className="h-6 w-6 text-green-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm text-gray-600">This Month</p>
                      <p className="text-2xl font-bold text-gray-900">{salesData.thisMonth}</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <div className="flex items-center">
                    <div className="bg-blue-100 p-3 rounded-lg">
                      <Package className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm text-gray-600">Total Products</p>
                      <p className="text-2xl font-bold text-gray-900">{products.length}</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <div className="flex items-center">
                    <div className="bg-yellow-100 p-3 rounded-lg">
                      <ShoppingBag className="h-6 w-6 text-yellow-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm text-gray-600">Total Orders</p>
                      <p className="text-2xl font-bold text-gray-900">85</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <div className="flex items-center">
                    <div className="bg-purple-100 p-3 rounded-lg">
                      <Users className="h-6 w-6 text-purple-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm text-gray-600">Customers</p>
                      <p className="text-2xl font-bold text-gray-900">67</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Orders */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Recent Orders</h2>
                <div className="space-y-4">
                  {recentOrders.map((order) => (
                    <div key={order.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="bg-gray-100 p-3 rounded-full">
                            <ShoppingBag className="h-6 w-6 text-gray-600" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900">{order.customer}</h3>
                            <p className="text-sm text-gray-600">{order.product}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-gray-900">{order.amount}</p>
                          <p className="text-sm text-gray-600">{order.date}</p>
                        </div>
                      </div>
                      <div className="mt-4 flex items-center justify-between">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          order.status === 'completed' 
                            ? 'bg-green-100 text-green-800' 
                            : order.status === 'shipped'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {order.status}
                        </span>
                        <div className="flex space-x-2">
                          <button className="text-blue-600 hover:text-blue-700">
                            <Eye className="h-5 w-5" />
                          </button>
                          <button className="text-gray-600 hover:text-gray-700">
                            <Edit className="h-5 w-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Top Products */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Your Products</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {products.slice(0, 4).map((product) => (
                    <div key={product.id} className="border border-gray-200 rounded-lg p-4">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-full h-32 object-cover rounded-lg mb-4"
                      />
                      <h3 className="font-semibold text-gray-900 mb-2">{product.name}</h3>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-lg font-bold text-gray-900">{product.price}</span>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          product.status === 'active' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {product.status === 'active' ? 'In Stock' : 'Out of Stock'}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>Stock: {product.stock}</span>
                        <span>Sold: {product.sold}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Store Performance */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-bold text-gray-900 mb-4">Store Performance</h2>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Store Rating</span>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 mr-1" />
                      <span className="font-semibold">4.7</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Response Rate</span>
                    <span className="font-semibold text-green-600">98%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">On-time Delivery</span>
                    <span className="font-semibold text-green-600">95%</span>
                  </div>
                </div>
              </div>

              {/* Recent Reviews */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-bold text-gray-900 mb-4">Recent Reviews</h2>
                <div className="space-y-4">
                  {customerReviews.map((review) => (
                    <div key={review.id} className="border-b border-gray-200 pb-4 last:border-b-0 last:pb-0">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold text-sm">{review.customer}</span>
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className={`h-3 w-3 ${
                                i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                              }`} 
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-xs text-gray-600 mb-2">{review.product}</p>
                      <p className="text-sm text-gray-700">{review.comment}</p>
                      <span className="text-xs text-gray-500">{review.date}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h2>
                <div className="space-y-3">
                  <button className="flex items-center w-full text-left p-3 rounded-lg hover:bg-gray-50 transition-colors">
                    <Plus className="h-5 w-5 text-orange-600 mr-3" />
                    <span className="text-gray-700">Add New Product</span>
                  </button>
                  <button className="flex items-center w-full text-left p-3 rounded-lg hover:bg-gray-50 transition-colors">
                    <Package className="h-5 w-5 text-blue-600 mr-3" />
                    <span className="text-gray-700">Manage Inventory</span>
                  </button>
                  <button className="flex items-center w-full text-left p-3 rounded-lg hover:bg-gray-50 transition-colors">
                    <ShoppingBag className="h-5 w-5 text-green-600 mr-3" />
                    <span className="text-gray-700">Process Orders</span>
                  </button>
                </div>
              </div>

              {/* Alerts */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-bold text-gray-900 mb-4">Alerts</h2>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <AlertCircle className="h-5 w-5 text-red-500 mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-gray-700">3 products are out of stock</p>
                      <p className="text-xs text-gray-500">Restock to avoid missing sales</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-gray-700">5 new orders to process</p>
                      <p className="text-xs text-gray-500">Process within 24 hours</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Other tab contents */}
        {activeTab === 'products' && (
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <Package className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Product Management</h3>
            <p className="text-gray-600">Add, edit, and manage your handicraft products</p>
          </div>
        )}

        {activeTab === 'orders' && (
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <ShoppingBag className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Order Management</h3>
            <p className="text-gray-600">Track and manage customer orders</p>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <DollarSign className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Sales Analytics</h3>
            <p className="text-gray-600">View detailed sales reports and insights</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SellerDashboard;