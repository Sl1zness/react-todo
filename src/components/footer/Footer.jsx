import classes from "./Footer.module.scss";
import addIconImageUrl from "../../assets/addItemIcon.svg";
import { useState } from "react";
import { Modal } from "../modal/Modal";

export const Footer = () => {
  const [isModalShown, setModalShown] = useState(false);

  return (
    <footer className={classes["footer"]}>
      {isModalShown && <Modal hideModalFunction={() => setModalShown(false)} />}

      <button
        className={`${classes["footer__button"]} ${
          !isModalShown && classes["footer__button_shown"]
        }`}
        onClick={() => setModalShown(true)}
      >
        <img
          src={addIconImageUrl}
          alt="Create new TODO item"
          width="36"
          height="36"
        />
      </button>
    </footer>
  );
};
