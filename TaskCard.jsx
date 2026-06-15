function TaskCard({ task, onDelete, onToggle }) {
  return (
    <div className={`task-card ${task.completed ? "completed" : ""}`}>
      <h3>{task.title}</h3>

      <p>{task.description}</p>

      <p>
            <strong>Priority:</strong>

                <span
                    className={`priority ${task.priority.toLowerCase()}`}
                        >
                            {task.priority}
                </span>
        </p>
      
      

      {task.dueDate && (
        <p>
          <strong>Due:</strong>{" "}
          {new Date(task.dueDate).toLocaleDateString()}
        </p>
      )}

      <p>
        <strong>Status:</strong>{" "}
        {task.completed ? "Completed" : "Pending"}
      </p>

      <div className="task-actions">
        <button onClick={() => onToggle(task)}>
          {task.completed ? "Undo" : "Complete"}
        </button>

        <button onClick={() => onDelete(task._id)}>
          Delete
        </button>
      </div>
    </div>
  );
}

export default TaskCard;