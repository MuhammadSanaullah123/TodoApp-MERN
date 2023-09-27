import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  useGetTasksMutation,
  useUpdateTasksMutation,
  useCreateTaskMutation,
  useDeleteTaskMutation,
} from "../slices/taskApiSlice";

import { setTasks } from "../slices/taskSlice";
import Loader from "../components/Loader";
//components
import Todo from "../components/Todo";

const Home = () => {
  const dispatch = useDispatch();

  const [text, setText] = useState("");

  const { tasksInfo } = useSelector((state) => state.task);
  const [getTasks, { isLoading }] = useGetTasksMutation();
  const [updateTasks] = useUpdateTasksMutation();
  const [createTask] = useCreateTaskMutation();
  const [deleteTask] = useDeleteTaskMutation();

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      const res = await createTask({ text }).unwrap();
      setText("");
      handleTasks();
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdate = async (id, completed) => {
    try {
      const res = await updateTasks({ id, completed }).unwrap();
      handleTasks();
    } catch (error) {
      console.error(error);
    }
  };

  const handleTasks = async () => {
    try {
      const res = await getTasks().unwrap();
      dispatch(setTasks({ ...res }));
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await deleteTask(id).unwrap();
      handleTasks();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    handleTasks();
  }, []);

  return (
    <div id="home">
      <div id="contentDiv">
        <img
          src="https://res.cloudinary.com/dmtcur7kt/image/upload/v1695063038/Muhammad1_qd7xgy.jpg"
          alt=""
        />

        <div
          id="dropdown"
          /*    onClick={() => {
            setShow(!show);
          }} */
        >
          <span>
            <i className="fa-solid fa-bars"></i>
            <p>To do today</p>
          </span>
          <i className="fa-solid fa-angle-down"></i>
        </div>
        <div id="todolist">
          {tasksInfo &&
            tasksInfo.map((task) => (
              <Todo
                task={task}
                key={task._id}
                handleUpdate={handleUpdate}
                handleDelete={handleDelete}
              />
            ))}
        </div>
        <div id="createDiv">
          <form onSubmit={handleAdd}>
            <input
              type="text"
              name="task"
              id="task"
              value={text}
              placeholder="Create Task"
              onChange={(e) => setText(e.target.value)}
            />
            <button type="submit">Add</button>
          </form>
        </div>
      </div>
      {isLoading && <Loader />}
    </div>
  );
};

export default Home;
