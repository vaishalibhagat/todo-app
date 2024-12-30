import React, { useEffect, useState } from "react";
import "./TaskList.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

function AssignTodo() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch data from the API
    const fetchTasks = async () => {
      try {
        const response = await fetch(
          "https://localhost:7044/api/todos/GetAllAssignedToDo?groupId=08dd1429-5719-4928-83bd-60649f334c5d"
        );
        console.log(response);
        if (!response.ok) {
          throw new Error("Failed to fetch tasks");
        }
        const data = await response.json();
        if (data.isSuccess) {
          // Map API data to the required structure
          const formattedTasks = data.result.map((task) => ({
            title: task.toDoDescription,
            dueDate: task.dueDate,
            members: task.assignedUsers, // Use assignedUsers here
            isCompleted: task.isCompleted,
          }));
          setTasks(formattedTasks);
        } else {
          setError(data.message || "Failed to retrieve tasks");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="task-section">
      <div className="tasks-list">
        {tasks.map((task, index) => (
          <div key={index}>
            <div className="task-item">
              <p className="tasks-title">{task.title}</p>
              <div className="tasks-actions">
                <button className="complete-btns">
                  <FontAwesomeIcon icon={faCheck} className="check-btn-icon" />
                </button>
                <button className="remove-btns">-</button>
              </div>
            </div>
            <div className="tasks-item">
              <p className="tasks-duedate">
                Due Date: {new Date(task.dueDate).toLocaleDateString()}
              </p>
              <div className="tasks-members">
                {task.members.map((member, i) => (
                  <div key={i} className="member-avatar">
                    {/* Render profile image if available, else display a default avatar */}
                    {member.profileImage ? (
                      <img
                        src={`https://localhost:7044${member.profileImage}`} // Ensure full URL is constructed here
                        alt="Profile"
                        className="profile-image"
                      />
                    ) : (
                      <div className="default-avatar">
                        {member.userId[0]}{" "}
                        {/* First letter of userId as default avatar */}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AssignTodo;
