import { useFetch } from '../../../hooks/useFetch';
import { getDashboardStatsApiCall } from '../../../services/AdminService';

const StatCard = ({ title, value, icon }) => (
  <div className="bg-card p-6 rounded-lg shadow-md flex items-center gap-4">
    <div className="bg-primary/10 p-3 rounded-full text-primary">
      {icon}
    </div>
    <div>
      <p className="text-sm text-text-secondary">{title}</p>
      <p className="text-2xl font-bold text-text-primary">{value}</p>
    </div>
  </div>
);

const AdminDashboardPage = () => {
  const { data: stats, isLoading, error } = useFetch(getDashboardStatsApiCall);

  if (isLoading) return <p>Loading dashboard...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div>
      <h1 className="text-3xl font-bold text-text-primary mb-8">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard 
          title="Total Users" 
          value={stats?.totalUsers || 0}
          icon={
            // --- CORRECTED USERS ICON ---
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          }
        />
        <StatCard 
          title="Total Bookings" 
          value={stats?.totalBookings || 0}
          icon={
            // This icon was correct, but keeping it for consistency
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          }
        />
        <StatCard 
          title="Total Revenue" 
          value={`$${(stats?.totalRevenue || 0).toFixed(2)}`}
          icon={
            // --- CORRECTED REVENUE (DOLLAR) ICON ---
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
               <path strokeLinecap="round" strokeLinejoin="round" d="M12 1L12 23M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H7" />
            </svg>
          }
        />
      </div>
      {/* We can add the 'Most Popular Vehicles' list here later */}
    </div>
  );
};

export default AdminDashboardPage;