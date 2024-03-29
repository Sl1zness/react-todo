import { useContext } from "react";
import classes from "./TodoList.module.scss";
import { TodoItem } from "./components/TodoItem/TodoItem.jsx";
import { TodoContext } from "../../TodoContext.jsx";

export const TodoList = ({ toggleActionsVisibility }) => {
  const { todos } = useContext(TodoContext);
  return (
    <section className={classes["todo-list"]}>
      {todos.map((todo, index) => (
        <TodoItem
          itemId={todo.id}
          itemHeader={todo.header}
          itemDescription={todo.description}
          itemTags={todo.tags}
          key={index}
          toggleActionsVisibility={toggleActionsVisibility}
        />
      ))}
    </section>
  );
};
