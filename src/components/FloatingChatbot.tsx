// File: src/components/FloatingChatbot.tsx
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

// ---------------- Multilingual Dataset ----------------
const dataset: Record<string, Record<string, string>> = {
  en: {
    hello: "Hello! Welcome to Jharkhand Tourism 🌲. Ask me anything about places, food, travel, or emergencies.",
    help: "I can help you with:\n🏞️ Tourist attractions\n🍛 Local food\n🌤️ Best time to visit\n🚨 Emergency contacts (police/hospital)",
    emergency: "🚨 Emergency detected!\n\n🚑 City Hospital - 102\n📍 Near Main Square, Ranchi\n\n👮 Local Police Station - 100\n📍 Sector 10, Ranchi"
  },
  hi: {
    hello: "नमस्ते! झारखंड पर्यटन में आपका स्वागत है 🌲। आप मुझसे पर्यटन स्थल, भोजन, यात्रा या आपातकालीन जानकारी पूछ सकते हैं।",
    help: "मैं आपकी मदद कर सकता हूँ:\n🏞️ पर्यटन स्थल\n🍛 स्थानीय भोजन\n🌤️ घूमने का सबसे अच्छा समय\n🚨 आपातकालीन संपर्क (पुलिस/अस्पताल)",
    emergency: "🚨 आपातकाल!\n\n🚑 सिटी हॉस्पिटल - 102\n📍 मेन स्क्वायर, रांची\n\n👮 स्थानीय पुलिस स्टेशन - 100\n📍 सेक्टर 10, रांची"
  },
  mr: {
    hello: "नमस्कार! झारखंड पर्यटनात आपले स्वागत आहे 🌲. मला स्थळे, अन्न, प्रवास किंवा आपत्कालीन माहिती विचारा.",
    help: "मी तुम्हाला मदत करू शकतो:\n🏞️ पर्यटन स्थळे\n🍛 स्थानिक अन्न\n🌤️ भेट देण्याचा सर्वोत्तम काळ\n🚨 आपत्कालीन संपर्क (पोलीस/रुग्णालय)",
    emergency: "🚨 आपत्काल!\n\n🚑 सिटी हॉस्पिटल - 102\n📍 मेन स्क्वेअर, रांची\n\n👮 स्थानिक पोलीस स्टेशन - 100\n📍 सेक्टर 10, रांची"
  },
  gu: {
    hello: "નમસ્તે! ઝારખંડ પર્યટનમાં તમારું સ્વાગત છે 🌲. સ્થળો, ખોરાક, પ્રવાસ અથવા આપત્તિ વિશે પૂછો.",
    help: "હું મદદ કરી શકું છું:\n🏞️ પર્યટન સ્થળો\n🍛 સ્થાનિક ખોરાક\n🌤️ શ્રેષ્ઠ મુલાકાત સમય\n🚨 આપત્તિ સંપર્ક (પોલીસ/હોસ્પિટલ)",
    emergency: "🚨 આપત્તિ!\n\n🚑 સિટી હોસ્પિટલ - 102\n📍 મેઈન સ્ક્વેર, રાંચી\n\n👮 સ્થાનિક પોલીસ સ્ટેશન - 100\n📍 સેક્ટર 10, રાંચી"
  }
};

// ---------------- Language Detection ----------------
const detectLanguage = (msg: string): keyof typeof dataset => {
  if (/नमस्ते|मदद|आपातकाल/.test(msg)) return "hi";
  if (/नमस्कार|आपत्काल/.test(msg)) return "mr";
  if (/નમસ્તે|આપત્તિ/.test(msg)) return "gu";
  return "en";
};

