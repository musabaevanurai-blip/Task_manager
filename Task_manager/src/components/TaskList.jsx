import TaskItem from "./TaskItem";

function TaskList({
  tasks,
  toggleStatus,
  deleteTask,
  editTask,
}) {
  return (
    <div>
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          toggleStatus={toggleStatus}
          deleteTask={deleteTask}
          editTask={editTask}
        />
      ))}
    </div>
  );
}

export default TaskList;
