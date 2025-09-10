import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Users, UserCheck, Briefcase, ShoppingCart, TrendingUp, Shield } from 'lucide-react';

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

// Helper component for stat cards (ab TypeScript types ke saath)
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
  const { user } = useAuth();
  const [stats, setStats] = useState<StatsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/analytics/stats');
        if (response.ok) {
          const data = await response.json();
          setStats(data);
        } else {
          console.error("Failed to fetch stats");
        }
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const pieData = stats ? [
    { name: 'Tourists', value: stats.touristCount },
    { name: 'Guides', value: stats.guideCount },
    { name: 'Sellers', value: stats.sellerCount },
  ] : [];

  const COLORS = ['#10B981', '#3B82F6', '#F59E0B'];

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading Admin Panel...</div>;
  }

  // Custom label renderer function
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index, name }: any) => {
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

  return (
    // Navbar yahan se hata diya gaya hai kyunki MainLayout ise pehle se dikha raha hai
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-xl text-white p-8 mb-8">
        <div className="flex items-center space-x-4">
          <Shield size={40} />
          <div>
            <h1 className="text-3xl font-bold">Admin Control Panel</h1>
            <p className="text-gray-300">Welcome, {user?.name}. Monitoring Jharkhand Tourism Platform.</p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard icon={<Users />} title="Total Users" value={stats?.totalUsers} color="indigo" />
        <StatCard icon={<UserCheck />} title="Tourists" value={stats?.touristCount} color="emerald" />
        <StatCard icon={<Briefcase />} title="Guides" value={stats?.guideCount} color="blue" />
        <StatCard icon={<ShoppingCart />} title="Sellers" value={stats?.sellerCount} color="amber" />
      </div>

      {/* Charts */}
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
  );
};

export default AdminDashboard;