// ---------------- FAQ Database (tourism specific) ----------------
const faqDatabase = [
  { keywords: ["hundru", "waterfall"], response: "Hundru Falls is 322ft high, best from July-March 🌊📸." },
  { keywords: ["betla", "tiger", "safari"], response: "Betla National Park 🐅 has tigers, elephants, and safaris from Oct-May." },
  { keywords: ["netarhat", "sunset"], response: "Netarhat 🌄 is called 'Queen of Chotanagpur'. Famous for sunrises/sunsets." },
  { keywords: ["food", "cuisine"], response: "Try Dhuska, Pittha, Mahua, Bamboo curry 🍛." },
  { keywords: ["safety"], response: "Jharkhand is generally safe 🛡️. Emergency Helpline: 112" }
];

const FloatingChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "नमस्कार! Welcome to Jharkhand Tourism 🌲. Ask me about tourist places, food, culture, or emergencies.",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  // Auto-scroll
  useEffect(() => {
    if (isOpen && !isMinimized) {
      setTimeout(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 50);
    }
  }, [messages, isTyping, isOpen, isMinimized]);

  // ---------------- Chat Logic ----------------
  const sendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = { id: Date.now(), text: inputMessage, sender: 'user', timestamp: new Date() };
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    await new Promise(r => setTimeout(r, 800));

    const lang = detectLanguage(userMessage.text);
    const lowerInput = userMessage.text.toLowerCase();
    let response = dataset[lang].help;

    if (lowerInput.includes("hello") || lowerInput.includes("hi") || lowerInput.includes("नमस्ते")) {
      response = dataset[lang].hello;
    } else if (lowerInput.includes("help") || lowerInput.includes("मदद")) {
      response = dataset[lang].help;
    } else if (lowerInput.includes("emergency") || lowerInput.includes("आपातकाल") || lowerInput.includes("આપત્તિ")) {
      response = dataset[lang].emergency;
    } else {
      // Try matching FAQ
      for (const faq of faqDatabase) {
        if (faq.keywords.some(k => lowerInput.includes(k))) {
          response = faq.response;
          break;
        }
      }
    }

    const botMessage = { id: Date.now() + 1, text: response, sender: 'bot', timestamp: new Date() };
    setIsTyping(false);
    setMessages(prev => [...prev, botMessage]);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* Floating Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 bg-green-600 hover:bg-green-700 text-white p-4 rounded-full shadow-2xl transition transform hover:scale-110"
        >
          <MessageCircle className="w-6 h-6" />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className={`fixed bottom-6 right-6 bg-white rounded-2xl shadow-2xl ${isMinimized ? 'w-80 h-16' : 'w-96 h-[500px]'}`}>
          {/* Header */}
          <div className="bg-green-600 text-white p-3 rounded-t-2xl flex justify-between">
            <div className="flex items-center space-x-2">
              <TreePine className="w-5 h-5" />
              <span className="font-semibold text-sm">Jharkhand Assistant</span>
            </div>
            <div className="flex space-x-2">
              <button onClick={() => setIsMinimized(!isMinimized)}><Minimize2 size={16} /></button>
              <button onClick={() => setIsOpen(false)}><X size={16} /></button>
            </div>
          </div>

          {/* Chat Content */}
          {!isMinimized && (
            <>
              <div className="h-80 overflow-y-auto p-3 bg-gray-50">
                {messages.map(m => (
                  <div key={m.id} className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-xs px-3 py-2 rounded-lg text-sm ${m.sender === 'user' ? 'bg-green-600 text-white' : 'bg-white border shadow-sm'}`}>
                      {m.text}
                    </div>
                  </div>
                ))}
                {isTyping && <p className="text-xs text-gray-400">Typing...</p>}
                <div ref={chatEndRef} />
              </div>

              {/* Input */}
              <div className="p-3 border-t flex space-x-2">
                <textarea
                  value={inputMessage}
                  onChange={e => setInputMessage(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder="Type your question..."
                  className="flex-1 border rounded-lg px-2 py-1 text-sm resize-none"
                  rows={1}
                />
                <button onClick={sendMessage} disabled={!inputMessage.trim()} className="bg-green-600 text-white px-3 py-1 rounded-lg"> <Send size={16} /> </button>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default FloatingChatbot;
