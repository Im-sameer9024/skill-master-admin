import React, { useState } from "react";
import Logo from "../../../assets/logo.png";
import SidebarLinks from "./SidebarLinks";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";

const Sidebar = ({ path }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div 
      className={`bg-lightSky h-screen relative transition-all duration-300 ease-in-out ${
        isCollapsed ? "w-16" : "w-64"
      }`}
    >
      {/*----------- logo ------------ */}
      <div className={`mx-auto mt-5 transition-all duration-300 ${
        isCollapsed ? "w-10 px-2" : "w-22 px-4"
      }`}>
        <img 
          src={Logo} 
          alt="logo" 
          className="w-full h-full object-cover transition-all duration-300" 
        />
      </div>

      {/*------------------ all links ---------------------- */}
      <div className={`flex flex-col gap-2 mt-6 font-fontHeading ${
        isCollapsed ? "px-2" : "px-4"
      }`}>
        <SidebarLinks path={path} isCollapsed={isCollapsed} />
      </div>

      {/* Toggle Button */}
      <button
        onClick={toggleSidebar}
        className="absolute -right-3 top-20 bg-white border border-gray-300 rounded-full p-1 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-110 hover:cursor-pointer"
      >
        {isCollapsed ? (
          <ChevronRight className="w-4 h-4 text-gray-600" />
        ) : (
          <ChevronLeft className="w-4 h-4 text-gray-600" />
        )}
      </button>
    </div>
  );
};

export default Sidebar;