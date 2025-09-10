import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Users, UserCheck, Briefcase, ShoppingCart, TrendingUp, Shield, ShieldCheck } from 'lucide-react';

// Stats data ke liye ek Interface
interface StatsData {
  totalUsers: number;
  touristCount: number;
  guideCount: number;
  sellerCount: number;
}

// StatCard component ke props ke liye ek Interface
interface StatCardProps {
  icon: React.ReactNode;
  title: string;
  value: number | undefined;
  color: string;
}

// Verifiable user ke liye ek Interface
interface VerifiableUser {
    _id: string;
    name: string;
    email: string;
    role: 'guide' | 'seller';
    isVerified: boolean;
}

// Helper component for stat cards
const StatCard: React.FC<StatCardProps> = ({ icon, title, value, color }) => (
  <div className="bg-white rounded-lg shadow p-6 flex items-center space-x-4">
    <div className={`bg-${color}-100 p-3 rounded-lg`}>
      {React.cloneElement(icon as React.ReactElement, { className: `h-6 w-6 text-${color}-600` })}
    </div>
    <div>
      <p className="text-sm text-gray-600">{title}</p>
      <p className="text-2xl font-bold text-gray-900">{value ?? '0'}</p>
    </div>
  </div>
);


const AdminDashboard: React.FC = () => {
    const { user, token } = useAuth();
    const [stats, setStats] = useState<StatsData | null>(null);
    const [verifiableUsers, setVerifiableUsers] = useState<VerifiableUser[]>([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState('');
    const [activeTab, setActiveTab] = useState('analytics');

    const fetchDashboardData = async () => {
        setLoading(true);
        try {
            const [statsRes, usersRes] = await Promise.all([
                fetch('http://localhost:5000/api/analytics/stats', { headers: { 'x-auth-token': token || '' } }),
                fetch('http://localhost:5000/api/admin/verifiable-users', { headers: { 'x-auth-token': token || '' } })
            ]);
            if (statsRes.ok) setStats(await statsRes.json());
            if (usersRes.ok) setVerifiableUsers(await usersRes.json());
        } catch (error) {
            console.error("Error fetching admin data:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (token) {
            fetchDashboardData();
        }
    }, [token]);

    const handleVerifyUser = async (userId: string) => {
        setMessage('');
        try {
            const response = await fetch(`http://localhost:5000/api/admin/verify/${userId}`, {
                method: 'PUT',
                headers: { 'x-auth-token': token || '' }
            });
            if (response.ok) {
                setMessage('User verified successfully!');
                fetchDashboardData(); // Refresh the list
            } else {
                setMessage('Verification failed.');
            }
        } catch (error) {
            setMessage('An error occurred.');
        }
    };

    const pieData = stats ? [
      { name: 'Tourists', value: stats.touristCount },
      { name: 'Guides', value: stats.guideCount },
      { name: 'Sellers', value: stats.sellerCount },
    ] : [];

    const COLORS = ['#10B981', '#3B82F6', '#F59E0B'];

    // <<-- YEH NAYA CUSTOM LABEL FUNCTION HAI -->>
    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, name }: any) => {
        const RADIAN = Math.PI / 180;
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                {`${name} ${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };

    if (loading) {
      return <div className="flex justify-center items-center h-screen">Loading Admin Panel...</div>;
    }
    
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-xl text-white p-8 mb-8">
                <h1 className="text-3xl font-bold">Admin Control Panel</h1>
                <p className="text-gray-300">Welcome, {user?.name}.</p>
            </div>

            <div className="bg-white rounded-lg shadow-sm mb-8">
                <nav className="-mb-px flex space-x-8 px-6 border-b">
                    <button onClick={() => setActiveTab('analytics')} className={`py-4 px-1 border-b-2 font-medium ${activeTab === 'analytics' ? 'border-gray-800 text-gray-900' : 'border-transparent text-gray-500 hover:text-gray-700'}`}>Analytics</button>
                    <button onClick={() => setActiveTab('verification')} className={`py-4 px-1 border-b-2 font-medium ${activeTab === 'verification' ? 'border-gray-800 text-gray-900' : 'border-transparent text-gray-500 hover:text-gray-700'}`}>Verification</button>
                </nav>
            </div>

            {activeTab === 'analytics' && (
              <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <StatCard icon={<Users />} title="Total Users" value={stats?.totalUsers} color="indigo" />
                  <StatCard icon={<UserCheck />} title="Tourists" value={stats?.touristCount} color="emerald" />
                  <StatCard icon={<Briefcase />} title="Guides" value={stats?.guideCount} color="blue" />
                  <StatCard icon={<ShoppingCart />} title="Sellers" value={stats?.sellerCount} color="amber" />
                </div>
                <div className="bg-white rounded-lg shadow p-6">
                   <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                     <TrendingUp className="mr-2" /> User Distribution
                   </h2>
                  <ResponsiveContainer width="100%" height={400}>
                     <PieChart>
                      <Pie 
                        data={pieData} 
                        cx="50%" 
                        cy="50%" 
                        labelLine={false} 
                        outerRadius={150} 
                        fill="#8884d8" 
                        dataKey="value" 
                        // <<-- NAYE FUNCTION KO YAHAN USE KIYA GAYA HAI -->>
                        label={renderCustomizedLabel}
                      >
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}

            {activeTab === 'verification' && (
                <div className="bg-white p-6 rounded-lg shadow">
                    <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                        <Users className="mr-2"/> Guide & Seller Verification
                    </h2>
                    {message && <p className={`text-center p-3 rounded-md mb-4 ${message.includes('successfully') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{message}</p>}
                    <div className="space-y-4">
                        {verifiableUsers.length > 0 ? verifiableUsers.map(u => (
                            <div key={u._id} className="flex items-center justify-between p-4 border rounded-lg">
                                <div>
                                    <p className="font-bold">{u.name} <span className="text-xs font-normal text-gray-500 capitalize">({u.role})</span></p>
                                    <p className="text-sm text-gray-600">{u.email}</p>
                                </div>
                                {u.isVerified ? (
                                    <span className="flex items-center text-green-600 font-semibold"><ShieldCheck className="mr-2"/> Verified</span>
                                ) : (
                                    <button onClick={() => handleVerifyUser(u._id)} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">Verify</button>
                                )}
                            </div>
                        )) : <p>No users are currently pending verification.</p>}
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;