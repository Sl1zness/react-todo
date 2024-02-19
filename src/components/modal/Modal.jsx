import { useState } from "react";
import classes from "./Modal.module.scss";
import { TagsList } from "./components/TagsList";

export const Modal = () => {
  const [formValues, setFormValues] = useState({
    header: "",
    description: "",
  });

  const changeFormValue = (e, val) => {
    console.log(val);
    setFormValues({ ...val });
  };

  return (
    <aside className={classes["modal"]}>
      <div className={classes["modal__backdrop"]}></div>
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
            value={formValues.header}
            onChange={(e) => {
              changeFormValue(e, { ...formValues, header: e.target.value });
            }}
          />

          {/* TODO: change to input */}
          <textarea
            name="todoDescription"
            placeholder="Task description..."
            aria-label="Input your TODO task description here"
            className={classes["modal__textarea"]}
            value={formValues.description}
            onChange={(e) =>
              changeFormValue(e, {
                ...formValues,
                description: e.target.value,
              })
            }
          ></textarea>

          {/* TODO: add tags box */}
          <TagsList />
        </form>
      </div>
    </aside>
  );
};
