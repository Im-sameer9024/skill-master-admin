/* eslint-disable no-unused-vars */
import React from "react";
import { AnimatePresence, motion } from "framer-motion";
const Modal = ({ openModel, content, width }) => {
  const popupVariables = {
    hidden: { opacity: 0, scale: 1 },
    visible: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 1 },
  };

  return (
    <AnimatePresence>
      {openModel && (
        <motion.div
          className="fixed inset-0 bg-black/40  flex justify-center items-center z-50 "
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className={`bg-white p-4  rounded-lg ${width} `}
            variants={popupVariables}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.3 }}
          >
            {content}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
