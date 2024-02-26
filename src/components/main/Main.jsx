import { TodoList } from "../todoList/TodoList";
import deleteTaskIconPath from "../../assets/deleteTaskIcon.svg";
import finishTaskIconPath from "../../assets/finishTaskIcon.svg";
import classes from "./Main.module.scss";
import { useContext, useState } from "react";
import { TodoContext } from "../../TodoContext";

export const Main = () => {
  const [isActionsVisible, setActionsVisible] = useState(false);
  const { todos, setTodos } = useContext(TodoContext);

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  // TODO: check modal todo
  const handleDrop = (e) => {
    const id = e.dataTransfer.getData("todoId");
    let buff = JSON.parse(localStorage.getItem("todos"));
    localStorage.setItem(
      "todos",
      JSON.stringify(buff.filter((item) => item.id !== id))
    );
    setTodos(...[todos.filter((item) => item.id !== id)]);
    setActionsVisible(false);
  };

  // TODO: fix blank space in classlist
  return (
    <main className={classes["main"]}>
      <aside
        className={`${classes["main__task-action"]} ${
          classes["main__task-action_left"]
        } ${isActionsVisible ? classes["main__task-action_shown"] : ""}`}
        onDragOver={(e) => handleDragOver(e)}
        onDrop={(e) => handleDrop(e)}
      >
        <img
          src={deleteTaskIconPath}
          alt="Delete your task"
          width="130"
          height="153"
        />
      </aside>

      <TodoList toggleActionsVisibility={setActionsVisible} />

      <aside
        className={`${classes["main__task-action"]} ${
          classes["main__task-action_right"]
        } ${isActionsVisible ? classes["main__task-action_shown"] : ""}`}
        onDragOver={(e) => handleDragOver(e)}
        onDrop={(e) => handleDrop(e)}
      >
        <img
          src={finishTaskIconPath}
          alt="Mark your task as finished"
          width="141"
          height="141"
        />
      </aside>
    </main>
  );
};
