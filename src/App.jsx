import "./styles/reset.scss";
import "./styles/style.scss";

import { todos } from "./todos.js";
import { Header } from "./components/header/Header.jsx";
import { TodoList } from "./components/todoList/TodoList.jsx";
import { Footer } from "./components/footer/Footer.jsx";

// TODO: refactor structure of components a bit
function App() {
  return (
    <div className="container">
      <Header />
      <TodoList todos={todos} />
      <Footer />
    </div>
  );
}

export default App;
