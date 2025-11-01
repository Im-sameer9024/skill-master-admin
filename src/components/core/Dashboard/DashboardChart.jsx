import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useDashboardData } from "@/pages/Dashboard/hooks/useDashboard";
import Spinner from "@/components/common/Spinner";

const DashboardChart = () => {
  const {
    data: DashboardData,
    isLoading: DashboardLoading,
    error: DashboardError,
  } = useDashboardData();

  // Loading state
  if (DashboardLoading) {
    return (
      <div className="flex justify-center items-center">
        <Spinner />
      </div>
    );
  }

  // Error state
  if (DashboardError) {
    return (
      <div className="bg-white p-6 rounded-xl shadow-lg my-10">
        <div className="text-center py-8">
          <div className="text-red-500 text-4xl mb-4">⚠️</div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Error Loading Chart
          </h3>
          <p className="text-gray-600 mb-4">
            {DashboardError.response?.data?.message ||
              "Failed to load dashboard data"}
          </p>
        </div>
      </div>
    );
  }

  // Prepare chart data from API response
  const chartData = [
    {
      name: "Statistics",
      users: DashboardData?.data?.totalUsers || 0,
      plans: DashboardData?.data?.totalPlans || 0,
      blogs: DashboardData?.data?.totalBlogs || 0,
      purchases: DashboardData?.data?.totalPurchases || 0,
    },
  ];

  // Custom tooltip
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-semibold text-gray-800">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: {entry.value.toLocaleString()}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg my-10">
      <h2 className="text-xl font-bold text-gray-800 mb-2">
        Dashboard Overview
      </h2>

      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={chartData}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Bar
            dataKey="users"
            fill="#3b82f6"
            name="Total Users"
            radius={[4, 4, 0, 0]}
            barSize={60}
          />
          <Bar
            dataKey="plans"
            fill="#10b981"
            name="Total Plans"
            radius={[4, 4, 0, 0]}
            barSize={60}
          />
          <Bar
            dataKey="blogs"
            fill="#f59e0b"
            name="Total Blogs"
            radius={[4, 4, 0, 0]}
            barSize={60}
          />
          <Bar
            dataKey="purchases"
            fill="#8b5cf6"
            name="Total Purchases"
            radius={[4, 4, 0, 0]}
            barSize={60}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DashboardChart;
