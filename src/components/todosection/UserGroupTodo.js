import React, { useEffect, useState } from "react";
import "./ToDoSection.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faPlus } from "@fortawesome/free-solid-svg-icons";

function UserGroupTodo() {
  const [todoData, setTodoData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [newTodo, setNewTodo] = useState({ description: "", dueDate: "" });

  //   const adminId = "08dd1429-1a89-46a1-8ac2-63423eea437e"; // Replace with dynamic admin ID if necessary

  useEffect(() => {
    const fetchGroupTodos = async () => {
      try {
        const response = await fetch(
          "https://localhost:7044/api/GroupToDo/GetAllGroupToDo?GroupId=08dd1429-5719-4928-83bd-60649f334c5d",
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
            const mappedData = data.result.map((item) => ({
              date: new Date(item.dueDate).toLocaleDateString("en-US", {
                month: "numeric",
                day: "numeric",
              }),
              task: item.description,
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

    fetchGroupTodos();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="todo-section">
      <ul className="todo-item-list">
        {todoData.map((item, index) => (
          <li key={index} className="todo-item">
            <div className="todo-date">{item.date}</div>
            <div className="todo-details">
              <p className="task-name">{item.task}</p>
              <div className="todo-actions">
                <button className="complete-btn">
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

export default UserGroupTodo;
