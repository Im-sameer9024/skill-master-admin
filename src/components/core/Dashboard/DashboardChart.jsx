import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const DashboardChart = () => {
  const data = [
    { month: 'Jan', users: 1200, orders: 800, reviews: 300, plans: 150 },
    { month: 'Feb', users: 1900, orders: 1200, reviews: 450, plans: 200 },
    { month: 'Mar', users: 1500, orders: 1000, reviews: 350, plans: 180 },
    { month: 'Apr', users: 2200, orders: 1500, reviews: 600, plans: 250 },
    { month: 'May', users: 2800, orders: 1800, reviews: 750, plans: 300 },
    { month: 'Jun', users: 3500, orders: 2200, reviews: 900, plans: 400 },
    { month: 'Jul', users: 4200, orders: 2600, reviews: 1100, plans: 500 },
    { month: 'Aug', users: 3800, orders: 2400, reviews: 950, plans: 450 },
    { month: 'Sep', users: 4500, orders: 2900, reviews: 1200, plans: 550 },
    { month: 'Oct', users: 5200, orders: 3300, reviews: 1400, plans: 600 },
    { month: 'Nov', users: 5800, orders: 3700, reviews: 1600, plans: 700 },
    { month: 'Dec', users: 6500, orders: 4200, reviews: 1800, plans: 800 },
  ];

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg my-10">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Monthly Analytics - Bar Chart</h2>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="users" fill="#3b82f6" name="Users" radius={[4, 4, 0, 0]} />
          <Bar dataKey="orders" fill="#10b981" name="Orders" radius={[4, 4, 0, 0]} />
          <Bar dataKey="reviews" fill="#f59e0b" name="Reviews" radius={[4, 4, 0, 0]} />
          <Bar dataKey="plans" fill="#8b5cf6" name="Plans" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DashboardChart;