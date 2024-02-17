import "./styles/reset.scss";
import "./styles/style.scss";

import { todos } from "./todos.js";
import { Header } from "./components/header/Header.jsx";
import { TodoList } from "./components/todoList/TodoList.jsx";

function App() {
  return (
    <div className="container">
      <Header />
      <TodoList todos={todos} />
    </div>
  );
}

export default App;
