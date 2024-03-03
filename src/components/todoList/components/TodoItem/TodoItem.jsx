import classes from "./TodoItem.module.scss";
import "../../../../styles/TodoTag.scss";
import { useContext } from "react";
import { TodoContext } from "../../../../TodoContext";

export const TodoItem = ({
  itemId,
  itemHeader,
  itemDescription,
  itemTags,
  toggleActionsVisibility,
}) => {
  const { todos, setTodos } = useContext(TodoContext);

  const checkTouchscreen = () => {
    if ("maxTouchPoints" in navigator) {
      return navigator.maxTouchPoints > 0;
    } else if ("msMaxTouchPoints" in navigator) {
      return navigator.msMaxTouchPoints > 0;
    } else {
      let mQ = window.matchMedia && matchMedia("(pointer:coarse)");
      if (mQ && mQ.media === "(pointer:coarse)") return mQ.matches;
    }

    return false;
  };

  const isTouchscren = checkTouchscreen();

  const handleDragStart = (e) => {
    e.dataTransfer.setData("todoId", e.target.dataset.todoId);
    e.currentTarget.classList.add(classes["todo-item_dragged"]);
    toggleActionsVisibility(true);
  };

  const handleDragEnd = (e) => {
    e.currentTarget.classList.remove(classes["todo-item_dragged"]);
    toggleActionsVisibility(false);
  };

  let startingPoint = null;
  let delta = 0;
  const handleMouseDown = (e) => {
    startingPoint = e.clientX;
  };

  const handleSwipe = (e) => {
    delta = startingPoint - e.clientX;
  };

  const handleMouseUp = (e) => {
    const id = e.currentTarget.dataset.todoId;
    let buff = JSON.parse(localStorage.getItem("todos"));
    if (delta < -20) {
      e.currentTarget.classList.add(classes["todo-item_swiped_right"]);
      localStorage.setItem(
        "todos",
        JSON.stringify(buff.filter((item) => item.id !== id))
      );
      setTodos(...[todos.filter((item) => item.id !== id)]);
    } else if (delta > 20) {
      e.currentTarget.classList.add(classes["todo-item_swiped_left"]);
      localStorage.setItem(
        "todos",
        JSON.stringify(buff.filter((item) => item.id !== id))
      );
      setTodos(...[todos.filter((item) => item.id !== id)]);
    }
    delta = 0;
  };

  return (
    <article
      draggable={isTouchscren ? "false" : "true"}
      data-todo-id={itemId}
      onDragStart={isTouchscren ? undefined : (e) => handleDragStart(e)}
      onDragEnd={isTouchscren ? undefined : handleDragEnd}
      className={`${classes["todo-item"]}`}
      onMouseDown={isTouchscren ? (e) => handleMouseDown(e) : undefined}
      onMouseMove={isTouchscren ? handleSwipe : undefined}
      onMouseUp={isTouchscren ? (e) => handleMouseUp(e) : undefined}
    >
      <h2 className={classes["todo-item__header"]}>{itemHeader}</h2>
      <p className={classes["todo-item__description"]}>{itemDescription}</p>
      <div className={classes["todo-item__tags-list"]}>
        {itemTags.map((tag, index) => (
          <span key={index} className={`${"todo-tag"} ${tag.styleClass}`}>
            {tag.name}
          </span>
        ))}
      </div>
    </article>
  );
};
