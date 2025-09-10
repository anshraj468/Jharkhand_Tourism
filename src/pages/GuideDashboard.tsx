import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Banknote, BookUser, ShieldCheck, TrendingUp, Calendar, DollarSign, Users } from 'lucide-react';

const GuideDashboard: React.FC = () => {
  const { user, token, fetchUser } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  
  const [qualifications, setQualifications] = useState('');
  const [bankDetails, setBankDetails] = useState({ accountHolderName: '', accountNumber: '', ifscCode: '' });
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (user) {
      setQualifications(user.qualifications?.join(', ') || '');
      setBankDetails({
        accountHolderName: user.bankAccount?.accountHolderName || '',
        accountNumber: user.bankAccount?.accountNumber || '',
        ifscCode: user.bankAccount?.ifscCode || ''
      });
    }
  }, [user]);

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    const qualsArray = qualifications.split(',').map(q => q.trim()).filter(Boolean);
    
    try {
      const response = await fetch('http://localhost:5000/api/profile/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-auth-token': token || '' },
        body: JSON.stringify({ qualifications: qualsArray, bankAccount: bankDetails })
      });
      if(response.ok) {
        setMessage('Profile updated successfully!');
        fetchUser(); // Refresh user data
      } else {
        setMessage('Failed to update profile.');
      }
    } catch (error) {
      setMessage('An error occurred.');
    }
  };
  
  const ProfileTab = (
    <div className="bg-white p-6 md:p-8 rounded-lg shadow space-y-8">
      {message && <p className={`text-center p-3 rounded-md ${message.includes('successfully') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{message}</p>}
      <form onSubmit={handleProfileUpdate} className="space-y-6">
        <div>
          <h3 className="text-xl font-bold flex items-center text-gray-800"><BookUser className="mr-3 text-blue-500"/>Your Qualifications</h3>
          <p className="text-gray-500 mt-1 mb-2">Enter your skills, separated by commas (e.g., History Expert, Fluent in English).</p>
          <textarea 
            value={qualifications}
            onChange={(e) => setQualifications(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            rows={3}
          />
        </div>
        <div>
          <h3 className="text-xl font-bold flex items-center text-gray-800"><Banknote className="mr-3 text-green-500"/>Bank Account Details</h3>
          <div className="grid md:grid-cols-3 gap-4 mt-2">
            <input type="text" placeholder="Account Holder Name" value={bankDetails.accountHolderName} onChange={e => setBankDetails({...bankDetails, accountHolderName: e.target.value})} className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"/>
            <input type="text" placeholder="Account Number" value={bankDetails.accountNumber} onChange={e => setBankDetails({...bankDetails, accountNumber: e.target.value})} className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"/>
            <input type="text" placeholder="IFSC Code" value={bankDetails.ifscCode} onChange={e => setBankDetails({...bankDetails, ifscCode: e.target.value})} className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"/>
          </div>
        </div>
        <button type="submit" className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">Save Changes</button>
      </form>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
         <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl text-white p-8 mb-8">
              <h1 className="text-3xl font-bold">Guide Dashboard</h1>
              <p className="text-blue-100 text-lg mt-1">Welcome, {user?.name}!</p>
              {user?.isVerified && <div className="mt-2 inline-flex items-center bg-green-500 px-3 py-1 rounded-full text-sm font-semibold"><ShieldCheck className="mr-2"/>Verified</div>}
         </div>
         <div className="bg-white rounded-lg shadow-sm mb-8">
            <nav className="-mb-px flex space-x-8 px-6 border-b">
                <button onClick={() => setActiveTab('overview')} className={`py-4 px-1 border-b-2 font-medium ${activeTab === 'overview' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}>Overview</button>
                <button onClick={() => setActiveTab('profile')} className={`py-4 px-1 border-b-2 font-medium ${activeTab === 'profile' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}>Profile & Bank</button>
            </nav>
         </div>
         {activeTab === 'overview' && <div>Overview content will go here.</div>}
         {activeTab === 'profile' && ProfileTab}
      </div>
    </div>
  );
};

export default GuideDashboard;

