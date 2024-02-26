import { useContext, useEffect, useState } from "react";
import classes from "./Modal.module.scss";
import { TagsList } from "./components/TagsList";
import acceptIconImageUrl from "../../assets/acceptModalIcon.svg";
import denyIconImageUrl from "../../assets/denyModalIcon.svg";
import { TodoContext } from "../../TodoContext";

export const Modal = ({ hideModalFunction }) => {
  const { setTodos } = useContext(TodoContext);

  const [newTodo, setNewTodo] = useState({
    id: "",
    header: "",
    description: "",
    tags: [],
  });

  const changeTodoField = (field) => {
    setNewTodo({ ...newTodo, ...field });
  };

  const clearTodoFields = () => {
    setNewTodo({
      ...newTodo,
      header: "",
      description: "",
      tags: [],
    });
  };

  // TODO: create custom hook (?) and place new item both in localstorage and list simultaneously
  const pushNewTodo = () => {
    const buff = JSON.parse(localStorage.getItem("todos"));
    try {
      newTodo.id = String(Math.round(Math.random() * 100000));
      buff !== null && buff.push(newTodo);
      localStorage.setItem("todos", JSON.stringify(buff));
      setTodos([...buff]);
    } catch (e) {
      console.log("Todos is null");
    }
  };

  return (
    <aside className={classes["modal"]}>
      <div
        className={classes["modal__backdrop"]}
        onClick={hideModalFunction}
      ></div>

      <div className={classes["modal__window"]}>
        <form
          action="/add-task"
          method="POST"
          className={classes["modal__window-form"]}
        >
          <input
            type="text"
            name="todoHeader"
            aria-label="Input your TODO task header here"
            placeholder="Task header..."
            className={classes["modal__input"]}
            value={newTodo.header}
            onChange={(e) =>
              changeTodoField({
                header: e.target.value,
              })
            }
          />

          <textarea
            name="todoDescription"
            placeholder="Task description..."
            aria-label="Input your TODO task description here"
            className={`${classes["modal__input"]} ${classes["modal__textarea"]}`}
            value={newTodo.description}
            onChange={(e) =>
              changeTodoField({
                description: e.target.value,
              })
            }
          ></textarea>

          <TagsList
            changeSelectedTodoTags={changeTodoField}
            newTodoTagsList={newTodo.tags}
          />
        </form>
      </div>

      <div className={classes["modal__buttons"]}>
        <button
          className={classes["modal__buttons-item"]}
          onClick={() => {
            pushNewTodo();
            clearTodoFields();
            hideModalFunction();
          }}
        >
          <img
            src={acceptIconImageUrl}
            alt="Confirm creation of new TODO item"
            width="36"
            height="36"
          />
        </button>

        <button
          className={classes["modal__buttons-item"]}
          onClick={() => {
            clearTodoFields();
            hideModalFunction();
          }}
        >
          <img
            src={denyIconImageUrl}
            alt="Deny creation of new TODO item"
            width="36"
            height="36"
          />
        </button>
      </div>
    </aside>
  );
};
