import { useState } from "react";
import classes from "./TagsList.module.scss";
// TODO: make tags styles global

export const TagsList = () => {
  const [isInputFocused, setInputFocused] = useState(false);

  return (
    <div className={classes["tags-list"]}>
      <ul className={classes["tags-list__items"]}>
        <li
          className={`${classes["tags-list__item"]} ${classes["tags-list__item_orange"]}`}
        >
          XD TAG 1
        </li>
        <li
          className={`${classes["tags-list__item"]} ${classes["tags-list__item_orange"]}`}
        >
          XD TAG 1
        </li>
        <input
          type="text"
          className={classes["tags-list__input"]}
          onFocus={() => setInputFocused(true)}
          onBlur={() => setInputFocused(false)}
        />
      </ul>

      <ul
        className={`${classes["tags-list__dropdown"]} ${
          isInputFocused && classes["tags-list__dropdown_shown"]
        }`}
      >
        <li className={classes["tags-list__dropdown-item"]}>TAG 1</li>
        <li className={classes["tags-list__dropdown-item"]}>TAG 2</li>
        <li className={classes["tags-list__dropdown-item"]}>TAG 3</li>
      </ul>
    </div>
  );
};
