import React, { useState } from "react";

function TaskItem({ task, updateTask, deleteTask }) {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    if (name === "title") {
      setTitle(value);
    } else if (name === "description") {
      setDescription(value);
    }
  };

  const handleEdit = () => {
    setEditing(true);
  };

  const handleSave = () => {
    updateTask(task._id, { title, description });
    setEditing(false);
  };

  const handleDelete = () => {
    deleteTask(task._id);
  };

  const handleCancel = () => {
    setEditing(false);
    setTitle(task.title);
    setDescription(task.description);
  };

  const handleToggleCompletion = () => {
    updateTask(task._id, { completed: !task.completed });
  };

  return (
    <div className="card shadow-lg p-4 mb-4">
      {editing ? (
        <div>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              name="title"
              value={title}
              onChange={handleEditChange}
            />
          </div>
          <div className="mb-3">
            <textarea
              className="form-control"
              name="description"
              value={description}
              onChange={handleEditChange}
            />
          </div>
          <button onClick={handleSave} className="btn btn-success me-1">
            Salva
          </button>
          <button onClick={handleCancel} className="btn btn-secondary me-1">
            Annulla
          </button>
        </div>
      ) : (
        <div>
          <h3 className="mb-2">{task.title}</h3>
          {task.description && <p>{task.description}</p>}
          <div>
            <button onClick={handleEdit} className="btn btn-primary me-1">
              Modifica 
            </button>
            <button onClick={handleDelete} className="btn btn-danger me-1">
              Elimina
            </button>
            <button
              onClick={handleToggleCompletion}
              className={`btn ${task.completed ? 'btn-success' : 'btn-secondary'}`}
            >
              {task.completed ? 'Completata' : 'Non Completata'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default TaskItem;