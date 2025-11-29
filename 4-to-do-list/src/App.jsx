import { useState } from "react";
import "./App.css";

// tomorrow i'll add notes on what and why i'm doing, so i understand myself
function App() {
    const [tasks, setTasks] = useState([]);
    const [inputValue, setInputValue] = useState("");

    const handleAddTask = () => {
        if (!inputValue) return;

        const newTask = {
            id: Date.now(),
            text: inputValue,
            isCompleted: false
        };

        setTasks([...tasks, newTask]);
        setInputValue("");
    };

    const toggleTaskCompletion = (taskId) => {
        const newTasks = tasks.map((task) => {
            if (task.id === taskId) {
                return { ...task, isCompleted: !task.isCompleted };
            }

            return task;
        })

        setTasks(newTasks);
    }

    const deleteTask = (taskId) => {
        const newTasks = tasks.filter((task) => task.id !== taskId);
        setTasks(newTasks);
    }

    return (
        <div className="App">
            <h1>My To-Do List</h1>

            <div className="add-task">
                <input
                    type="text"
                    placeholder="Add a task"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                />

                <button onCLick={handleAddTask}>Add</button>
            </div>

            <ul className="task-list">
                {tasks.map((task) => (
                    <li key={task.id} className="{`task ${task.completed ? 'completed' : ''}`}">
                        <span onClick={() => toggleTaskCompletion(task.id)}>
                            {task.text}
                        </span>

                        <button onClick={() => deleteTask(task.id)}>X</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;