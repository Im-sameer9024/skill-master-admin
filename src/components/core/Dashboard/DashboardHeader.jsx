import { useDashboardData } from "@/pages/Dashboard/hooks/useDashboard";
import React from "react";
import Spinner from "@/components/common/Spinner";

const DashboardHeader = () => {
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
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8">
        <p className="text-red-800 font-medium">Error loading dashboard data</p>
        <p className="text-red-600 text-sm mt-1">
          {DashboardError.response?.data?.message || "Please try again later"}
        </p>
      </div>
    );
  }

  const stats = [
    {
      title: "Total Users",
      value: DashboardData?.data?.totalUsers || 0,
      icon: "👥",
      color: "bg-blue-50 border-blue-200",
      textColor: "text-blue-600",
    },
    {
      title: "Total Plans",
      value: DashboardData?.data?.totalPlans || 0,
      icon: "📋",
      color: "bg-green-50 border-green-200",
      textColor: "text-green-600",
    },
    {
      title: "Total Blogs",
      value: DashboardData?.data?.totalBlogs || 0,
      icon: "📝",
      color: "bg-purple-50 border-purple-200",
      textColor: "text-purple-600",
    },
    {
      title: "Total Purchases",
      value: DashboardData?.data?.totalPurchases || 0,
      icon: "💰",
      color: "bg-orange-50 border-orange-200",
      textColor: "text-orange-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-8">
      {stats.map((stat, index) => (
        <div
          key={index}
          className={`bg-white rounded-xl shadow-sm border-2 ${stat.color} p-6 hover:shadow-md transition-all duration-300 hover:scale-105`}
        >
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-600 mb-1">
                {stat.title}
              </p>
              <h2 className={`text-3xl font-bold ${stat.textColor} mb-2`}>
                {stat.value.toLocaleString()}
              </h2>
            </div>
            <div className="text-4xl opacity-80">{stat.icon}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardHeader;
