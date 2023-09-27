import React, { useState } from "react";
import moment from "moment";

const Todo = ({ task, handleUpdate, handleDelete }) => {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [show, setShow] = useState(false);

  const handleSelect = (index) => {
    if (selectedIndex === null || selectedIndex !== index) {
      setSelectedIndex(index);
    } else {
      setSelectedIndex(null);
    }
  };

  return (
    <>
      <div
        data-testid={`todo-${task._id}`}
        className={`todo ${
          task.completed ? "todo-completed" : "todo-notCompleted"
        }`}
        style={{
          height: `${selectedIndex === task._id ? "80px" : "50px"}`,
        }}
        onClick={() => handleSelect(task._id)}
      >
        <div id="visibleid">
          <span id="checkboxspan">
            {task.completed ? (
              <i
                className="fa-solid fa-circle-check"
                onClick={(e) => {
                  e.stopPropagation();

                  handleUpdate(task._id, false);
                }}
              ></i>
            ) : (
              <i
                className="fa-regular fa-circle"
                onClick={(e) => {
                  e.stopPropagation();

                  handleUpdate(task._id, true);
                }}
              ></i>
            )}

            <p
              style={{
                textDecoration: `${task.completed ? "line-through" : "none"}`,
              }}
            >
              {task.text}
            </p>
          </span>
          <span
            id="dotspan"
            onClick={(e) => {
              setShow(!show);
              e.stopPropagation();
            }}
          >
            <i className="fa-solid fa-ellipsis-vertical"></i>
            <i className="fa-solid fa-ellipsis-vertical"></i>
            {show && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(task._id);
                }}
                id="dltbtn"
              >
                Delete
              </button>
            )}
          </span>
        </div>

        <span
          id="textspan"
          style={{
            display: `${selectedIndex === task._id ? "flex" : "none"}`,
          }}
        >
          <p>
            Created:
            {moment(task.created_at).format("DD/MM/YYYY, HH:mm:ss")}
          </p>
          <p
            style={{
              display: `${!task.completed ? "none" : "flex"}`,
            }}
          >
            Completed: {moment(task.completed_at).format("DD/MM/YYYY,HH:mm:ss")}
          </p>
        </span>
      </div>
    </>
  );
};

export default Todo;
