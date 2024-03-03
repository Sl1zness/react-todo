import "./styles/reset.scss";
import "./styles/style.scss";

import { Header } from "./components/header/Header.jsx";
import { Footer } from "./components/footer/Footer.jsx";
import { TodoContext } from "./TodoContext.jsx";
import { testTodoList } from "./testTodoList.js";
import { useEffect, useState } from "react";
import { Main } from "./components/main/Main.jsx";

function App() {
  if (localStorage.getItem("todos") === null) {
    localStorage.setItem("todos", JSON.stringify(testTodoList));
  }

  const [todos, setTodos] = useState(JSON.parse(localStorage.getItem("todos")));

  return (
    <div className="container">
      <Header />
      <TodoContext.Provider value={{ todos, setTodos }}>
        <Main />
        <Footer />
      </TodoContext.Provider>
    </div>
  );
}

export default App;
