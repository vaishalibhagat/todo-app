import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFile } from "@fortawesome/free-solid-svg-icons";
import { FaFilePdf, FaFileWord, FaFileExcel, FaFileAlt } from "react-icons/fa";
import "./Resources.css";

const resourcesData = [
  {
    type: "XLS",
    name: "Document Name",
    description: "Brief description of the document.",
  },
  {
    type: "PDF",
    name: "Document Name",
    description: "Brief description of the document.",
  },
  {
    type: "DOC",
    name: "Document Name",
    description: "Brief description of the document.",
  },
  // Add more resources as needed
];

// Function to render file icon based on type
function getFileIcon(type) {
  let Icon;
  let color;

  switch (type.toLowerCase()) {
    case "pdf":
      Icon = FaFilePdf;
      color = "#d32f2f"; // Red for PDF
      break;
    case "doc":
      Icon = FaFileWord;
      color = "#1e88e5"; // Blue for Word
      break;
    case "xls":
      Icon = FaFileExcel;
      color = "#43a047"; // Green for Excel
      break;
    default:
      Icon = FaFileAlt;
      color = "#757575"; // Gray for other file types
      break;
  }

  return <Icon style={{ color }} className="file-icon-image" />;
}

function Resources() {
  return (
    <div className="resources-sections">
      <h3>Resources</h3>
      <ul className="resource-list">
        {resourcesData.map((resource, index) => (
          <li key={index} className="resource-item">
            <div className="file-icon">{getFileIcon(resource.type)}</div>
            <div className="resource-details">
              <p className="resource-name">{resource.name}</p>
              <p className="resource-description">{resource.description}</p>
            </div>
            <button className="remove-btns">-</button>
          </li>
        ))}
      </ul>
      <button className="add-btn-res">
        <FontAwesomeIcon icon={faFile} className="add-btn-icon" />
        Add new resources
      </button>
    </div>
  );
}

export default Resources;
