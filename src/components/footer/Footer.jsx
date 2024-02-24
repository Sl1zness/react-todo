import classes from "./Footer.module.scss";
import addIconImageUrl from "../../assets/addItemIcon.svg";
import { useState } from "react";
import { Modal } from "../modal/Modal";
import { todos } from "../../todos";

export const Footer = () => {
  const [isModalShown, setModalShown] = useState(false);

  const addIconClick = (e) => {
    setModalShown(true);
  };

  return (
    <footer className={classes["footer"]}>
      {isModalShown && <Modal hideModal={() => setModalShown(false)} />}
      <div className={classes["footer__icons"]}>
        <img
          onClick={addIconClick}
          className={`${classes["footer__icons-icon-add"]} ${
            !isModalShown && classes["footer__icons-icon-add_shown"]
          }`}
          src={addIconImageUrl}
          alt="Create new TODO item"
          width="36"
          height="36"
          role="button"
        />
      </div>
    </footer>
  );
};
