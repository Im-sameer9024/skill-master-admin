/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaUser,
  FaEnvelope,
  FaCog,
  FaSignOutAlt,
  FaChevronDown,
} from "react-icons/fa";
import { Button } from "@/components/ui/button";

const Navbar = ({ path }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleLogout = () => {
    console.log("Logging out...");
  };

  const handleSettings = () => {
    console.log("Opening settings...");
  };

  const dropdownVariants = {
    hidden: {
      opacity: 0,
      y: -10,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.2,
        ease: "easeOut",
      },
    },
    exit: {
      opacity: 0,
      y: -10,
      scale: 0.95,
      transition: {
        duration: 0.15,
        ease: "easeIn",
      },
    },
  };

  return (
    <div className="bg-gray-100 font-fontContent py-4 px-10 w-full flex items-center justify-end relative">
      {/* Avatar section with hover dropdown */}
      <div
        className="relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="hover:cursor-pointer flex items-center space-x-2">
          <div className="w-10 h-10 bg-darkSky rounded-full flex items-center justify-center text-white font-semibold text-sm">
            RS
          </div>
          <FaChevronDown
            className={`text-gray-600 text-xs transition-transform duration-200 ${
              isHovered ? "rotate-180" : ""
            }`}
          />
        </div>

        {/* User Info Dropdown */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              variants={dropdownVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="absolute right-0 top-14 bg-white shadow-xl rounded-xl border border-gray-200 w-80 z-50"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {/* User header */}
              <div className="bg-darkSky p-4 text-white rounded-t-xl">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-gray-500 font-bold text-lg border-2 border-white shadow-lg">
                    RS
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Remy Sharp</h3>
                    <p className="text-white text-sm">Admin</p>
                  </div>
                </div>
              </div>

              {/* User details */}
              <div className="p-4 space-y-3">
                <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                  <FaUser className="text-gray-400 text-lg" />
                  <div>
                    <p className="text-xs text-gray-500">Full Name</p>
                    <p className="text-sm font-medium text-gray-800">
                      Remy Sharp
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                  <FaEnvelope className="text-gray-400 text-lg" />
                  <div>
                    <p className="text-xs text-gray-500">Email Address</p>
                    <p className="text-sm font-medium text-gray-800">
                      remy.sharp@example.com
                    </p>
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div className="border-t border-gray-200"></div>

              {/* Logout button */}
              <div className="p-3">
                <Button onClick={handleLogout} className="bg-red-400 hover:bg-red-500 hover:cursor-pointer">
                  <FaSignOutAlt />
                  <span>Logout</span>
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Navbar;
