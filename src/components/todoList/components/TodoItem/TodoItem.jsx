import classes from "./TodoItem.module.scss";
import "../../../../styles/TodoTag.scss";

export const TodoItem = ({ itemHeader, itemDescription, itemTags }) => {
  return (
    <article className={classes["todo-item"]}>
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
