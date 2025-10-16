import React from "react";
import { dashboardHederData, getCardStyles } from "../../../constants/DashboardData";

const DashboardHeader = () => {
 

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 font-fontContent">
      {dashboardHederData.map((item, index) => {
        const styles = getCardStyles(index);
        
        return (
          <div 
            key={index}
            className={`${styles.bg} ${styles.text} rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1`}
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-lg  opacity-90 font-light mb-1">{item.title}</p>
                <h3 className="text-2xl font-bold">{item.value}</h3>
              </div>
              <div className={`${styles.iconBg} p-3 rounded-lg bg-opacity-20`}>
                <span className="text-xl">{item.icon}</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default DashboardHeader;