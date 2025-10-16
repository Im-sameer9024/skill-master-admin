import React, { useState } from "react";
import { SidebarData } from "../../../constants/SidebarData.jsx";
import { Link } from "react-router-dom";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";

const SidebarLinks = ({ path, isCollapsed }) => {
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
            {/* Main Link */}
            <div
              className={`w-full rounded-lg flex items-center justify-between transition-all duration-300 ease-in-out hover:bg-white group ${
                isActive ? "bg-white shadow-sm" : ""
              } ${
                isCollapsed ? "py-3 px-2 justify-center" : "py-3 px-4"
              }`}
            >
              <Link
                to={link.path}
                className={`flex items-center gap-3 transition-all duration-300 ${
                  isCollapsed ? "justify-center" : "flex-1"
                }`}
                title={isCollapsed ? link.title : ""} // Show tooltip when collapsed
              >
                <span
                  className={`transition-all duration-300 ease-in-out ${
                    isActive 
                      ? "text-darkSky transform scale-110" 
                      : "text-content group-hover:text-darkSky"
                  }`}
                >
                  {link.icon}
                </span>
                {!isCollapsed && (
                  <span
                    className={`transition-all duration-300 ease-in-out text-sm ${
                      isActive 
                        ? "text-darkSky font-semibold" 
                        : "text-content group-hover:text-darkSky"
                    }`}
                  >
                    {link.title}
                  </span>
                )}
              </Link>

              {/* Dropdown Arrow - Only show when not collapsed */}
              {hasNestedLinks && !isCollapsed && (
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

            {/* Nested Links - Only show when not collapsed and dropdown is open */}
            {!isCollapsed && hasNestedLinks && (
              <div
                className={`transition-all duration-500 ease-in-out overflow-hidden ${
                  isDropdownOpen 
                    ? 'max-h-fit opacity-100 translate-y-0' 
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
                        className={`w-full rounded-lg py-2 px-3 text-nowrap flex items-center gap-3 transition-all duration-300 ease-in-out group ${
                          isNestedActive 
                            ? "bg-white" 
                            : "hover:bg-white"
                        }`}
                      >
                        <span
                          className={`transition-all duration-300 ease-in-out text-sm ${
                            isNestedActive 
                              ? "text-darkSky transform scale-110" 
                              : "text-content group-hover:text-darkSky"
                          }`}
                        >
                          {nestedLink.icon}
                        </span>
                        <span
                          className={`transition-all duration-300 ease-in-out text-sm ${
                            isNestedActive 
                              ? "text-darkSky font-medium" 
                              : "text-content group-hover:text-darkSky"
                          }`}
                        >
                          {nestedLink.title}
                        </span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default SidebarLinks;