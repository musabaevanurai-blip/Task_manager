import { useState } from 'react'
import './App.css'
import TaskForm from './components/TaskForm/TaskForm'

function App() {
  // 1. Состояние для списка задач и редактируемой задачи
  const [tasks, setTasks] = useState([])
  const [editingTask, setEditingTask] = useState(null)

  // 2. Функция добавления задачи
  const addTask = (task) => {
    setTasks([...tasks, { ...task, id: Date.now() }])
  }

  // 3. Функция обновления задачи
  const updateTask = (updatedTask) => {
    setTasks(tasks.map(t => t.id === updatedTask.id ? updatedTask : t))
    setEditingTask(null)
  }

  return (
    <>
      <TaskForm
        onAddTask={addTask}
        onUpdateTask={updateTask}
        editingTask={editingTask}
      />
    </>
  )
}

export default App