import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import "./CrewList.css";

// The CrewList component
function UserCrewList() {
  // State to store the fetched crew data
  const [crewData, setCrewData] = useState([]);

  // Fetch data from the API when the component is mounted
  useEffect(() => {
    // Define the API endpoint
    const apiUrl = "https://localhost:7044/api/users";

    // Fetch data from the API
    fetch(apiUrl)
      .then((response) => response.json()) // Convert response to JSON
      .then((data) => {
        if (data.isSuccess) {
          // Set the fetched data into the state variable
          const transformedData = data.result.map((user) => ({
            name: user.username, // Map username to member name
            role: "Lead - Software Developer", // You can customize the role if available from the API
          }));
          setCrewData(transformedData);
        } else {
          console.error("Failed to fetch users:", data.message);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []); // Empty dependency array ensures this runs only once when the component mounts

  return (
    <div className="crew-list-sections">
      <h3>Crew ({crewData.length} members)</h3>
      <ul className="crew-member-list">
        {crewData.map((member, index) => (
          <li className="crew-member" key={index}>
            <div className="member-info">
              <div className="avatar"></div>
              <div className="member-details">
                <p className="member-name">{member.name}</p>
                <p className="member-role">{member.role}</p>
              </div>
            </div>
            <button className="remove-btns">-</button>
          </li>
        ))}
      </ul>
      {/* <button className="add-btn-crew">
        <FontAwesomeIcon icon={faUserPlus} className="add-btn-icon" />
        Add new members
      </button> */}
    </div>
  );
}

export default UserCrewList;
