import { useEffect, useState } from "react";
import styles from "./TaskForm.module.css";

const TaskForm = ({ onAddTask, onUpdateTask, editingTask }) => {
  const [task, setTask] = useState({
    title: "",
    description: "",
    status: "pending",
  });

  useEffect(() => {
    if (editingTask) {
      setTask(editingTask);
    } else {
      setTask({
        title: "",
        description: "",
        status: "pending",
      });
    }
  }, [editingTask]);

  const handleChange = (e) => {
    setTask({
      ...task,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!task.title.trim()) {
      alert("Введите название задачи");
      return;
    }

    if (editingTask) {
      onUpdateTask(task);
    } else {
      onAddTask(task);
    }

    setTask({
      title: "",
      description: "",
      status: "pending",
    });
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2>{editingTask ? "Редактировать задачу" : "Новая задача"}</h2>

      <input
        type="text"
        name="title"
        placeholder="Название задачи"
        value={task.title}
        onChange={handleChange}
      />

      <textarea
        name="description"
        placeholder="Описание"
        value={task.description}
        onChange={handleChange}
      />

      <select
        name="status"
        value={task.status}
        onChange={handleChange}
      >
        <option value="pending">Pending</option>
        <option value="in-progress">In Progress</option>
        <option value="done">Done</option>
      </select>

      <button type="submit">
        {editingTask ? "Сохранить" : "Добавить"}
      </button>
    </form>
  );
};

export default TaskForm;