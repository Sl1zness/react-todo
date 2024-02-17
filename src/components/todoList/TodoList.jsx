import classes from "./TodoList.module.scss";
import { TodoItem } from "./components/TodoItem/TodoItem.jsx";

export const TodoList = ({ todos }) => {
  return (
    <section className={classes["todo-list"]}>
      {todos.map((todo, index) => (
        <TodoItem
          itemHeader={todo.header}
          itemDescription={todo.description}
          itemTags={todo.tags}
          key={index}
        />
      ))}
    </section>
  );
};
