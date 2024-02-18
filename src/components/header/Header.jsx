import classes from "./Header.module.scss";

export const Header = () => {
  return (
    <header className={classes["header"]}>
      <h1 className={classes["header__logo"]}>Daily Todo</h1>
    </header>
  );
};
