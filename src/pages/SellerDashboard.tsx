import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Banknote, Package, ShieldCheck, PlusCircle } from 'lucide-react';

// Product ke data ka structure
interface Product {
  _id?: string;
  name: string;
  description: string;
  price: number | ''; // price number ya khali string ho sakta hai
  imageUrl: string;
}

const SellerDashboard: React.FC = () => {
  const { user, token, fetchUser } = useAuth();
  const [activeTab, setActiveTab] = useState('products');
  
  const [myProducts, setMyProducts] = useState<Product[]>([]);
  const [newProduct, setNewProduct] = useState<Product>({ name: '', description: '', price: '', imageUrl: '' });
  const [bankDetails, setBankDetails] = useState({ accountHolderName: '', accountNumber: '', ifscCode: '' });
  const [message, setMessage] = useState('');
  const [loadingProducts, setLoadingProducts] = useState(false);

  // Jab user data mile, to bank details form ko bharein
  useEffect(() => {
    if (user) {
      setBankDetails({
        accountHolderName: user.bankAccount?.accountHolderName || '',
        accountNumber: user.bankAccount?.accountNumber || '',
        ifscCode: user.bankAccount?.ifscCode || ''
      });
    }
  }, [user]);

  // Seller ke products ko fetch karein
  const fetchMyProducts = async () => {
      if (!user?._id) return;
      setLoadingProducts(true);
      try {
          const response = await fetch('http://localhost:5000/api/products');
          if (response.ok) {
              const allProducts = await response.json();
              const filteredProducts = allProducts.filter((p: any) => p.seller._id === user._id);
              setMyProducts(filteredProducts);
          }
      } catch (error) {
          console.error("Failed to fetch products", error);
      } finally {
          setLoadingProducts(false);
      }
  };

  useEffect(() => {
    fetchMyProducts();
  }, [user]);


  const handleBankUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    try {
      const response = await fetch('http://localhost:5000/api/profile/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-auth-token': token || '' },
        body: JSON.stringify({ bankAccount: bankDetails })
      });
      if(response.ok) {
        setMessage('Bank details updated successfully!');
        fetchUser(); // User data ko refresh karein
      } else {
        setMessage('Failed to update bank details.');
      }
    } catch (error) {
      setMessage('An error occurred.');
    }
  };

  const handleProductSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    if (!newProduct.name || !newProduct.price || !newProduct.imageUrl) {
        setMessage('Please fill all product fields.');
        return;
    }
    try {
        const response = await fetch('http://localhost:5000/api/products', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'x-auth-token': token || '' },
            body: JSON.stringify({ ...newProduct, price: Number(newProduct.price) })
        });
        const data = await response.json();
        if(response.ok) {
            setMessage('Product added successfully!');
            setNewProduct({ name: '', description: '', price: '', imageUrl: '' });
            fetchMyProducts(); // Product list ko refresh karein
        } else {
            setMessage(`Failed to add product: ${data.msg || 'Server error'}`);
        }
    } catch (error) {
        setMessage('An error occurred while adding product.');
    }
  };
  
  const ProfileTab = (
    <div className="bg-white p-6 md:p-8 rounded-lg shadow space-y-6">
        {message && <p className={`text-center p-3 rounded-md ${message.includes('successfully') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{message}</p>}
        <form onSubmit={handleBankUpdate} className="space-y-6">
            <div>
              <h3 className="text-xl font-bold flex items-center text-gray-800"><Banknote className="mr-3 text-green-500"/>Bank Account Details</h3>
              <div className="grid md:grid-cols-3 gap-4 mt-2">
                  <input type="text" placeholder="Account Holder Name" value={bankDetails.accountHolderName} onChange={e => setBankDetails({...bankDetails, accountHolderName: e.target.value})} className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"/>
                  <input type="text" placeholder="Account Number" value={bankDetails.accountNumber} onChange={e => setBankDetails({...bankDetails, accountNumber: e.target.value})} className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"/>
                  <input type="text" placeholder="IFSC Code" value={bankDetails.ifscCode} onChange={e => setBankDetails({...bankDetails, ifscCode: e.target.value})} className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"/>
              </div>
            </div>
            <button type="submit" className="bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-700 transition-colors">Save Bank Details</button>
        </form>
    </div>
  );

  const ProductsTab = (
     <div className="space-y-8">
        <div className="bg-white p-6 md:p-8 rounded-lg shadow">
          {message && <p className={`mb-4 text-center p-3 rounded-md ${message.includes('successfully') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{message}</p>}
          <form onSubmit={handleProductSubmit} className="space-y-4">
              <h3 className="text-xl font-bold flex items-center text-gray-800"><PlusCircle className="mr-3 text-orange-500"/>Add a New Product</h3>
              <div className="grid md:grid-cols-2 gap-4">
                  <input type="text" placeholder="Product Name" value={newProduct.name} onChange={e => setNewProduct({...newProduct, name: e.target.value})} className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500" required/>
                  <input type="number" placeholder="Price (₹)" value={newProduct.price} onChange={e => setNewProduct({...newProduct, price: e.target.value === '' ? '' : Number(e.target.value)})} className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500" required/>
                  <input type="text" placeholder="Image URL" value={newProduct.imageUrl} onChange={e => setNewProduct({...newProduct, imageUrl: e.target.value})} className="p-3 border border-gray-300 rounded-lg col-span-2 focus:ring-2 focus:ring-orange-500" required/>
                  <textarea placeholder="Description" value={newProduct.description} onChange={e => setNewProduct({...newProduct, description: e.target.value})} className="p-3 border border-gray-300 rounded-lg col-span-2 focus:ring-2 focus:ring-orange-500" rows={3} required></textarea>
              </div>
              <button type="submit" className="bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-700 transition-colors">Add Product</button>
          </form>
        </div>
        <div className="bg-white p-6 md:p-8 rounded-lg shadow">
          <h3 className="text-xl font-bold text-gray-800 mb-4"><Package className="inline-block mr-2"/>Your Listed Products</h3>
          <div className="space-y-4">
            {loadingProducts ? <p>Loading your products...</p> : myProducts.length > 0 ? myProducts.map(product => (
              <div key={product._id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <img src={product.imageUrl} alt={product.name} className="w-16 h-16 object-cover rounded"/>
                  <div>
                    <p className="font-semibold">{product.name}</p>
                    <p className="text-gray-600">₹{product.price}</p>
                  </div>
                </div>
              </div>
            )) : <p>You haven't added any products yet.</p>}
          </div>
        </div>
     </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="bg-gradient-to-r from-orange-600 to-red-600 rounded-xl text-white p-8 mb-8">
                <h1 className="text-3xl font-bold">Seller Dashboard</h1>
                <p className="text-orange-100 text-lg mt-1">Welcome, {user?.name}!</p>
                {user?.isVerified && <div className="mt-2 inline-flex items-center bg-green-500 px-3 py-1 rounded-full text-sm font-semibold"><ShieldCheck className="mr-2"/>Verified</div>}
            </div>
            <div className="bg-white rounded-lg shadow-sm mb-8">
                <nav className="-mb-px flex space-x-8 px-6 border-b">
                    <button onClick={() => { setActiveTab('products'); setMessage(''); }} className={`py-4 px-1 border-b-2 font-medium ${activeTab === 'products' ? 'border-orange-500 text-orange-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}>My Products</button>
                    <button onClick={() => { setActiveTab('profile'); setMessage(''); }} className={`py-4 px-1 border-b-2 font-medium ${activeTab === 'profile' ? 'border-orange-500 text-orange-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}>Profile & Bank</button>
                </nav>
            </div>
            {activeTab === 'products' && ProductsTab}
            {activeTab === 'profile' && ProfileTab}
        </div>
    </div>
  );
};

export default SellerDashboard;