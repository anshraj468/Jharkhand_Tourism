import React, { useState, useEffect, useRef } from 'react';
import { 
  MessageCircle, 
  Send, 
  Bot, 
  User, 
  X,
  Minimize2,
  TreePine
} from 'lucide-react';

// FAQ database for chatbot responses
const faqDatabase = [
  {
    keywords: ["hello", "hi", "namaste", "hey"],
    response: "नमस्कार! Welcome to Jharkhand Tourism! 🌲 I'm your AI travel assistant. I can help you with information about tourist places, local food, best time to visit, travel tips, and much more. How can I assist you today?"
  },
  {
    keywords: ["weather", "best time", "season", "climate", "when to visit"],
    response: "The best time to visit Jharkhand is from October to March when the weather is pleasant with temperatures between 15-25°C. Avoid monsoons (June-September) for outdoor activities, but it's perfect for waterfall viewing! Summer (April-May) can be hot but good for hill stations like Netarhat."
  },
  {
    keywords: ["food", "cuisine", "eat", "restaurant", "local food", "dishes"],
    response: "Jharkhand offers delicious tribal cuisine! Must-try dishes: 🥟 Dhuska (rice-dal fritters), 🍰 Pittha (rice cakes), 🍪 Thekua (sweet snack), 🌸 Mahua flowers, 🍛 Bamboo shoot curry, and authentic mutton curry. Don't miss the local markets for fresh tribal vegetables!"
  },
  {
    keywords: ["hundru falls", "hundru", "waterfall"],
    response: "Hundru Falls is a spectacular 322-foot waterfall formed by the Subarnarekha River! 📍 Located 45km from Ranchi, it's best visited during July-March. Perfect for photography, trekking, and picnics. The surrounding area offers great spots for nature lovers and adventure enthusiasts!"
  },
  {
    keywords: ["betla", "national park", "wildlife", "tiger", "safari"],
    response: "Betla National Park is Jharkhand's premier wildlife destination! 🐅 Home to tigers, elephants, leopards, and diverse wildlife across 979 sq km. Best visited October-May. Book safari in advance and stay at forest guest houses. Early morning and evening safaris offer best wildlife viewing!"
  },
  {
    keywords: ["netarhat", "sunrise", "sunset", "hill station"],
    response: "Netarhat is the 'Queen of Chotanagpur'! 🌅 Famous for breathtaking sunrises and sunsets, located 156km from Ranchi. Best visited October-March for cool climate and clear views. Don't miss Magnolia Point for sunrise and Upper Ghaghri Falls nearby. Perfect for nature photography!"
  },
  {
    keywords: ["deoghar", "baidyanath", "temple", "jyotirlinga", "religious"],
    response: "Baidyanath Temple in Deoghar is one of the twelve sacred Jyotirlingas! 🙏 During Shravan month, millions of Kanwariyas visit. The town offers peaceful atmosphere year-round with beautiful temples, local markets, and spiritual experiences. Book accommodation in advance during peak season."
  },
  {
    keywords: ["transport", "travel", "how to reach", "bus", "train", "flight", "airport"],
    response: "🛫 Ranchi has Birsa Munda Airport with good connectivity to major cities. 🚂 Major railway stations: Ranchi, Jamshedpur, Dhanbad, Bokaro. 🚌 State buses and private taxis available for local travel. For hill stations and remote areas, hiring a car is recommended."
  },
  {
    keywords: ["accommodation", "hotel", "stay", "lodge", "where to stay"],
    response: "Jharkhand offers diverse accommodation options: 🏨 Luxury hotels in Ranchi & Jamshedpur, 🏡 Budget hotels and guesthouses, 🌲 Forest guest houses near national parks, 🏔️ Hill resorts in Netarhat. Book in advance during peak season (Oct-Mar) and festivals."
  },
  {
    keywords: ["safety", "safe", "security", "crime", "precautions"],
    response: "Jharkhand is generally safe for tourists! 🛡️ Follow basic precautions: travel in groups, avoid isolated areas at night, keep valuables secure, and inform someone about your itinerary. Local people are helpful and welcoming. Emergency helpline: 112"
  },
  {
    keywords: ["culture", "tribal", "tradition", "festival", "dance"],
    response: "Jharkhand has incredibly rich tribal culture! 🎭 Experience Sohrai (harvest festival), Karma dance, Chhau dance, and traditional art. Visit tribal villages for authentic lifestyle and handicrafts. Major festivals: Sarhul, Karma, Sohrai. Always respect local customs and traditions."
  },
  {
    keywords: ["adventure", "trekking", "activities", "sports"],
    response: "Adventure enthusiasts will love Jharkhand! 🏔️ Trekking at Parasnath Hill (highest peak), rock climbing at waterfalls, wildlife safaris, water sports at dams, river rafting, and adventure photography. Many waterfalls offer great opportunities for rappelling and rock climbing!"
  },
  {
    keywords: ["shopping", "handicraft", "souvenir", "buy", "market"],
    response: "Shop for authentic tribal handicrafts! 🛍️ Must-buy: Dokra metal art, handwoven textiles, bamboo products, tribal jewelry, and wooden crafts. Best places: Main Bazaar (Ranchi), local markets in Jamshedpur, and directly from tribal artisans. Support local communities!"
  },
  {
    keywords: ["ranchi", "capital", "city tour"],
    response: "Ranchi, the capital city, offers great urban experiences! 🏙️ Visit Ranchi Lake, Tagore Hill, Rock Garden, Jagannath Temple, and tribal museums. The city has good restaurants, shopping malls, and is the perfect base for exploring nearby waterfalls and attractions."
  },
  {
    keywords: ["jamshedpur", "steel city", "tata"],
    response: "Jamshedpur is India's first planned industrial city! 🏭 Known as Steel City, visit Tata Steel Plant (advance permission needed), Jubilee Park, Dimna Lake for water sports, Dalma Wildlife Sanctuary, and well-maintained gardens. The city showcases perfect blend of industry and nature."
  },
  {
    keywords: ["cost", "budget", "expensive", "cheap", "money"],
    response: "Jharkhand is quite budget-friendly! 💰 Daily budget: ₹1500-3000 for mid-range travel, ₹800-1500 for budget travel, ₹3000+ for luxury. Food is affordable, local transport is cheap. Major expenses: accommodation and private transport for remote areas."
  },
  {
    keywords: ["parasnath", "jain", "pilgrimage", "highest peak"],
    response: "Parasnath Hill is Jharkhand's highest peak and most sacred Jain pilgrimage site! ⛰️ Located in Giridih, it has 24 ancient Jain temples. The trek to the top takes 3-4 hours and offers panoramic views. Best visited October-March. Respect the religious sentiments of pilgrims."
  }
];

const FloatingChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "नमस्कार! Welcome to Jharkhand Tourism! 🌲 I'm here to help you explore the beautiful 'Land of Forests'. Ask me anything about tourist places, local food, best time to visit, or travel tips!",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  // Auto-scroll chat to bottom
  useEffect(() => {
    if (isOpen && !isMinimized) {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping, isOpen, isMinimized]);

  // Chatbot response logic
  const sendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate thinking time
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));

    // Find matching response from FAQ database
    const lowerInput = inputMessage.toLowerCase();
    let response = "I'd be happy to help you explore Jharkhand! 🌲 Could you ask about specific places, food, weather, culture, or travel tips? For example: 'Tell me about Hundru Falls' or 'What's the best time to visit?' or 'Show me local food options'";

    // Check for keyword matches
    for (const faq of faqDatabase) {
      if (faq.keywords.some(keyword => lowerInput.includes(keyword))) {
        response = faq.response;
        break;
      }
    }

    // Add some contextual responses for common queries
    if (lowerInput.includes('help') || lowerInput.includes('assist')) {
      response = "I'm here to help! 😊 I can provide information about:\n\n🏞️ Tourist places and attractions\n🍛 Local food and cuisine\n🌤️ Weather and best time to visit\n🚗 Transportation and travel tips\n🏨 Accommodation options\n🎭 Culture and festivals\n🛍️ Shopping and handicrafts\n\nWhat would you like to know about Jharkhand?";
    }

    if (lowerInput.includes('thank') || lowerInput.includes('thanks')) {
      response = "You're most welcome! 😊 I'm glad I could help you plan your Jharkhand adventure. Feel free to ask if you need any more information about the beautiful 'Land of Forests'. Have a wonderful trip! 🌲✨";
    }

    const botMessage = {
      id: Date.now() + 1,
      text: response,
      sender: 'bot',
      timestamp: new Date()
    };

    setIsTyping(false);
    setMessages(prev => [...prev, botMessage]);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
    setIsMinimized(false);
  };

  const minimizeChat = () => {
    setIsMinimized(!isMinimized);
  };

  const closeChat = () => {
    setIsOpen(false);
    setIsMinimized(false);
  };

  return (
    <>
      {/* Floating Chat Button */}
      {!isOpen && (
        <button
          onClick={toggleChat}
          className="fixed bottom-6 right-6 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white p-4 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-110 z-50 group"
          style={{ zIndex: 9999 }}
        >
          <MessageCircle className="w-6 h-6" />
          <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
            !
          </div>
          <div className="absolute right-16 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            Ask about Jharkhand Tourism
          </div>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div 
          className={`fixed bottom-6 right-6 bg-white rounded-2xl shadow-2xl transition-all duration-300 z-50 ${
            isMinimized ? 'w-80 h-16' : 'w-96 h-[500px]'
          }`}
          style={{ zIndex: 9999 }}
        >
          {/* Chat Header */}
          <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white p-4 rounded-t-2xl flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <TreePine className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-semibold text-sm">Jharkhand Tourism Assistant</h3>
                <p className="text-xs text-green-100">Online • Ready to help</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={minimizeChat}
                className="p-1 hover:bg-white hover:bg-opacity-20 rounded transition-colors duration-200"
              >
                <Minimize2 className="w-4 h-4" />
              </button>
              <button
                onClick={closeChat}
                className="p-1 hover:bg-white hover:bg-opacity-20 rounded transition-colors duration-200"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Chat Content */}
          {!isMinimized && (
            <>
              {/* Messages Area */}
              <div className="h-80 overflow-y-auto p-4 space-y-4 bg-gray-50">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`flex items-start space-x-2 max-w-xs ${
                        message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                      }`}
                    >
                      <div
                        className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ${
                          message.sender === 'user'
                            ? 'bg-green-600'
                            : 'bg-blue-500'
                        }`}
                      >
                        {message.sender === 'user' ? (
                          <User className="w-3 h-3 text-white" />
                        ) : (
                          <Bot className="w-3 h-3 text-white" />
                        )}
                      </div>
                      <div
                        className={`px-3 py-2 rounded-lg text-sm ${
                          message.sender === 'user'
                            ? 'bg-green-600 text-white'
                            : 'bg-white text-gray-800 shadow-sm border'
                        }`}
                      >
                        <p className="leading-relaxed whitespace-pre-line">{message.text}</p>
                      </div>
                    </div>
                  </div>
                ))}
                
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="flex items-center space-x-2">
                      <div className="w-7 h-7 rounded-full bg-blue-500 flex items-center justify-center">
                        <Bot className="w-3 h-3 text-white" />
                      </div>
                      <div className="bg-white px-3 py-2 rounded-lg shadow-sm border">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>

              {/* Input Area */}
              <div className="p-4 border-t bg-white rounded-b-2xl">
                <div className="flex space-x-2">
                  <textarea
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask about places, food, weather..."
                    className="flex-1 px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 resize-none text-sm"
                    rows="1"
                    style={{ minHeight: '36px', maxHeight: '72px' }}
                  />
                  <button
                    onClick={sendMessage}
                    disabled={!inputMessage.trim() || isTyping}
                    className="bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white px-3 py-2 rounded-lg transition-all duration-300 flex items-center justify-center"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-2 text-center">
                  Press Enter to send • Shift+Enter for new line
                </p>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default FloatingChatbot;