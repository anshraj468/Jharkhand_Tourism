import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Search, ShoppingCart, ShieldCheck, Star } from 'lucide-react';


// Hamare data ke liye Interfaces
interface Guide {
  _id: string;
  name: string;
  qualifications: string[];
  isVerified: boolean;
}

interface Product {
  _id: string;
  name: string;
  price: number;
  imageUrl: string;
  seller: {
    _id: string;
    name: string;
    isVerified: boolean;
  };
}

// Payment ke liye type
type PaymentItem = {
  type: 'guide' | 'product';
  item: Guide | Product;
};

const TouristDashboard: React.FC = () => {
  const { user, token } = useAuth();
  const [activeTab, setActiveTab] = useState('guides');
  const [guides, setGuides] = useState<Guide[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [paymentInfo, setPaymentInfo] = useState<PaymentItem | null>(null);
  const [loading, setLoading] = useState(true);

  // Component load hone par backend se data fetch karein
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [guidesRes, productsRes] = await Promise.all([
          fetch('http://localhost:5000/api/guides'),
          fetch('http://localhost:5000/api/products')
        ]);
        if (guidesRes.ok) {
          const guidesData = await guidesRes.json();
          setGuides(guidesData);
        }
        if (productsRes.ok) {
          const productsData = await productsRes.json();
          setProducts(productsData);
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Payment process ko handle karne wala function
  const handlePayment = async () => {
    if (!paymentInfo || !token) return;
    
    let paymentData;

    // Check karein ki payment guide ke liye hai ya product ke liye
    if (paymentInfo.type === 'guide') {
        const guide = paymentInfo.item as Guide;
        paymentData = {
            to: guide._id,
            amount: 5000, // Guide ke liye abhi fixed price
            product: undefined,
        };
    } else {
        const product = paymentInfo.item as Product;
        paymentData = {
            to: product.seller._id,
            amount: product.price,
            product: product._id,
        };
    }

    try {
      const response = await fetch('http://localhost:5000/api/payment/process', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-auth-token': token },
        body: JSON.stringify(paymentData),
      });
      const data = await response.json();
      if(response.ok) {
        alert(`Payment Successful!\n\nThis transaction is secured.\nYour Blockchain Transaction Hash is:\n${data.transactionHash}`);
      } else {
        alert(`Payment Failed: ${data.msg || 'An unknown error occurred.'}`);
      }
    } catch (error) {
      alert('An error occurred during payment. Please check your connection.');
    } finally {
      setPaymentInfo(null); // Modal ko band karein
    }
  };

  const GuidesTab = (
     <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {guides.map(guide => (
            <div key={guide._id} className="bg-white p-5 rounded-lg shadow-md flex flex-col hover:shadow-xl transition-shadow">
                <h3 className="font-bold text-lg flex items-center">
                  {guide.name} 
                  {guide.isVerified && <span title="Verified by Jharkhand Tourism"><ShieldCheck className="w-5 h-5 ml-2 text-green-500"/></span>}
                </h3>
                <p className="text-sm text-gray-600 my-2 flex-grow">
                  <span className="font-semibold">Skills:</span> {guide.qualifications.join(', ') || 'Not specified'}
                </p>
                <button 
                  onClick={() => setPaymentInfo({ type: 'guide', item: guide })} 
                  className="w-full mt-auto bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  Hire for ₹5000
                </button>
            </div>
        ))}
     </div>
  );

  const ShopTab = (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map(product => (
            <div key={product._id} className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col hover:shadow-xl transition-shadow">
                <img src={product.imageUrl} alt={product.name} className="w-full h-48 object-cover"/>
                <div className="p-4 flex flex-col flex-grow">
                    <h3 className="font-bold text-lg">{product.name}</h3>
                    <p className="text-sm text-gray-600 flex items-center">
                      by {product.seller.name} 
                      {product.seller.isVerified && <span title="Verified Seller"><ShieldCheck className="w-4 h-4 ml-1 text-green-500"/></span>}
                    </p>
                    <p className="font-extrabold text-xl my-2">₹{product.price}</p>
                    <button 
                      onClick={() => setPaymentInfo({ type: 'product', item: product })} 
                      className="w-full mt-auto bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 transition-colors"
                    >
                      Buy Now
                    </button>
                </div>
            </div>
        ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="bg-gradient-to-r from-emerald-600 to-green-600 rounded-xl text-white p-8 mb-8">
                <h1 className="text-3xl font-bold">Explore Jharkhand</h1>
                <p className="text-emerald-100 text-lg mt-1">Find verified local guides and authentic handicrafts.</p>
            </div>
            <div className="bg-white rounded-lg shadow-sm mb-8">
                <nav className="-mb-px flex space-x-8 px-6 border-b">
                    <button onClick={() => setActiveTab('guides')} className={`py-4 px-1 border-b-2 font-medium flex items-center ${activeTab === 'guides' ? 'border-emerald-500 text-emerald-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}><Search className="mr-2 h-5 w-5"/>Find Guides</button>
                    <button onClick={() => setActiveTab('shop')} className={`py-4 px-1 border-b-2 font-medium flex items-center ${activeTab === 'shop' ? 'border-emerald-500 text-emerald-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}><ShoppingCart className="mr-2 h-5 w-5"/>Shop Local</button>
                </nav>
            </div>
            
            {loading ? <p className="text-center py-10">Loading awesome guides and products...</p> : (
              <div>
                {activeTab === 'guides' && (guides.length > 0 ? GuidesTab : <p className="text-center py-10 text-gray-500">No guides available right now. Please check back later.</p>)}
                {activeTab === 'shop' && (products.length > 0 ? ShopTab : <p className="text-center py-10 text-gray-500">No products available in the shop yet.</p>)}
              </div>
            )}
        </div>
        
        {/* Payment Modal */}
        {paymentInfo && (
            <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50">
                <div className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full">
                    <h2 className="text-2xl font-bold mb-4">Confirm Payment</h2>
                    <p className="text-gray-700">
                      You are about to pay <span className="font-bold">₹{paymentInfo.type === 'guide' ? '5000' : (paymentInfo.item as Product).price}</span> to <span className="font-bold">{paymentInfo.type === 'guide' ? (paymentInfo.item as Guide).name : (paymentInfo.item as Product).seller.name}</span>.
                    </p>
                    <p className="text-xs text-gray-500 my-4 bg-gray-100 p-2 rounded">
                      This transaction will be recorded with a unique, secure hash, simulating a blockchain entry.
                    </p>
                    <div className="flex justify-end gap-4 mt-6">
                        <button onClick={() => setPaymentInfo(null)} className="px-4 py-2 rounded text-gray-700 bg-gray-200 hover:bg-gray-300 font-semibold">Cancel</button>
                        <button onClick={handlePayment} className="px-6 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 font-semibold">Pay Now</button>
                    </div>
                </div>
            </div>
        )}
    </div>
  );
};

export default TouristDashboard;