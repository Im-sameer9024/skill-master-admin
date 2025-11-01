import DashboardChart from "@/components/core/Dashboard/DashboardChart";
import DashboardHeader from "@/components/core/Dashboard/DashboardHeader";
import React from "react";

const DashboardPage = () => {


  return (
    <div className="w-full text-xl ">
      <DashboardHeader />
      <DashboardChart/>
    </div>
  );
};

export default DashboardPage;
