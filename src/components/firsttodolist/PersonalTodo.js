import React, { useState, useEffect } from "react";
import "../todosection/ToDoSection.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

function PersonalTodo() {
  const [todoData, setTodoData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch the data from the API
    const fetchPersonalTodos = async () => {
      try {
        const response = await fetch(
          "https://localhost:7044/api/PersonalToDo/GetAllPersonalToDo?GroupId=08dd1429-5719-4928-83bd-60649f334c5d",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          if (data.isSuccess) {
            // Map the API response to the required format
            const mappedData = data.result.map((item) => ({
              id: item.personalToDoId,
              date: new Date(item.dueDate).toLocaleDateString("en-US", {
                month: "numeric",
                day: "numeric",
              }), // Format date as MM/DD
              task: item.toDoDescription,
              isCompleted: item.isCompleted,
            }));
            setTodoData(mappedData);
          } else {
            console.error("Failed to retrieve data:", data.message);
          }
        } else {
          console.error("HTTP error:", response.status);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPersonalTodos();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="todo-section">
      <ul className="todo-item-list">
        {todoData.map((item) => (
          <li key={item.id} className="todo-item">
            <div className="todo-date">{item.date}</div>
            <div className="todo-details">
              <p className="task-name">{item.task}</p>
              <div className="todo-actions">
                <button
                  className={`complete-btn ${
                    item.isCompleted ? "completed" : ""
                  }`}
                >
                  <FontAwesomeIcon icon={faCheck} className="check-btn-icon" />
                </button>
                <button className="remove-btn">-</button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PersonalTodo;
