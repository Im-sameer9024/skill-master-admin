import React from "react";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import ImageResize from 'quill-image-resize-module-react';

// Use a specific version of Quill's Parchment
// const Parchment = Quill.import('parchment');

// Register the module with correct configuration
Quill.register('modules/imageResize', ImageResize);
export default function React_Quill_Editor({
  disabled,
  data,
  seteditor,
  editorTitle,
  fieldName,
}) {
  let modules = {
    toolbar: [
      [{ header: "1" }, { header: "2" }, { font: [] }],
      [{ size: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ 'color': [] }, { 'background': [] }],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image", "video"],
      ["clean"],
    ],
    clipboard: {
      matchVisual: false,
    },
    imageResize: {
      parchment: Quill.import('parchment'),
      modules: ['Resize', 'DisplaySize']
    }
  };
  return (
    <>

      <div>{editorTitle} </div>
      <ReactQuill theme="snow" readOnly={disabled}
        className="react-quill"
        modules={modules}
        value={data}
        onChange={(e) => (seteditor((curval) => ({ ...curval, [fieldName]: e })))} />
    </>
  );
}