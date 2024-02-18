import classes from "./Footer.module.scss";
import addIconImageUrl from "../../assets/addItemIcon.svg";
import acceptIconImageUrl from "../../assets/acceptModalIcon.svg";
import denyIconImageUrl from "../../assets/denyModalIcon.svg";
import { useState } from "react";
import { Modal } from "../modal/Modal";

export const Footer = () => {
  const [isModalShown, setModalShown] = useState(false);

  const addIconClick = (e) => {
    setModalShown(true);
  };

  return (
    <footer className={classes["footer"]}>
      {isModalShown && <Modal />}
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
        />

        <img
          className={`${classes["footer__icons-icon-deny"]} ${
            isModalShown && classes["footer__icons-icon-deny_shown"]
          }`}
          src={acceptIconImageUrl}
          alt="Deny creation of new TODO item"
          width="36"
          height="36"
        />

        <img
          className={`${classes["footer__icons-icon-confirm"]} ${
            isModalShown && classes["footer__icons-icon-confirm_shown"]
          }`}
          src={denyIconImageUrl}
          alt="Confirm creation of new TODO item"
          width="36"
          height="36"
        />
      </div>
    </footer>
  );
};
