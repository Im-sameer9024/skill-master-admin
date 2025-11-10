/* eslint-disable react-hooks/exhaustive-deps */
// components/QuillEditor/QuillEditor.jsx
import React, { useEffect, useRef } from "react";
// import Quill from "quill";

import ReactQuill, { Quill } from "react-quill";
import "quill/dist/quill.snow.css";
import ImageResize from "quill-image-resize-module-react"; // Use the correct package name
import "./QuillEditor.css";

// Register the image resize module
Quill.register("modules/imageResize", ImageResize);

const QuillEditor = ({
  value,
  onChange,
  placeholder = "Write something amazing...",
  readOnly = false,
}) => {
  const quillRef = useRef(null);
  const editorRef = useRef(null);

  useEffect(() => {
    if (editorRef.current && !quillRef.current) {
      const modules = {
        toolbar: readOnly
          ? false
          : [
              [{ header: [1, 2, 3, 4, 5, 6, false] }],
              [{ font: [] }],
              [{ size: ["small", false, "large", "huge"] }],
              ["bold", "italic", "underline", "strike"],
              [{ color: [] }, { background: [] }],
              [{ script: "sub" }, { script: "super" }],
              [{ list: "ordered" }, { list: "bullet" }],
              [{ indent: "-1" }, { indent: "+1" }],
              [{ align: [] }],
              ["blockquote", "code-block"],
              ["link", "image", "video"],
              ["clean"],
            ],
        clipboard: {
          matchVisual: false,
        },
      };

      // Only add imageResize if not readOnly
      if (!readOnly) {
        modules.imageResize = {
          parchment: Quill.import("parchment"),
          modules: ["Resize", "DisplaySize", "Toolbar"],
        };
      }

      // Initialize Quill editor with image resize
      quillRef.current = new Quill(editorRef.current, {
        theme: "snow",
        modules: modules,
        formats: [
          "header",
          "font",
          "size",
          "bold",
          "italic",
          "underline",
          "strike",
          "color",
          "background",
          "script",
          "list",
          "indent",
          "align",
          "blockquote",
          "code-block",
          "link",
          "image",
          "video",
        ],
        placeholder: placeholder,
        readOnly: readOnly,
      });

      // Set initial content
      if (value) {
        quillRef.current.root.innerHTML = value;
      }

      // Add text change handler only if not readOnly
      if (!readOnly && onChange) {
        quillRef.current.on("text-change", () => {
          const content = quillRef.current.root.innerHTML;
          onChange(content);
        });
      }
    }

    return () => {
      // Cleanup if needed
    };
  }, [readOnly, placeholder, onChange]);

  // Update content when value prop changes
  useEffect(() => {
    if (quillRef.current && value !== undefined) {
      const currentContent = quillRef.current.root.innerHTML;
      if (currentContent !== value) {
        quillRef.current.root.innerHTML = value;
      }
    }
  }, [value]);

  return (
    <div className={`quill-editor-container ${readOnly ? "read-only" : ""}`}>
      <div ref={editorRef}></div>
    </div>
  );
};

export default QuillEditor;
