import Home from "./components/Home";

function App() {
  return <Home />;
}

export default App;
import { useState } from "react";
import "./App.css";
import TaskList from "./companents/TaskList";


function App() {
  const [tasks, setTasks] = useState([]);
  const [text, setText] = useState("");

  const addTask = () => {
    if (text.trim() === "") return;

    setTasks([
      ...tasks,
      {
        id: Date.now(),
        text,
        completed: false,
      },
    ]);

    setText("");
  };

  const toggleStatus = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const editTask = (id) => {
    const newText = prompt(
      "Введите новое задание",
      tasks.find((t) => t.id === id).text
    );

    if (newText && newText.trim()) {
      setTasks(
        tasks.map((task) =>
          task.id === id
            ? { ...task, text: newText }
            : task
        )
      );
    }
  };

  return (
    <div className="container">
      <h1>🔥 Task Manager 🔥</h1>

      <div className="inputBox">
        <input
          type="text"
          placeholder="Введите новое задание..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <button onClick={addTask}>Add</button>
      </div>

      <TaskList
        tasks={tasks}
        toggleStatus={toggleStatus}
        deleteTask={deleteTask}
        editTask={editTask}
      />
    </div>
  );
}

export default App;
