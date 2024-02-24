import { useState } from "react";
import classes from "./Modal.module.scss";
import { TagsList } from "./components/TagsList";
import acceptIconImageUrl from "../../assets/acceptModalIcon.svg";
import denyIconImageUrl from "../../assets/denyModalIcon.svg";

export const Modal = ({ hideModal }) => {
  const [newTodoTaskFields, setNewTodoTaskFields] = useState({
    header: "",
    description: "",
    tags: [],
  });

  const changeFormValue = (val) => {
    console.log(newTodoTaskFields);
    setNewTodoTaskFields({ ...newTodoTaskFields, ...val });
  };

  return (
    <aside className={classes["modal"]}>
      <div className={classes["modal__backdrop"]} onClick={hideModal}></div>
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
            value={newTodoTaskFields.header}
            onChange={(e) => {
              changeFormValue({
                header: e.target.value,
              });
            }}
          />

          <textarea
            name="todoDescription"
            placeholder="Task description..."
            aria-label="Input your TODO task description here"
            className={classes["modal__textarea"]}
            value={newTodoTaskFields.description}
            onChange={(e) =>
              changeFormValue({
                description: e.target.value,
              })
            }
          ></textarea>

          <TagsList
            changeTags={changeFormValue}
            formTagsList={newTodoTaskFields.tags}
          />
        </form>
      </div>
      <div className={classes["modal__buttons"]}>
        <img
          className={`${classes["modal__buttons-button"]}`}
          src={acceptIconImageUrl}
          alt="Deny creation of new TODO item"
          width="36"
          height="36"
          onClick={() => {
            setNewTodoTaskFields({
              header: "",
              description: "",
              tags: [],
            });
            hideModal;
          }}
          role="button"
        />

        <img
          className={`${classes["modal__buttons-button"]}`}
          src={denyIconImageUrl}
          alt="Confirm creation of new TODO item"
          width="36"
          height="36"
          onClick={hideModal}
          role="button"
        />
      </div>
    </aside>
  );
};
