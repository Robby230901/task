import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import TaskItem from './TaskItem';
import TaskForm from './TaskForm';

function TaskList() {
    const [tasks, setTasks] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/tasks', {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            });
            setTasks(response.data);
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };

    const addTask = async (task) => {
        try {
            const response = await axios.post('http://localhost:5000/api/tasks', task, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            });
            setTasks([...tasks, response.data]);
        } catch (error) {
            console.error('Error adding task:', error);
        }
    };

    const updateTask = async (id, updatedTask) => {
        try {
            const response = await axios.put(`http://localhost:5000/api/tasks/${id}`, updatedTask, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            });
            setTasks(tasks.map((task) => (task._id === id ? response.data : task)));
        } catch (error) {
            console.error('Errore aggiornamento task:', error);
        }
    };

    const deleteTask = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/tasks/${id}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            });
            setTasks(tasks.filter((task) => task._id !== id));
        } catch (error) {
            console.error('Errore eliminazione task:', error);
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    const filteredTasks = tasks.filter(task =>
        task.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="container mx-auto p-4">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Task Manager ☑️ </h1>
                <button onClick={logout} className="bg-red-500 text-black px-4 py-2 rounded">
                    Logout 
                </button>
            </div>
            <div className="flex mb-4">
                <input
                    type="text"
                    placeholder="Cerca tasks... ⏳"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="p-2 border rounded"
                />
            </div>
            <TaskForm addTask={addTask} />
            <div className="mt-4">
                {filteredTasks.map((task) => (
                    <TaskItem
                        key={task._id}
                        task={task}
                        updateTask={updateTask}
                        deleteTask={deleteTask}
                    />
                ))}
            </div>
        </div>
    );
}

export default TaskList;

