import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { 
  MapPin, 
  Calendar, 
  Star, 
  Clock, 
  Camera,
  Heart,
  Navigation,
  MessageCircle,
  Gift,
  TrendingUp
} from 'lucide-react';
import Navbar from '../components/Navbar';

const TouristDashboard: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  const upcomingTrips = [
    {
      id: 1,
      destination: 'Netarhat',
      date: '2025-01-25',
      duration: '3 days',
      status: 'confirmed',
      image: 'https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 2,
      destination: 'Hundru Falls',
      date: '2025-02-10',
      duration: '2 days',
      status: 'pending',
      image: 'https://images.pexels.com/photos/1029604/pexels-photo-1029604.jpeg?auto=compress&cs=tinysrgb&w=400'
    }
  ];

  const recentActivities = [
    {
      id: 1,
      action: 'Booked guide for Betla National Park',
      time: '2 hours ago',
      icon: <MapPin className="h-5 w-5 text-emerald-600" />
    },
    {
      id: 2,
      action: 'Added Deoghar to wishlist',
      time: '1 day ago',
      icon: <Heart className="h-5 w-5 text-red-500" />
    },
    {
      id: 3,
      action: 'Purchased tribal handicraft',
      time: '3 days ago',
      icon: <Gift className="h-5 w-5 text-blue-500" />
    }
  ];

  const recommendedDestinations = [
    {
      name: 'Patratu Valley',
      rating: 4.8,
      image: 'https://images.pexels.com/photos/1183099/pexels-photo-1183099.jpeg?auto=compress&cs=tinysrgb&w=400',
      price: '₹2,500'
    },
    {
      name: 'Jonha Falls',
      rating: 4.6,
      image: 'https://images.pexels.com/photos/1029604/pexels-photo-1029604.jpeg?auto=compress&cs=tinysrgb&w=400',
      price: '₹1,800'
    },
    {
      name: 'Tagore Hill',
      rating: 4.5,
      image: 'https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=400',
      price: '₹1,200'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Header */}
        <div className="bg-gradient-to-r from-emerald-600 to-green-600 rounded-xl text-white p-8 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <h1 className="text-3xl font-bold mb-2">
                Welcome back, {user?.name}!
              </h1>
              <p className="text-emerald-100 text-lg">
                Ready for your next adventure in Jharkhand?
              </p>
            </div>
            <div className="mt-4 md:mt-0 flex space-x-4">
              <Link 
                to="/map" 
                className="bg-white text-emerald-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center"
              >
                <MapPin className="h-5 w-5 mr-2" />
                Explore Map
              </Link>
              <button className="bg-emerald-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-emerald-800 transition-colors flex items-center">
                <MessageCircle className="h-5 w-5 mr-2" />
                AI Assistant
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
                { id: 'trips', label: 'My Trips', icon: Calendar },
                { id: 'wishlist', label: 'Wishlist', icon: Heart },
                { id: 'bookings', label: 'Bookings', icon: MapPin }
              ].map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setActiveTab(id)}
                  className={`flex items-center py-4 px-2 border-b-2 font-medium text-sm ${
                    activeTab === id
                      ? 'border-emerald-500 text-emerald-600'
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
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <div className="flex items-center">
                    <div className="bg-emerald-100 p-3 rounded-lg">
                      <Calendar className="h-6 w-6 text-emerald-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm text-gray-600">Upcoming Trips</p>
                      <p className="text-2xl font-bold text-gray-900">2</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <div className="flex items-center">
                    <div className="bg-blue-100 p-3 rounded-lg">
                      <Star className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm text-gray-600">Places Visited</p>
                      <p className="text-2xl font-bold text-gray-900">8</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <div className="flex items-center">
                    <div className="bg-purple-100 p-3 rounded-lg">
                      <Camera className="h-6 w-6 text-purple-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm text-gray-600">Photos Taken</p>
                      <p className="text-2xl font-bold text-gray-900">124</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Upcoming Trips */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Upcoming Trips</h2>
                <div className="space-y-4">
                  {upcomingTrips.map((trip) => (
                    <div key={trip.id} className="flex items-center p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                      <img 
                        src={trip.image} 
                        alt={trip.destination}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="ml-4 flex-1">
                        <h3 className="font-semibold text-gray-900">{trip.destination}</h3>
                        <p className="text-sm text-gray-600">{trip.date} • {trip.duration}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          trip.status === 'confirmed' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {trip.status}
                        </span>
                        <button className="text-emerald-600 hover:text-emerald-700">
                          <Navigation className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* AI Recommendations */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">AI Recommended For You</h2>
                <div className="grid md:grid-cols-3 gap-6">
                  {recommendedDestinations.map((destination, index) => (
                    <div key={index} className="group cursor-pointer">
                      <div className="relative overflow-hidden rounded-lg shadow-md">
                        <img 
                          src={destination.image} 
                          alt={destination.name}
                          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute top-3 right-3 bg-white px-2 py-1 rounded-full flex items-center">
                          <Star className="h-4 w-4 text-yellow-400 mr-1" />
                          <span className="text-sm font-medium">{destination.rating}</span>
                        </div>
                      </div>
                      <div className="mt-3">
                        <h3 className="font-semibold text-gray-900">{destination.name}</h3>
                        <p className="text-emerald-600 font-medium">Starting from {destination.price}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Recent Activities */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-bold text-gray-900 mb-4">Recent Activities</h2>
                <div className="space-y-4">
                  {recentActivities.map((activity) => (
                    <div key={activity.id} className="flex items-start">
                      <div className="bg-gray-100 p-2 rounded-lg">
                        {activity.icon}
                      </div>
                      <div className="ml-3 flex-1">
                        <p className="text-sm text-gray-900">{activity.action}</p>
                        <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h2>
                <div className="space-y-3">
                  <Link 
                    to="/map"
                    className="flex items-center w-full text-left p-3 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <MapPin className="h-5 w-5 text-emerald-600 mr-3" />
                    <span className="text-gray-700">Find Destinations</span>
                  </Link>
                  <Link 
                    to="/transport"
                    className="flex items-center w-full text-left p-3 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <Navigation className="h-5 w-5 text-blue-600 mr-3" />
                    <span className="text-gray-700">Book Transport</span>
                  </Link>
                  <button className="flex items-center w-full text-left p-3 rounded-lg hover:bg-gray-50 transition-colors">
                    <MessageCircle className="h-5 w-5 text-purple-600 mr-3" />
                    <span className="text-gray-700">Chat with AI</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Other tab contents would go here */}
        {activeTab === 'trips' && (
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <Calendar className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Your Trips</h3>
            <p className="text-gray-600">Manage and track all your travel plans</p>
          </div>
        )}

        {activeTab === 'wishlist' && (
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <Heart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Your Wishlist</h3>
            <p className="text-gray-600">Save places you want to visit later</p>
          </div>
        )}

        {activeTab === 'bookings' && (
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <MapPin className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Your Bookings</h3>
            <p className="text-gray-600">View and manage your reservations</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TouristDashboard;