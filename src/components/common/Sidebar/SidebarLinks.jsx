import React from "react";
import { SidebarData } from "../../../constants/SidebarData.jsx";
import { Link } from "react-router-dom";

const SidebarLinks = () => {
  return (
    <>
      {SidebarData.map((link, i) => {
        return (
          <Link key={i} to={link.path} className=" bg-gray-200 w-full rounded-lg p-1 flex items-center gap-2">
            <span>{link.icon}</span>
            <span>{link.title}</span>
          </Link>
        );
      })}
    </>
  );
};

export default SidebarLinks;
