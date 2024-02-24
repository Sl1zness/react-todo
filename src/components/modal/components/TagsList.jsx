import { useRef, useState } from "react";
import classes from "./TagsList.module.scss";
import { tagsList } from "../../../todoTags";
import "../../../styles/TodoTag.scss";

// TODO: REFACTOR???

export const TagsList = ({ changeTags, formTagsList }) => {
  console.log("XD");

  const [isInputFocused, setInputFocused] = useState(false);
  const inputRef = useRef(null);
  const [inputValue, setInputValue] = useState("");
  const [dropdownTagsList, setDropdownTagsList] = useState(
    tagsList.map((elem) => elem)
  );
  const [selectedTags, setSelectedTags] = useState([]);

  const handleTagSelection = (e, tag) => {
    e.preventDefault(); // Added for better UX: user can hold mouse and drag it on empty space and cancel click if it accident
    const [selectedTag] = dropdownTagsList.splice(
      dropdownTagsList.indexOf(tag),
      1
    );

    //setSelectedTags([...selectedTags, selectedTag]);

    setDropdownTagsList([...dropdownTagsList]);
    changeTags({ tags: [...formTagsList, selectedTag] });
  };

  const handleTagRemoval = (tag) => {
    const [removedTag] = formTagsList.splice(formTagsList.indexOf(tag), 1);
    dropdownTagsList.push(removedTag);
    dropdownTagsList.sort((a, b) => a.id > b.id);

    //setSelectedTags([...selectedTags]);

    setDropdownTagsList([...dropdownTagsList]);
    changeTags({ tags: formTagsList });
  };

  return (
    <div
      className={classes["tags-list"]}
      onClick={() => inputRef.current.focus()}
    >
      <ul className={classes["tags-list__items"]}>
        {formTagsList.map((tag, index) => (
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
          className={classes["tags-list__input"]}
          onFocus={() => setInputFocused(true)}
          onBlur={() => setInputFocused(false)}
          ref={inputRef}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
      </ul>

      {/* TODO: fix false in classlist */}
      <ul
        className={`${classes["tags-list__dropdown"]} ${
          isInputFocused && classes["tags-list__dropdown_shown"]
        }`}
      >
        {dropdownTagsList.map((tag, index) => {
          if (
            tag.name.toLowerCase().includes(inputValue.trim().toLowerCase())
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
          } else if (inputValue.length === 0) {
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
