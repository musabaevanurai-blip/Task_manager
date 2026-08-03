function TaskItem({
  task,
  toggleStatus,
  deleteTask,
  editTask,
}) {
  return (
    <div className="task">
      <span
        style={{
          textDecoration: task.completed
            ? "line-through"
            : "none",
        }}
      >
        {task.text}
      </span>

      <div>
        <button
          className="done"
          onClick={() => toggleStatus(task.id)}
        >
          {task.completed ? "Undo" : "Done"}
        </button>

        <button
          className="edit"
          onClick={() => editTask(task.id)}
        >
          Edit
        </button>

        <button
          className="delete"
          onClick={() => deleteTask(task.id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default TaskItem;
