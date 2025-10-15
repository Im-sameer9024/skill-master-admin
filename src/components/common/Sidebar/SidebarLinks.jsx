import React from "react";
import { SidebarData } from "../../../constants/SidebarData.jsx";
import { Link, useLocation } from "react-router-dom";

const SidebarLinks = () => {
  const path = useLocation().pathname;

  return (
    <>
      {SidebarData.map((link, i) => {
        return (
          <Link
            key={i}
            to={link.path}
            className={` w-full rounded-lg p-1 flex items-center transition-all duration-200 ease-in-out gap-2 ${
              link.path === path ? "bg-white" : ""
            } `}
          >
            <span
              className={` transition-all duration-200 ease-in-out ${
                link.path === path ? "text-darkSky" : "text-black"
              } `}
            >
              {link.icon}
            </span>
            <span
              className={` transition-all duration-200 ease-in-out ${
                link.path === path ? "text-darkSky" : "text-black"
              } `}
            >
              {link.title}
            </span>
          </Link>
        );
      })}
    </>
  );
};

export default SidebarLinks;
