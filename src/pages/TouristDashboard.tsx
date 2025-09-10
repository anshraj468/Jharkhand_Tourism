 import React, { useState, useEffect } from 'react';
    import { Link } from 'react-router-dom';
    import { useAuth } from '../contexts/AuthContext';
    import { 
      MapPin, Calendar, Star, Heart, Navigation, MessageCircle, TrendingUp, Search, User as UserIcon
    } from 'lucide-react';

    // Guide ke data ke liye ek Interface
    interface Guide {
      _id: string;
      name: string;
    }

    const TouristDashboard: React.FC = () => {
      const { user } = useAuth();
      const [activeTab, setActiveTab] = useState('overview');
      const [guides, setGuides] = useState<Guide[]>([]);
      const [loadingGuides, setLoadingGuides] = useState(true);

      useEffect(() => {
        const fetchGuides = async () => {
          try {
            setLoadingGuides(true);
            const response = await fetch('http://localhost:5000/api/guides');
            if (response.ok) {
              const data = await response.json();
              setGuides(data);
            } else {
              console.error("Guides ko fetch karne mein vifal");
              setGuides([]); // Agar error ho to guides ko khali set karein
            }
          } catch (error) {
            console.error("Guides fetch karte samay error:", error);
            setGuides([]);
          } finally {
            setLoadingGuides(false);
          }
        };
        fetchGuides();
      }, []);

      return (
        <div className="min-h-screen bg-gray-50">
        
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Welcome Header */}
            <div className="bg-gradient-to-r from-emerald-600 to-green-600 rounded-xl text-white p-8 mb-8">
              <h1 className="text-3xl font-bold">Welcome back, {user?.name}!</h1>
              <p className="text-emerald-100 text-lg mt-2">Ready for your next adventure in Jharkhand?</p>
            </div>

            {/* Navigation Tabs */}
            <div className="bg-white rounded-lg shadow-sm mb-8">
              <div className="border-b border-gray-200">
                <nav className="-mb-px flex space-x-8 px-6 overflow-x-auto">
                  {[
                    { id: 'overview', label: 'Overview', icon: TrendingUp },
                    { id: 'find-guides', label: 'Find Guides', icon: Search },
                    { id: 'trips', label: 'My Trips', icon: Calendar },
                    { id: 'wishlist', label: 'Wishlist', icon: Heart }
                  ].map(({ id, label, icon: Icon }) => (
                    <button
                      key={id}
                      onClick={() => setActiveTab(id)}
                      className={`flex-shrink-0 flex items-center py-4 px-2 border-b-2 font-medium text-sm ${
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

            {/* TAB CONTENT */}
            <div>
              {activeTab === 'overview' && (
                <div className="p-4 bg-white rounded-lg shadow">
                  <h3 className="text-xl font-bold">Overview</h3>
                  <p>Welcome to your dashboard. Here you can manage your trips and find new adventures.</p>
                </div>
              )}

              {activeTab === 'find-guides' && (
                <div className="bg-white rounded-lg shadow-sm p-6 md:p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Find Your Perfect Guide</h2>
                  {loadingGuides ? (
                    <p className="text-center text-gray-600">Available guides ko load kiya ja raha hai...</p>
                  ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                      {guides.length > 0 ? (
                        guides.map((guide) => (
                          <div key={guide._id} className="border rounded-lg p-4 flex flex-col items-center text-center hover:shadow-xl hover:scale-105 transition-all duration-300 bg-white">
                            <img 
                              src={`https://ui-avatars.com/api/?name=${guide.name.replace(' ', '+')}&background=059669&color=fff&size=128&font-size=0.33`}
                              alt={guide.name}
                              className="w-24 h-24 rounded-full mb-4 border-4 border-emerald-200"
                            />
                            <h3 className="text-lg font-semibold text-gray-800">{guide.name}</h3>
                            <p className="text-sm text-gray-500 mb-4">Expert in Local Culture</p>
                            <button className="w-full mt-auto bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors font-medium flex items-center justify-center">
                              <MessageCircle className="w-4 h-4 mr-2" />
                              Contact Guide
                            </button>
                          </div>
                        ))
                      ) : (
                        <p className="col-span-full text-center text-gray-600">Abhi tak koi guide register nahi hua hai. Kripya baad mein check karein.</p>
                      )}
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'trips' && (
                 <div className="p-4 bg-white rounded-lg shadow">
                  <h3 className="text-xl font-bold">My Trips</h3>
                  <p>Yahan aapke aane wale trips dikhenge.</p>
                </div>
              )}

               {activeTab === 'wishlist' && (
                 <div className="p-4 bg-white rounded-lg shadow">
                  <h3 className="text-xl font-bold">My Wishlist</h3>
                  <p>Yahan aapke pasandida sthan dikhenge.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      );
    };

    export default TouristDashboard;