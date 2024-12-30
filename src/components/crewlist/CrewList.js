import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import "./CrewList.css";

function CrewList() {
  const [crewData, setCrewData] = useState([]);

  useEffect(() => {
    const apiUrl = "https://localhost:7044/api/users";

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        if (data.isSuccess) {
          const transformedData = data.result.map((user) => ({
            userId: user.userId,
            name: user.username,
            role: user.role || "Unknown", // Default to "Unknown" if role is empty
            profileImage: user.profileImage
              ? `https://localhost:7044${user.profileImage}` // Construct full image URL
              : "", // Default to empty if no image is available
          }));
          setCrewData(transformedData);
        } else {
          console.error("Failed to fetch users:", data.message);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div className="crew-list-sections">
      <h3>Crew ({crewData.length} members)</h3>
      <ul className="crew-member-list">
        {crewData.map((member) => (
          <li className="crew-member" key={member.userId}>
            <div className="member-info">
              <div className="avatar">
                {member.profileImage ? (
                  <img
                    src={member.profileImage}
                    alt={`${member.name}'s profile`}
                  />
                ) : (
                  <div className="avatar-placeholder">No Image</div>
                )}
              </div>
              <div className="member-details">
                <p className="member-name">{member.name}</p>
                <p className="member-role">{member.role}</p>
              </div>
            </div>
            <button className="remove-btns">-</button>
          </li>
        ))}
      </ul>
      <button className="add-btn-crew">
        <FontAwesomeIcon icon={faUserPlus} className="add-btn-icon" />
        Add new members
      </button>
    </div>
  );
}

export default CrewList;
