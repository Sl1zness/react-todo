import "./styles/reset.scss";
import "./styles/style.scss";

import { Header } from "./components/header/Header.jsx";
import { TodoList } from "./components/todoList/TodoList.jsx";
import { Footer } from "./components/footer/Footer.jsx";
import { TodoContext } from "./TodoContext.jsx";
import { testTodoList } from "./testTodoList.js";
import { useEffect, useState } from "react";

// TODO: refactor structure of components a bit
function App() {
  useEffect(() => {
    if (localStorage.getItem("todos") === null) {
      localStorage.setItem("todos", JSON.stringify(testTodoList));
    }
  }, []);

  const [todos, setTodos] = useState(JSON.parse(localStorage.getItem("todos")));

  return (
    <div className="container">
      <Header />
      <TodoContext.Provider value={{ todos, setTodos }}>
        <TodoList />
        <Footer />
      </TodoContext.Provider>
    </div>
  );
}

export default App;
