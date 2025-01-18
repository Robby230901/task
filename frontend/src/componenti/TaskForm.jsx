import React, { useState } from "react";

function TaskForm({ addTask }) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title.trim()) return;
        addTask({ title, description });
        setTitle("");
        setDescription("");
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="card shadow-lg p-4 border-0 rounded"
        >
            {/* Usa classi card */}
            <h2 className="mb-4">Aggiungi Task</h2>
            {/* Aggiungi un titolo */}
            <div className="mb-3">
                <label htmlFor="title" className="form-label">
                    Titolo del Task:
                </label>
                <input
                    type="text"
                    className="form-control"
                    id="title"
                    placeholder="Inserisci il titolo del task"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
            </div>
            <div className="mb-3">
                <label htmlFor="description" className="form-label">
                    Descrizione del Task:
                </label>
                <textarea
                    className="form-control"
                    id="description"
                    placeholder="Inserisci la descrizione del task"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </div>
            <div className="d-grid gap-2">
                <button type="submit" className="btn btn-primary">
                    Aggiungi Task:
                </button>
            </div>
        </form>
    );
}

export default TaskForm;