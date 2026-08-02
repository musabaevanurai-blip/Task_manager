import { useMemo, useState } from "react";
import FilterBar from "./FilterBar";

const START_TASKS = [
  {
    id: 1,
    title: "Jog around the park 3x",
    completed: true,
    createdAt: "2026-07-27T08:30:00",
  },
  {
    id: 2,
    title: "10 minutes meditation",
    completed: false,
    createdAt: "2026-07-27T09:30:00",
  },
  {
    id: 3,
    title: "Read for 1 hour",
    completed: false,
    createdAt: "2026-07-26T13:00:00",
  },
  {
    id: 4,
    title: "Pick up groceries",
    completed: false,
    createdAt: "2026-07-25T16:20:00",
  },
  {
    id: 5,
    title: "Complete Todo App on Frontend Mentor",
    completed: false,
    createdAt: "2026-07-24T11:00:00",
  },
];

export default function Home() {
  const [tasks, setTasks] = useState(START_TASKS);
  const [text, setText] = useState("");
  const [filter, setFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState("newest");
  const [dark, setDark] = useState(false);

  const activeCount = tasks.filter((task) => !task.completed).length;
  const completedCount = tasks.filter((task) => task.completed).length;

  const visibleTasks = useMemo(() => {
    const filtered = tasks.filter((task) => {
      if (filter === "active") return !task.completed;
      if (filter === "completed") return task.completed;
      return true;
    });

    return [...filtered].sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();

      return sortOrder === "newest"
        ? dateB - dateA
        : dateA - dateB;
    });
  }, [tasks, filter, sortOrder]);

  function addTask(event) {
    event.preventDefault();

    if (!text.trim()) return;

    setTasks([
      {
        id: Date.now(),
        title: text,
        completed: false,
        createdAt: new Date().toISOString(),
      },
      ...tasks,
    ]);

    setText("");
  }

  function toggleTask(id) {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task,
      ),
    );
  }

  function deleteTask(id) {
    setTasks(tasks.filter((task) => task.id !== id));
  }

  function clearCompleted() {
    setTasks(tasks.filter((task) => !task.completed));
  }

  return (
    <main className={dark ? "todo dark" : "todo"}>
      <style>{styles}</style>

      <section className="hero">
        <div className="container">
          <header>
            <h1>TODO</h1>

            <button
              className="theme"
              onClick={() => setDark(!dark)}
            >
              {dark ? "☀" : "☾"}
            </button>
          </header>

          <form className="new-task" onSubmit={addTask}>
            <span className="circle" />
            <input
              value={text}
              onChange={(event) => setText(event.target.value)}
              placeholder="Create a new todo..."
            />
          </form>
        </div>
      </section>

      <section className="container content">
        <div className="todo-list">
          <ul>
            {visibleTasks.map((task) => (
              <li
                className={task.completed ? "task completed" : "task"}
                key={task.id}
              >
                <label className="checkbox">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleTask(task.id)}
                  />
                  <span>✓</span>
                </label>

                <p>{task.title}</p>

                <button
                  className="delete"
                  onClick={() => deleteTask(task.id)}
                >
                  ×
                </button>
              </li>
            ))}
          </ul>

          <FilterBar
            filter={filter}
            onFilterChange={setFilter}
            sortOrder={sortOrder}
            onSortOrderChange={setSortOrder}
            activeCount={activeCount}
            completedCount={completedCount}
            onClearCompleted={clearCompleted}
          />
        </div>

        <p className="hint">Drag and drop to reorder list</p>
      </section>
    </main>
  );
}

const styles = `
  body {
    margin: 0;
  }

  * {
    box-sizing: border-box;
  }

  .todo {
    --bg: #fafafa;
    --card: #ffffff;
    --text: #494b6c;
    --muted: #9394a5;
    --line: #e4e5f0;
    min-height: 100vh;
    background: var(--bg);
    color: var(--text);
    font-family: Arial, sans-serif;
  }

  .todo.dark {
    --bg: #161722;
    --card: #25273c;
    --text: #cacde8;
    --muted: #777a92;
    --line: #393a4c;
  }

  .hero {
    height: 300px;
    padding-top: 70px;
    color: white;
    background:
      radial-gradient(circle at 90% 20%, #b43db3, transparent 35%),
      linear-gradient(110deg, #403eb1, #7652d7, #bc3db2);
  }

  .container {
    width: min(540px, calc(100% - 42px));
    margin: 0 auto;
  }

  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 40px;
  }

  h1 {
    margin: 0;
    font-size: 38px;
    letter-spacing: 14px;
  }

  .theme {
    color: white;
    background: none;
    border: 0;
    cursor: pointer;
    font-size: 28px;
  }

  .new-task {
    display: flex;
    align-items: center;
    gap: 20px;
    height: 64px;
    padding: 0 22px;
    background: var(--card);
    border-radius: 5px;
  }

  .circle,
  .checkbox span {
    width: 23px;
    height: 23px;
    border: 1px solid var(--line);
    border-radius: 50%;
  }

  .new-task input {
    width: 100%;
    color: var(--text);
    background: transparent;
    border: 0;
    outline: 0;
    font-size: 16px;
  }

  .content {
    padding-bottom: 50px;
  }

  .todo-list {
    overflow: hidden;
    background: var(--card);
    border-radius: 5px;
    box-shadow: 0 20px 34px rgba(41, 44, 91, 0.14);
  }

  ul {
    padding: 0;
    margin: 0;
    list-style: none;
  }

  .task {
    display: grid;
    grid-template-columns: 23px 1fr 27px;
    align-items: center;
    gap: 20px;
    min-height: 64px;
    padding: 0 20px;
    border-bottom: 1px solid var(--line);
  }

  .task p {
    margin: 0;
    font-size: 16px;
  }

  .task.completed p {
    color: var(--muted);
    text-decoration: line-through;
  }

  .checkbox {
    display: grid;
    cursor: pointer;
    place-items: center;
  }

  .checkbox input {
    position: absolute;
    opacity: 0;
  }

  .checkbox span {
    display: grid;
    color: transparent;
    font-size: 13px;
    place-items: center;
  }

  .checkbox input:checked + span {
    color: white;
    border: 0;
    background: linear-gradient(135deg, #57ddff, #c058f3);
  }

  .delete {
    color: var(--muted);
    background: none;
    border: 0;
    cursor: pointer;
    font-size: 28px;
  }

  .filter-bar {
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    align-items: center;
    min-height: 58px;
    padding: 0 20px;
    color: var(--muted);
    font-size: 13px;
  }

  .filter-bar__filters {
    display: flex;
    gap: 14px;
  }

  .filter-bar button,
  .filter-bar select {
    color: var(--muted);
    background: none;
    border: 0;
    cursor: pointer;
  }

  .filter-bar button.active {
    color: #3a7bfd;
    font-weight: bold;
  }

  .filter-bar__right {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
  }

  .hint {
    margin-top: 45px;
    color: var(--muted);
    font-size: 13px;
    text-align: center;
  }

  @media (max-width: 600px) {
    .hero {
      height: 200px;
      padding-top: 48px;
    }

    .container {
      width: min(100% - 48px, 540px);
    }

    h1 {
      font-size: 27px;
      letter-spacing: 10px;
    }

    .new-task {
      height: 50px;
    }

    .task {
      min-height: 52px;
    }

    .filter-bar {
      grid-template-columns: 1fr auto;
      row-gap: 12px;
      padding: 12px 16px;
    }

    .filter-bar__filters {
      grid-column: 1 / -1;
      grid-row: 2;
      justify-content: center;
    }
  }
`;