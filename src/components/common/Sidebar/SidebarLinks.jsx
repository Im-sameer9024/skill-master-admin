import React, { useState } from "react";
import { SidebarData } from "../../../constants/SidebarData.jsx";
import { Link } from "react-router-dom";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const SidebarLinks = ({ path, isCollapsed }) => {
  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleDropdown = (index) => {
    setOpenDropdown(openDropdown === index ? null : index);
  };

  const isLinkActive = (linkPath, nestedLinks = []) => {
    // Check if current path exactly matches the link path
    if (path === linkPath) return true;

    // Check if any nested link path matches exactly
    if (nestedLinks.some((nested) => path === nested.path)) return true;

    // Special case for listening routes - if path starts with /listening
    // and linkPath is the base listening path
    if (linkPath === "/listening" && path.startsWith("/listening")) {
      return true;
    }

    // Check if any nested listening paths match the pattern
    if (
      nestedLinks.some(
        (nested) =>
          nested.path.startsWith("/listening") && path.startsWith("/listening")
      )
    ) {
      return true;
    }

    return false;
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
              className={`w-full rounded-lg flex items-center justify-between transition-all duration-300 ease-in-out group ${
                isActive
                  ? "bg-white  border border-gray-100"
                  : "hover:bg-white   hover:border-gray-100"
              } ${isCollapsed ? "py-3 px-2 justify-center" : "py-3 px-4"}`}
            >
              <Link
                to={link.path}
                className={`flex items-center gap-3 transition-all duration-300 ${
                  isCollapsed ? "justify-center" : "flex-1"
                }`}
                title={isCollapsed ? link.title : ""}
              >
                <span
                  className={`transition-all duration-300 ease-in-out ${
                    isActive
                      ? "text-darkSky transform scale-110"
                      : "text-black group-hover:text-darkSky"
                  }`}
                >
                  {link.icon}
                </span>
                {!isCollapsed && (
                  <span
                    className={`transition-all duration-300 ease-in-out text-sm ${
                      isActive
                        ? "text-darkSky font-semibold"
                        : "text-black group-hover:text-darkSky"
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
                  className={`p-1 rounded transition-all duration-300 ease-in-out hover:bg-white ${
                    isActive ? "bg-white" : ""
                  }`}
                >
                  {isDropdownOpen ? (
                    <FaChevronUp
                      className={`transition-all duration-300 ease-in-out text-sm ${
                        isActive ? "text-darkSky" : "text-black"
                      }`}
                    />
                  ) : (
                    <FaChevronDown
                      className={`transition-all duration-300 ease-in-out text-sm ${
                        isActive ? "text-darkSky" : "text-black"
                      }`}
                    />
                  )}
                </button>
              )}
            </div>

            {/* Nested Links - Only show when not collapsed and dropdown is open */}
            {!isCollapsed && hasNestedLinks && (
              <div
                className={`transition-all duration-500 ease-in-out overflow-hidden ${
                  isDropdownOpen
                    ? "max-h-96 opacity-100 translate-y-0"
                    : "max-h-0 opacity-0 -translate-y-2"
                }`}
              >
                <div className="ml-6 mt-1 space-y-1 border-l-2 border-blue-100 pl-4 py-2">
                  {link.others?.map((nestedLink, nestedIndex) => {
                    const isNestedActive = path === nestedLink.path;

                    return (
                      <Link
                        key={nestedIndex}
                        to={nestedLink.path}
                        className={`w-full rounded-lg py-2 px-3 text-nowrap flex items-center gap-3 transition-all duration-300 ease-in-out group ${
                          isNestedActive
                            ? "bg-white shadow-sm"
                            : "hover:bg-gray-50"
                        }`}
                      >
                        <span
                          className={`transition-all duration-300 ease-in-out text-sm ${
                            isNestedActive
                              ? "text-darkSky transform scale-110"
                              : "text-black group-hover:text-darkSky"
                          }`}
                        >
                          {nestedLink.icon}
                        </span>
                        <span
                          className={`transition-all duration-300 ease-in-out text-sm ${
                            isNestedActive
                              ? "text-darkSky font-medium"
                              : "text-black group-hover:text-darkSky"
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

            {/* Tooltip for collapsed state */}
            {isCollapsed && hasNestedLinks && (
              <div className="relative">
                <div className="absolute left-14 top-0 z-50 hidden group-hover:block">
                  <div className="bg-gray-800 text-white text-xs rounded py-1 px-2 whitespace-nowrap">
                    {link.title}
                    <div className="absolute -left-1 top-2 w-2 h-2 bg-gray-800 transform rotate-45"></div>
                  </div>
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
