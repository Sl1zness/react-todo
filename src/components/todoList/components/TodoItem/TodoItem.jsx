import classes from "./TodoItem.module.scss";
import "../../../../styles/TodoTag.scss";

export const TodoItem = ({
  itemId,
  itemHeader,
  itemDescription,
  itemTags,
  toggleActionsVisibility,
}) => {
  const handleDragStart = (e) => {
    e.dataTransfer.setData("todoId", e.target.dataset.todoId);
    e.currentTarget.classList.add(classes["todo-item_dragged"]);
    toggleActionsVisibility(true);
  };

  const handleDragEnd = (e) => {
    e.currentTarget.classList.remove(classes["todo-item_dragged"]);
    toggleActionsVisibility(false);
  };

  return (
    <article
      draggable="true"
      data-todo-id={itemId}
      onDragStart={(e) => handleDragStart(e)}
      onDragEnd={handleDragEnd}
      className={`${classes["todo-item"]}`}
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
