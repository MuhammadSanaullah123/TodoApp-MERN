import { render, screen, cleanup } from "@testing-library/react";
import React from "react";
import Todo from "./components/Todo";
import "@testing-library/jest-dom";

//Every test starts from same start point
afterEach(() => {
  cleanup();
});

test("Should render completed Todo component", () => {
  const task = {
    _id: 1,
    text: "Game",
    completed: true,
    created_at: "2023-09-16T20:07:10.884+00:00",
    completed_at: "2023-09-16T20:07:10.884+00:00",
  };
  render(<Todo task={task} />);
  const todoElement = screen.getByTestId("todo-1");
  expect(todoElement).toBeInTheDocument();
  expect(todoElement).toHaveTextContent("Game");
  expect(todoElement).toHaveClass("todo-completed");
});

test("Should render not completed Todo component", () => {
  const task = {
    _id: 2,
    text: "Sleep",
    completed: false,
    created_at: "2023-09-16T20:07:10.884+00:00",
    completed_at: "2023-09-16T20:07:10.884+00:00",
  };
  render(<Todo task={task} />);
  const todoElement = screen.getByTestId("todo-2");
  expect(todoElement).toBeInTheDocument();
  expect(todoElement).toHaveTextContent("Sleep");
  expect(todoElement).toHaveClass("todo-notCompleted");
});
