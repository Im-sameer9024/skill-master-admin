import DashboardHeader from "../../components/core/Dashboard/DashboardHeader";
import DashboardChart from "../../components/core/Dashboard/DashboardChart";

const Dashboard = () => {
  return (
    <div className=" p-4 w-full h-full">
        <DashboardHeader />
        <DashboardChart/>
    </div>
  );
};

export default Dashboard;
