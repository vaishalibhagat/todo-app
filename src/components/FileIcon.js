import React from "react";
import { FaFilePdf, FaFileWord, FaFileExcel, FaFileAlt } from "react-icons/fa"; // Import icons
import "./style.css";

function FileIcon({ type }) {
  let Icon;
  let color;

  // Determine the icon and color based on file type
  switch (type) {
    case "pdf":
      Icon = FaFilePdf;
      color = "#d32f2f"; // Red for PDF
      break;
    case "word":
      Icon = FaFileWord;
      color = "#1e88e5"; // Blue for Word
      break;
    case "excel":
      Icon = FaFileExcel;
      color = "#43a047"; // Green for Excel
      break;
    default:
      Icon = FaFileAlt;
      color = "#757575"; // Gray for other file types
      break;
  }

  return (
    <div className="file-icon" style={{ color }}>
      <Icon className="file-icon-image" />
      {/* <span className="file-icon-text">{type.toUpperCase()}</span> */}
    </div>
  );
}

export default FileIcon;
