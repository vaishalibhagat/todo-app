import React from "react";

const milestoneData = [
  {
    title: "Chat Front-end matching exactly with the design",
    dueDate: "04/04/2024",
  },
  {
    title: "Chat Front-end matching exactly with the design",
    dueDate: "04/04/2024",
  },
  {
    title: "Chat Front-end matching exactly with the design",
    dueDate: "04/04/2024",
  },
];

function MilestoneList() {
  return (
    <div className="milestone-list">
      {milestoneData.map((milestone, index) => (
        <div key={index} className="milestone-item">
          <p className="milestone-title">{milestone.title}</p>
          <p className="milestone-date">Due Date: {milestone.dueDate}</p>
          <div className="milestone-actions">
            <button className="complete-btn">✔️</button>
            <button className="remove-btn">--</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default MilestoneList;
