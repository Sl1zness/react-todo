import { useRef, useState } from "react";
import classes from "./TagsList.module.scss";
import { tagsList } from "../../../todoTags";
import "../../../styles/TodoTag.scss";

export const TagsList = ({ changeSelectedTodoTags, newTodoTagsList }) => {
  const inputRef = useRef(null);
  const [isInputFocused, setInputFocused] = useState(false);

  const [inputValue, setInputValue] = useState("");
  const [dropdownTagsList, setDropdownTagsList] = useState(
    tagsList.map((elem) => elem)
  );

  const handleTagSelection = (e, tag) => {
    e.preventDefault(); // Added for better UX: user can hold mouse and drag it on empty space and cancel click if it accident
    const [selectedTag] = dropdownTagsList.splice(
      dropdownTagsList.indexOf(tag),
      1
    );
    setDropdownTagsList([...dropdownTagsList]);
    changeSelectedTodoTags({ tags: [...newTodoTagsList, selectedTag] });
  };

  const handleTagRemoval = (tag) => {
    const [removedTag] = newTodoTagsList.splice(
      newTodoTagsList.indexOf(tag),
      1
    );
    dropdownTagsList.push(removedTag);
    // TODO: consider removing sort and inserting it instantly in the correct place using ids
    dropdownTagsList.sort((a, b) => a.id > b.id);
    setDropdownTagsList([...dropdownTagsList]);
    changeSelectedTodoTags({ tags: newTodoTagsList });
  };

  return (
    <div
      className={classes["tags-list"]}
      onClick={() => inputRef.current.focus()}
    >
      <ul className={classes["tags-list__items"]}>
        {newTodoTagsList.map((tag, index) => (
          <li
            key={index}
            onClick={() => handleTagRemoval(tag)}
            className={`todo-tag ${tag.styleClass}`}
          >
            {tag.name}
          </li>
        ))}

        <input
          type="text"
          placeholder={newTodoTagsList.length === 0 ? "Tags..." : undefined}
          className={classes["tags-list__input"]}
          onFocus={() => setInputFocused(true)}
          onBlur={() => setInputFocused(false)}
          ref={inputRef}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
      </ul>

      {/* TODO: empty space remains in classlist. Fix */}
      <ul
        className={`${classes["tags-list__dropdown"]} ${
          isInputFocused ? classes["tags-list__dropdown_shown"] : ""
        }`}
      >
        {dropdownTagsList.map((tag, index) => {
          if (
            tag.name.toLowerCase().includes(inputValue.trim().toLowerCase()) ||
            inputValue.length === 0
          ) {
            return (
              <li
                onMouseDown={(e) => {
                  setInputValue("");
                  handleTagSelection(e, tag);
                }}
                key={index}
                className={classes["tags-list__dropdown-item"]}
              >
                {tag.name}
              </li>
            );
          }
        })}
      </ul>
    </div>
  );
};
