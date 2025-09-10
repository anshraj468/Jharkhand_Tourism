import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { ArrowRight, Mail, Lock, User, ShieldCheck } from 'lucide-react';

// --- GOVT ID VERIFICATION DUMMY FUNCTION ---
const verifyGovernmentId = (id: string): boolean => {
  const aadhaarRegex = /^\d{12}$/;
  const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
  return aadhaarRegex.test(id) || panRegex.test(id);
};

const LoginPage: React.FC = () => {
  const [authMode, setAuthMode] = useState('signin');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('tourist');
  const [govtId, setGovtId] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const { login, signup, isLoading } = useAuth(); 
  const navigate = useNavigate(); 

  const BackgroundImage = '/Images/Welocome.jpeg'; 

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    if (authMode === 'signup') {
      // --- SIGN UP LOGIC ---
      if (role === 'admin') {
        setError('You cannot sign up as an Admin.');
        return;
      }
      if (!name || !email || !password || !confirmPassword) {
        setError('Please fill in all fields');
        return;
      }
      if (role === 'guide' || role === 'seller') {
        if (!govtId) {
          setError('Government ID is required for Guides and Sellers');
          return;
        }
        if (!verifyGovernmentId(govtId)) {
          setError('Invalid Government ID. Please enter a valid Aadhaar (12 digits) or PAN (ABCDE1234F)');
          return;
        }
      }
      if (password !== confirmPassword) {
        setError('Passwords do not match');
        return;
      }
      if (password.length < 6) {
        setError('Password must be at least 6 characters long');
        return;
      }
      
      const success = await signup(name, email, password, role);
      if (success) {
        setSuccessMessage('Signup successful! Please sign in to continue.');
        setAuthMode('signin');
        setName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setGovtId('');
      } else {
        setError('Signup failed. The email might already be in use.');
      }

    } else {
      // --- SIGN IN LOGIC ---
      if (!email || !password) {
        setError('Please enter email and password');
        return;
      }
      
      const success = await login(email, password, role);
      if (success) {
        navigate(`/dashboard/${role}`);
      } else {
        setError('Invalid credentials or role mismatch. Please try again.');
      }
    }
  };

  const Logo = () => (
    <div className="flex items-center space-x-2">
      <img
        src="/Images/logo-login.png"
        alt="Jharkhand Tourism Logo"
        className="h-20 w-20 object-contain"
      />
      <span className="text-2xl font-semibold text-white">
        Jharkhand Tourism
      </span>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-emerald-50 to-sky-100 flex font-sans">
      {/* Left Panel */}
      <div
        className="w-1/2 hidden lg:flex flex-col justify-between text-white relative bg-cover bg-center"
        style={{ backgroundImage: `url(${BackgroundImage})` }}
      >
        <div className="relative z-10 flex flex-col justify-between h-full p-12 bg-black/30">
          <Logo />
        </div>
      </div>

      {/* Right Panel */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md bg-white/90 shadow-2xl p-8 rounded-xl backdrop-blur-sm">
          {/* Toggle */}
          <div className="flex bg-gray-200 rounded-lg p-1 mb-8">
            <button
              onClick={() => { setAuthMode('signin'); setError(''); setSuccessMessage(''); }}
              className={`w-1/2 py-2.5 rounded-md transition-all duration-300 font-semibold ${
                authMode === 'signin' ? 'bg-white shadow-md text-green-700' : 'text-gray-500'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => { setAuthMode('signup'); setError(''); setSuccessMessage(''); }}
              className={`w-1/2 py-2.5 rounded-md transition-all duration-300 font-semibold ${
                authMode === 'signup' ? 'bg-white shadow-md text-green-700' : 'text-gray-500'
              }`}
            >
              Sign Up
            </button>
          </div>

          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            {authMode === 'signin' ? 'Welcome Back!' : 'Create Your Account'}
          </h2>

          {error && <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-lg mb-6">{error}</div>}
          {successMessage && <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded-lg mb-6">{successMessage}</div>}

          <form onSubmit={handleSubmit} className="space-y-5">
            {authMode === 'signup' && (
              <div className="relative">
                <User className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                <input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500" placeholder="Full Name" required/>
              </div>
            )}
            
            <div className="relative">
              <Mail className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
              <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500" placeholder="Email Address" required/>
            </div>

            <div className="relative">
              <Lock className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
              <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500" placeholder="Password" required/>
            </div>
            
            {authMode === 'signup' && (
              <div className="relative">
                <Lock className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                <input id="confirmPassword" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500" placeholder="Confirm Password" required/>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">I am a:</label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {/* Sign up karte samay 'admin' ka option nahi dikhega */}
                {(authMode === 'signin' ? ['tourist', 'guide', 'seller', 'admin'] : ['tourist', 'guide', 'seller']).map((r) => (
                  <button type="button" key={r} onClick={() => setRole(r)} className={`py-2 px-4 rounded-lg border-2 font-medium capitalize transition-colors ${role === r ? 'bg-green-100 border-green-500 text-green-700' : 'border-gray-300 text-gray-600 hover:bg-gray-50'}`}>
                    {r}
                  </button>
                ))}
              </div>
            </div>

            {authMode === 'signup' && (role === 'guide' || role === 'seller') && (
              <div className="relative">
                  <ShieldCheck className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                  <input id="govtId" type="text" value={govtId} onChange={(e) => setGovtId(e.target.value)} className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500" placeholder="Aadhaar or PAN Number" required/>
              </div>
            )}

            <button type="submit" disabled={isLoading} className="w-full bg-gradient-to-r from-green-600 to-emerald-500 text-white py-3 rounded-lg font-semibold hover:opacity-90 transition-all disabled:opacity-60 flex items-center justify-center group text-lg">
              {isLoading ? 'Processing...' : (authMode === 'signin' ? 'Sign In' : 'Create Account')}
              {!isLoading && <ArrowRight className="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform" />}
            </button>
          </form>

          <div className="my-6 flex items-center"><div className="flex-grow border-t border-gray-300"></div><span className="flex-shrink mx-4 text-gray-500 text-sm">or</span><div className="flex-grow border-t border-gray-300"></div></div>

          <button className="w-full flex items-center justify-center py-3 px-4 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors font-medium">
              <img src="https://www.svgrepo.com/show/355037/google.svg" alt="Google" className="w-5 h-5 mr-3" />
              <span>Continue with Google</span>
          </button>
           <div className="mt-6 text-center">
            <Link to="/" className="text-sm text-gray-600 hover:text-green-600 font-medium">
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
