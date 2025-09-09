import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Mountain,
  MapPin,
  Smartphone,
  Shield,
  Globe,
} from "lucide-react";
import Navbar from "../components/Navbar";

const LandingPage: React.FC = () => {
  // Hero images for slider
  const heroImages = [
    "Images/jonha-fall.jpg",
    "Images/patratu-valley-ranchi-jharkhand-1-hero.jpg",
    "Images/hazaribagh-lake.jpg",
    "Images/ghatshila.jpg",
    "Images/360_F_524045329_OYwCWgLRFpsq6VX82dTeDcFV4wJ9jTYC.jpg",
    "Images/264012277_b7093876ae_b.jpg",
    "Images/Raj_Bhawan.jpg",
  ];
  const [currentImage, setCurrentImage] = useState(0);

  // Auto slide
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [heroImages.length]);

  // Manual controls
  const nextImage = () =>
    setCurrentImage((prev) => (prev + 1) % heroImages.length);
  const prevImage = () =>
    setCurrentImage((prev) =>
      prev === 0 ? heroImages.length - 1 : prev - 1
    );

  // Destinations
  const destinations = [
    {
      name: "Netarhat",
      image:
        "https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=800",
      description: "Queen of Chotanagpur",
    },
    {
      name: "Hundru Falls",
      image:
        "https://images.pexels.com/photos/1029604/pexels-photo-1029604.jpeg?auto=compress&cs=tinysrgb&w=800",
      description: "Magnificent 98m waterfall",
    },
    {
      name: "Betla National Park",
      image:
        "https://images.pexels.com/photos/1183099/pexels-photo-1183099.jpeg?auto=compress&cs=tinysrgb&w=800",
      description: "Wildlife sanctuary",
    },
    {
      name: "Deoghar",
      image:
        "https://images.pexels.com/photos/1007657/pexels-photo-1007657.jpeg?auto=compress&cs=tinysrgb&w=800",
      description: "Sacred Baidyanath Temple",
    },
  ];

  // Features
  const features = [
    {
      icon: <Smartphone className="h-8 w-8" />,
      title: "AI-Powered Planning",
      description:
        "Get personalized itineraries and multilingual chatbot assistance for seamless travel planning.",
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Blockchain Security",
      description:
        "Secure transactions and verified guides through blockchain-enabled certification system.",
    },
    {
      icon: <MapPin className="h-8 w-8" />,
      title: "Interactive Maps",
      description:
        "Explore destinations with AR/VR previews and real-time location information.",
    },
    {
      icon: <Globe className="h-8 w-8" />,
      title: "Local Marketplace",
      description:
        "Connect with tribal artisans, homestays, and authentic local experiences.",
    },
  ];

  // Stats
  const stats = [
    { number: "50+", label: "Tourist Destinations" },
    { number: "100+", label: "Certified Guides" },
    { number: "200+", label: "Local Artisans" },
    { number: "10K+", label: "Happy Visitors" },
  ];

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section with Slider */}
      <section className="relative bg-gradient-to-br from-emerald-900 via-emerald-800 to-green-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-30 z-10"></div>

        {/* Background Image Slider */}
        <div className="absolute inset-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentImage}
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${heroImages[currentImage]})` }}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 1 }}
            />
          </AnimatePresence>
        </div>

        {/* Hero Content */}
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Discover the Beauty of
              <span className="text-emerald-300 block">Jharkhand</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-200 max-w-3xl mx-auto">
              Experience the rich tribal culture, breathtaking landscapes, and
              hidden gems of Jharkhand through our AI-powered digital tourism
              platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/signup"
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all transform hover:scale-105 shadow-lg"
              >
                Start Your Journey
              </Link>
              <Link
                to="/map"
                className="border-2 border-white text-white hover:bg-white hover:text-emerald-900 px-8 py-4 rounded-lg font-semibold text-lg transition-all transform hover:scale-105"
              >
                Explore Map
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Slider Controls */}
        <div className="absolute inset-0 flex items-center justify-between px-6 z-30">
          <button
            onClick={prevImage}
            className="bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition"
          >
            ◀
          </button>
          <button
            onClick={nextImage}
            className="bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition"
          >
            ▶
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Revolutionary Tourism Features
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experience Jharkhand like never before with cutting-edge technology and local expertise
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all transform group"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="text-emerald-600 mb-4 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Destinations */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Popular Destinations
            </h2>
            <p className="text-xl text-gray-600">Explore the most beautiful places in Jharkhand</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {destinations.map((destination, index) => (
              <motion.div
                key={index}
                className="group cursor-pointer"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <div className="relative overflow-hidden rounded-xl shadow-lg">
                  <motion.img
                    src={destination.image}
                    alt={destination.name}
                    className="w-full h-64 object-cover"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.4 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-xl font-bold mb-1">{destination.name}</h3>
                    <p className="text-sm text-gray-200">{destination.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="py-16 bg-emerald-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <div className="text-4xl md:text-5xl font-bold mb-2">{stat.number}</div>
                <div className="text-xl text-emerald-100">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-emerald-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p>© 2025 Jharkhand Tourism. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
