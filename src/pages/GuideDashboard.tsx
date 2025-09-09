import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { 
  Users, 
  Calendar, 
  DollarSign, 
  MapPin,
  Star,
  Clock,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  MessageCircle,
  Camera
} from 'lucide-react';
import Navbar from '../components/Navbar';

const GuideDashboard: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  const upcomingBookings = [
    {
      id: 1,
      client: 'Rajesh Kumar',
      destination: 'Netarhat',
      date: '2025-01-25',
      time: '09:00 AM',
      duration: '3 days',
      price: '₹5,000',
      status: 'confirmed'
    },
    {
      id: 2,
      client: 'Priya Sharma',
      destination: 'Hundru Falls',
      date: '2025-01-28',
      time: '07:00 AM',
      duration: '1 day',
      price: '₹2,500',
      status: 'pending'
    }
  ];

  const recentReviews = [
    {
      id: 1,
      client: 'Amit Singh',
      rating: 5,
      comment: 'Excellent guide! Very knowledgeable about local culture.',
      date: '2 days ago'
    },
    {
      id: 2,
      client: 'Sneha Das',
      rating: 4,
      comment: 'Great experience exploring Betla National Park.',
      date: '1 week ago'
    }
  ];

  const earnings = {
    thisMonth: '₹15,000',
    lastMonth: '₹12,500',
    totalEarnings: '₹85,000',
    pendingPayouts: '₹3,500'
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl text-white p-8 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <h1 className="text-3xl font-bold mb-2">
                Welcome, Guide {user?.name}!
              </h1>
              <p className="text-blue-100 text-lg">
                Help travelers discover the beauty of Jharkhand
              </p>
            </div>
            <div className="mt-4 md:mt-0 flex space-x-4">
              <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center">
                <Calendar className="h-5 w-5 mr-2" />
                Manage Schedule
              </button>
              <button className="bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-800 transition-colors flex items-center">
                <MessageCircle className="h-5 w-5 mr-2" />
                Messages
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
                { id: 'bookings', label: 'Bookings', icon: Calendar },
                { id: 'earnings', label: 'Earnings', icon: DollarSign },
                { id: 'profile', label: 'Profile', icon: Users }
              ].map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setActiveTab(id)}
                  className={`flex items-center py-4 px-2 border-b-2 font-medium text-sm ${
                    activeTab === id
                      ? 'border-blue-500 text-blue-600'
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
                      <p className="text-2xl font-bold text-gray-900">{earnings.thisMonth}</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <div className="flex items-center">
                    <div className="bg-blue-100 p-3 rounded-lg">
                      <Users className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm text-gray-600">Total Clients</p>
                      <p className="text-2xl font-bold text-gray-900">34</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <div className="flex items-center">
                    <div className="bg-yellow-100 p-3 rounded-lg">
                      <Star className="h-6 w-6 text-yellow-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm text-gray-600">Rating</p>
                      <p className="text-2xl font-bold text-gray-900">4.8</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <div className="flex items-center">
                    <div className="bg-purple-100 p-3 rounded-lg">
                      <MapPin className="h-6 w-6 text-purple-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm text-gray-600">Tours Done</p>
                      <p className="text-2xl font-bold text-gray-900">127</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Upcoming Bookings */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Upcoming Bookings</h2>
                <div className="space-y-4">
                  {upcomingBookings.map((booking) => (
                    <div key={booking.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="bg-gray-100 p-3 rounded-full">
                            <Users className="h-6 w-6 text-gray-600" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900">{booking.client}</h3>
                            <p className="text-sm text-gray-600">{booking.destination}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-gray-900">{booking.price}</p>
                          <p className="text-sm text-gray-600">{booking.duration}</p>
                        </div>
                      </div>
                      <div className="mt-4 flex items-center justify-between">
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <span className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1" />
                            {booking.date}
                          </span>
                          <span className="flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            {booking.time}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            booking.status === 'confirmed' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {booking.status}
                          </span>
                          <button className="text-blue-600 hover:text-blue-700">
                            <MessageCircle className="h-5 w-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Reviews */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Recent Reviews</h2>
                <div className="space-y-6">
                  {recentReviews.map((review) => (
                    <div key={review.id} className="border-b border-gray-200 pb-6 last:border-b-0 last:pb-0">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-semibold text-gray-900">{review.client}</h3>
                          <div className="flex items-center mt-1">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i} 
                                className={`h-4 w-4 ${
                                  i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                                }`} 
                              />
                            ))}
                          </div>
                        </div>
                        <span className="text-sm text-gray-500">{review.date}</span>
                      </div>
                      <p className="text-gray-700">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Profile Completion */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-bold text-gray-900 mb-4">Profile Completion</h2>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                    <span className="text-sm text-gray-700">Basic Information</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                    <span className="text-sm text-gray-700">Profile Picture</span>
                  </div>
                  <div className="flex items-center">
                    <AlertCircle className="h-5 w-5 text-yellow-500 mr-3" />
                    <span className="text-sm text-gray-700">Languages & Skills</span>
                  </div>
                  <div className="flex items-center">
                    <AlertCircle className="h-5 w-5 text-yellow-500 mr-3" />
                    <span className="text-sm text-gray-700">Portfolio Images</span>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="bg-gray-200 rounded-full h-2">
                    <div className="bg-green-600 h-2 rounded-full" style={{width: '70%'}}></div>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">70% Complete</p>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h2>
                <div className="space-y-3">
                  <button className="flex items-center w-full text-left p-3 rounded-lg hover:bg-gray-50 transition-colors">
                    <Calendar className="h-5 w-5 text-blue-600 mr-3" />
                    <span className="text-gray-700">Update Availability</span>
                  </button>
                  <button className="flex items-center w-full text-left p-3 rounded-lg hover:bg-gray-50 transition-colors">
                    <Camera className="h-5 w-5 text-green-600 mr-3" />
                    <span className="text-gray-700">Add Portfolio Photos</span>
                  </button>
                  <button className="flex items-center w-full text-left p-3 rounded-lg hover:bg-gray-50 transition-colors">
                    <MessageCircle className="h-5 w-5 text-purple-600 mr-3" />
                    <span className="text-gray-700">Message Clients</span>
                  </button>
                </div>
              </div>

              {/* Earnings Summary */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-bold text-gray-900 mb-4">Earnings Summary</h2>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">This Month</span>
                    <span className="font-semibold">{earnings.thisMonth}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Last Month</span>
                    <span className="font-semibold">{earnings.lastMonth}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Earnings</span>
                    <span className="font-semibold">{earnings.totalEarnings}</span>
                  </div>
                  <div className="border-t pt-3 mt-3 flex justify-between">
                    <span className="text-gray-600">Pending Payouts</span>
                    <span className="font-semibold text-orange-600">{earnings.pendingPayouts}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Other tab contents */}
        {activeTab === 'bookings' && (
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <Calendar className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Booking Management</h3>
            <p className="text-gray-600">View and manage all your tour bookings</p>
          </div>
        )}

        {activeTab === 'earnings' && (
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <DollarSign className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Earnings & Payments</h3>
            <p className="text-gray-600">Track your earnings and manage payouts</p>
          </div>
        )}

        {activeTab === 'profile' && (
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <Users className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Guide Profile</h3>
            <p className="text-gray-600">Manage your profile and showcase your expertise</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default GuideDashboard;