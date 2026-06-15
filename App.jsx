import { useEffect, useState } from "react";
import axios from "axios";

import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

import "./App.css";

const API_URL = "http://localhost:5000/api/tasks";

function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch all tasks
  const fetchTasks = async () => {
    try {
      const res = await axios.get(API_URL);
      setTasks(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Add task
  const addTask = async (taskData) => {
    try {
      await axios.post(API_URL, taskData);
      fetchTasks();
    } catch (error) {
      console.error(error);
    }
  };

  // Delete task
  const deleteTask = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchTasks();
    } catch (error) {
      console.error(error);
    }
  };

  // Toggle completion status
  const toggleTask = async (task) => {
    try {
      await axios.put(`${API_URL}/${task._id}`, {
        completed: !task.completed,
      });

      fetchTasks();
    } catch (error) {
      console.error(error);
    }
  };

  const filteredTasks = tasks.filter((task) => {
  // Status Filter
  if (filter === "Completed" && !task.completed)
    return false;

  if (filter === "Pending" && task.completed)
    return false;

  // Search Filter
  return task.title
    .toLowerCase()
    .includes(searchTerm.toLowerCase());
});

  return (
    <div className="container">
      <h1>Smart To-Do Manager</h1>

      <div className="filter-buttons">
  <button onClick={() => setFilter("All")}>All</button>
  <button onClick={() => setFilter("Pending")}>Pending</button>
  <button onClick={() => setFilter("Completed")}>Completed</button>
</div>

      <div className="search-box">
        <input
          type="text"
          placeholder="Search tasks..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <TaskForm onAddTask={addTask} />


      <div className="task-summary">
  <p>Total Tasks: {tasks.length}</p>

  <p>
    Completed: {tasks.filter(task => task.completed).length}
  </p>

  <p>
    Pending: {tasks.filter(task => !task.completed).length}
  </p>
</div>
      <TaskList
        tasks={filteredTasks}
        onDelete={deleteTask}
        onToggle={toggleTask}
      />
    </div>
  );
}

export default App;