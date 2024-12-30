import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComments } from "@fortawesome/free-solid-svg-icons";
import CrewList from "./components/crewlist/CrewList";
import ToDoList from "./components/firsttodolist/PersonalTodo";
import Chat from "./components/chat/Chat";
import ProductDetails from "./components/productdetails/ProductDetails";
import "./components/style.css";
import ToDoSection from "./components/todosection/GroupTodo";
import MilestoneList from "./components/MilestoneList";
import TaskList from "./components/tasklist/AssignTodo";
import Resources from "./components/resources/Resources";
import PersonalTodo from "./components/firsttodolist/PersonalTodo";
import GroupTodo from "./components/todosection/GroupTodo";
import AssignTodo from "./components/tasklist/AssignTodo";
import UserCrewList from "./components/crewlist/UserCrewList";
import UserGroupTodo from "./components/todosection/UserGroupTodo";

function App() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [userRole, setUserRole] = useState("user"); // "admin" or "user"

  useEffect(() => {
    // Fetch user role from API, context, or storage
    const fetchUserRole = () => {
      const role = localStorage.getItem("userRole") || "user"; // Replace with API call if needed
      setUserRole(role);
    };
    fetchUserRole();
  }, []);

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  return (
    <div className="container">
      {userRole === "admin" ? (
        // Admin-Specific Layout
        <div className="main-content admin-container">
          <div className="left-sidebar">
            <div className="product-details-section">
              <ProductDetails />
            </div>
            <div className="crew-list-section">
              <CrewList />
            </div>
            <div className="resources-section">
              <Resources />
            </div>
          </div>

          <div className={`chat-section ${isChatOpen ? "open" : ""}`}>
            <Chat />
          </div>

          <div className="right-sidebar">
            <h2>Admin Dashboard</h2>
            <PersonalTodo />
            <GroupTodo />
            <AssignTodo />
          </div>
        </div>
      ) : (
        // User-Specific Layout
        <div className="main-content user-container">
          <div className="left-sidebar">
            <div className="product-details-section">
              <ProductDetails />
            </div>
            <div className="crew-list-section">
              <CrewList />
            </div>
            <div className="resources-section">
              <Resources />
            </div>
          </div>

          <div className={`chat-section ${isChatOpen ? "open" : ""}`}>
            <Chat />
          </div>

          <div className="right-sidebar">
            <h2>User Dashboard</h2>
            <PersonalTodo />
            <UserGroupTodo />
            <AssignTodo />
          </div>
        </div>
      )}

      {/* Floating chat icon */}
      <div className="chat-icon" onClick={toggleChat}>
        <FontAwesomeIcon icon={faComments} className="chat-icon-fa" />
      </div>
    </div>
  );
}

export default App;
