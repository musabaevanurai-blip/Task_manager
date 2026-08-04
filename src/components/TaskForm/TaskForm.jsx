import { useState, useEffect } from "react";
// import {
//   addTask,
//   updateTask,
// } from "../firebase/firebase";
import styles from "./TaskForm.module.css"

function TaskForm({ editingTask, setEditingTask }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("pending");

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title);
      setDescription(editingTask.description);
      setStatus(editingTask.status);
    }
  }, [editingTask]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      alert("Введите название задачи");
      return;
    }

    const task = {
      title,
      description,
      status,
    };

    try {
      if (editingTask) {
        await updateTask(editingTask.id, task);
        setEditingTask(null);
      } else {
        await addTask(task);
      }

      setTitle("");
      setDescription("");
      setStatus("pending");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form className={styles.taskForm} onSubmit={handleSubmit}>
      <h2>
        {editingTask
          ? "Редактировать задачу"
          : "Добавить задачу"}
      </h2>

      <input
        type="text"
        placeholder="Название"
        value={title}
        onChange={(e) =>
          setTitle(e.target.value)
        }
      />

      <textarea
        placeholder="Описание"
        value={description}
        onChange={(e) =>
          setDescription(e.target.value)
        }
      />
      <select
        value={status}
        onChange={(e) =>
          setStatus(e.target.value)
        }
      >
        <option value="pending">
          Pending
        </option>

        <option value="in-progress">
          In Progress
        </option>

        <option value="done">
          Done
        </option>
      </select>

      <button type="submit">
        {editingTask
          ? "Сохранить"
          : "Добавить"}
      </button>
    </form>
  );
}

export default TaskForm;