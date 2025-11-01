// components/QuillEditor/QuillDisplay.jsx
import React from "react";
import "./QuillDisplay.css";

const QuillDisplay = ({ content, className = "" }) => {
  // Basic sanitization - for production use DOMPurify
  const sanitizeHTML = (html) => {
    return html || "";
  };

  return (
    <div className={`quill-display ${className}`}>
      <div
        className="ql-snow"
        style={{ border: "none", background: "transparent" }}
      >
        <div
          className="ql-editor"
          style={{
            padding: 0,
            fontSize: "inherit",
            fontFamily: "inherit",
            border: "none",
          }}
          dangerouslySetInnerHTML={{ __html: sanitizeHTML(content) }}
        />
      </div>
    </div>
  );
};

export default QuillDisplay;
