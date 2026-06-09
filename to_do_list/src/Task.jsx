const ToDo = ({ todo, toggleTask, removeTask }) => {
  return (
    <div key={todo.id + todo.key} className="space-todo-item">
      <div
        onClick={() => toggleTask(todo.id)}
        className={todo.complete ? "space-text space-strike" : "space-text"}
      >
        {todo.task}
      </div>
      <div className="space-delete-btn" onClick={() => removeTask(todo.id)}>
        [X]
      </div>
    </div>
  );
};

export default ToDo;