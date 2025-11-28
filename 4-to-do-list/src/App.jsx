import { useState } from "react";
import "./App.css";

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

    // tomorrow i'll add update and delete functions

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

            <div className="task-list">
                {tasks.map((task) => (
                    <div key={task.id} className="{`task ${task.completed ? 'completed' : ''}`}">
                        <span>{task.text}</span>
                        {/* i need to add update and delete functions */}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default App;