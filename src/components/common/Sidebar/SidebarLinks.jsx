import React, { useState } from "react";
import { SidebarData } from "../../../constants/SidebarData.jsx";
import { Link, useLocation } from "react-router-dom";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";

const SidebarLinks = () => {
  const path = useLocation().pathname;
  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleDropdown = (index) => {
    setOpenDropdown(openDropdown === index ? null : index);
  };

  const isLinkActive = (linkPath, nestedLinks = []) => {
    return path === linkPath || nestedLinks.some(nested => path === nested.path);
  };

  return (
    <div className="space-y-1">
      {SidebarData.map((link, i) => {
        const hasNestedLinks = link.others && link.others.length > 0;
        const isActive = isLinkActive(link.path, link.others);
        const isDropdownOpen = openDropdown === i;

        return (
          <div key={i} className="w-full">
            {/* Main Link - Consistent padding for all */}
            <div
              className={`w-full rounded-lg py-3 px-4 flex items-center justify-between transition-all duration-300 ease-in-out hover:bg-white group ${
                isActive ? "bg-white shadow-sm" : ""
              }`}
            >
              <Link
                to={link.path}
                className="flex items-center gap-3 flex-1"
              >
                <span
                  className={`transition-all duration-300 ease-in-out ${
                    isActive 
                      ? "text-darkSky transform scale-110" 
                      : "text-gray-600 group-hover:text-darkSky"
                  }`}
                >
                  {link.icon}
                </span>
                <span
                  className={`transition-all duration-300 ease-in-out text-sm ${
                    isActive 
                      ? "text-darkSky font-semibold" 
                      : "text-gray-700 group-hover:text-darkSky"
                  }`}
                >
                  {link.title}
                </span>
              </Link>

              {/* Dropdown Arrow with smooth rotation */}
              {hasNestedLinks && (
                <button
                  onClick={() => toggleDropdown(i)}
                  className={`p-1 rounded transition-all duration-300 ease-in-out hover:bg-gray-100 ${
                    isActive ? 'bg-gray-50' : ''
                  }`}
                >
                  <KeyboardArrowDown 
                    className={`transition-all duration-300 ease-in-out ${
                      isDropdownOpen 
                        ? 'transform rotate-180 text-darkSky' 
                        : 'text-gray-500'
                    } ${isActive ? 'text-darkSky' : ''}`}
                  />
                </button>
              )}
            </div>

            {/* Nested Links with smooth height transition */}
            <div
              className={`transition-all duration-500 ease-in-out overflow-hidden ${
                isDropdownOpen 
                  ? 'max-h-48 opacity-100 translate-y-0' 
                  : 'max-h-0 opacity-0 -translate-y-2'
              }`}
            >
              <div className="ml-6 mt-1 space-y-1 border-gray-100 pl-4 py-1">
                {link.others?.map((nestedLink, nestedIndex) => {
                  const isNestedActive = path === nestedLink.path;
                  
                  return (
                    <Link
                      key={nestedIndex}
                      to={nestedLink.path}
                      className={`w-full rounded-lg py-2 px-3 flex items-center gap-3 transition-all duration-300 ease-in-out group ${
                        isNestedActive 
                          ? "bg-white " 
                          : " hover:bg-white"
                      }`}
                    >
                      <span
                        className={`transition-all duration-300 ease-in-out text-sm ${
                          isNestedActive 
                            ? "text-darkSky transform scale-110" 
                            : "text-smallHeading group-hover:text-darkSky"
                        }`}
                      >
                        {nestedLink.icon}
                      </span>
                      <span
                        className={`transition-all duration-300 ease-in-out text-sm ${
                          isNestedActive 
                            ? "text-darkSky font-medium" 
                            : " text-smallHeading group-hover:text-darkSky"
                        }`}
                      >
                        {nestedLink.title}
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SidebarLinks;