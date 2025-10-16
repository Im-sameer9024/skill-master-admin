/* eslint-disable no-unused-vars */

import React, { useState } from "react";
import Input from "../../ui/Input";
import { Avatar, Button, Divider } from "@mui/material";
import { Logout, Person, Email, Settings } from "@mui/icons-material";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
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
    <div className="bg-gray-100 py-4 px-10 w-full flex  items-center justify-end relative">
      

      {/* avatar section with hover dropdown */}
      <div 
        className="relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="hover:cursor-pointer  ">
          <Avatar 
            alt="Remy Sharp" 
            src="/static/images/avatar/1.jpg"
            className="transition-transform duration-200 hover:scale-110"
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
              className="absolute right-0 top-14 bg-white shadow-xl rounded-xl border border-gray-200 min-w-80 z-50"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {/* User header */}
              <div className="bg-lightSky p-4 text-black rounded-t-xl">
                <div className="flex items-center space-x-3">
                  <Avatar 
                    alt="Remy Sharp" 
                    src="/static/images/avatar/1.jpg"
                    className="w-12 h-12 border-2 border-white shadow-md"
                  />
                  <div>
                    <h3 className="font-semibold text-lg">Remy Sharp</h3>
                    <p className=" text-sm text-smallHeading">Administrator</p>
                  </div>
                </div>
              </div>

              {/* User details */}
              <div className="p-4 space-y-3">
                <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                  <Person className="text-gray-400 text-xl" />
                  <div>
                    <p className="text-xs text-smallHeading">Full Name</p>
                    <p className="text-sm font-medium text-content">Remy Sharp</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                  <Email className="text-gray-400 text-xl" />
                  <div>
                    <p className="text-xs text-smallHeading">Email Address</p>
                    <p className="text-sm font-medium text-content">remy.sharp@example.com</p>
                  </div>
                </div>
              </div>

              <Divider />

              {/* Actions */}
              <div className="p-2">
                <Button
                  fullWidth
                  startIcon={<Settings />}
                  onClick={handleSettings}
                  className="justify-start px-3 py-2 !text-content hover:bg-smallHeading rounded-lg transition-colors duration-200"
                  sx={{ 
                    justifyContent: 'flex-start',
                    textTransform: 'none',
                    fontSize: '0.875rem',
                    fontWeight: 500,
                  }}
                >
                  Account Settings
                </Button>
              </div>

              <Divider />

              {/* Logout button */}
              <div className="p-3">
                <Button
                  fullWidth
                  startIcon={<Logout />}
                  onClick={handleLogout}
                  variant="outlined"
                  color="error"
                  className="rounded-lg transition-all duration-200 hover:shadow-md"
                  sx={{
                    textTransform: 'none',
                    fontWeight: 600,
                    borderWidth: '2px',
                    '&:hover': {
                      borderWidth: '2px',
                    }
                  }}
                >
                  Logout
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