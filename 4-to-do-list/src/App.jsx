import { useState } from "react";
import "./App.css";

function App() {
    // states are used to store data and update the UI dinamically 
    const [tasks, setTasks] = useState([]);
    const [inputValue, setInputValue] = useState("");
    const [editId, setEditId] = useState(null);
    const [editValue, setEditValue] = useState("");

    // this functions works as the C in CRUD, to create new items in the tasks array, according to the user input
    const handleAddTask = () => {
        if (!inputValue) return; // if the user writes nothing, nothing will change

        const newTask = { // this object will be added to the tasks array
            id: Date.now(), // the id will be the current timestamp, as 2 tasks can't be created at the same time
            // this should change if using an online database, as multiple users can create multiple tasks
            text: inputValue,
            isCompleted: false // a task will be completed, and this boolean will control the work flow
        };

        setTasks([...tasks, newTask]); // setting a copy of the array with a spread operator, keeping all the other tasks, and adding the new one
        setInputValue(""); // resets the input value and allows the user to write again
    };

    // working as the U in CRUD, to update the isCompleted state. Later CSS will make the text strikethrough
    const toggleTaskCompletion = (taskId) => { // arrow functions will be better to know and use in the long run
        const newTasks = tasks.map((task) => { // .map() acts as a for each loop
            if (task.id === taskId) { // clicking in a task will match the correct task in the array...
                return { ...task, isCompleted: !task.isCompleted }; // ...change the boolean in that object...
            } // ...and keep the rest (...task) as it is, even within the task object being altered

            return task; // if the taskId is not matching, just returns the array as it is
        })

        setTasks(newTasks); // doesnt change the original array, but creates a copy and set it as the one to use
    }

    // most normal D in CRUD, will delete the task with the matching id
    const deleteTask = (taskId) => {
        const newTasks = tasks.filter((task) => task.id !== taskId); // filter makes a new array, only without the one where taskId, from deleteTask parameter, matches
        setTasks(newTasks); // again, practicing the immutability concept, where no array is altered, just copied
    }

    // this is needed to change the text of the task to an input field
    const startEdit = (taskId) => {
        const taskToEdit = tasks.find((task) => task.id === taskId);
        setEditId(taskId); // now the editId is the same as the clicked taskId 
        setEditValue(taskToEdit.text); // and the editValue is the text of the task
    }

    // before saving the edited task, some checks are needed
    const saveEdit = (taskId) => {
        const trimmedEditValue = editValue.trim(); // removes leading and trailing spaces

        if (trimmedEditValue === editId.text) { // if the trimmedEditValue is the same as the task text
            cancelEdit(); // just cancel the edit to avoid unnecessary state updates
            return;
        }

        if (!trimmedEditValue) { // if the trimmedEditValue is empty
            alert("Task can't be empty"); // display an alert to encourage the user to write something or cancel
            return;
        }

        const newTasks = tasks.map((task) => { // map is used as a for each
            if (task.id === taskId) { // in the task where taskId is the same as the clicked taskId
                return { ...task, text: editValue }; // change the text to the new edited one
            }

            return task;
        });

        setTasks(newTasks); // update the tasks array
        setEditId(null); // reset the editId to allow new edits
        setEditValue(''); // also reset the editValue for the same reason
    }

    const cancelEdit = () => { // in case the user wants to cancel the edit
        setEditId(null); // the resets happen again
        setEditValue(''); // allowing new edits in the future
    }

    return (
        <div className="container">
            <h1>My To-Do List</h1>

            <div className="input-group">
                <input
                    type="text"
                    placeholder="Add a task"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)} // always alter the inputValue to match what is being written
                    onKeyDown={(e) => e.key === 'Enter' && handleAddTask()} // allows to add tasks with enter
                />

                <button onClick={handleAddTask}>Add</button> {/* tasks can also be added with the button */}
            </div>

            <ul className="list">
                {tasks.map((task) => ( // map is used as a for each, and this is the R in CRUD, Reading all the tasks
                    <li key={task.id} className={`task ${task.isCompleted ? 'done' : ''}`}> {/* class name will change the styling of the task */}
                        {task.id === editId ? (
                            <>
                                <input
                                    type="text"
                                    value={editValue}
                                    onChange={(e) => setEditValue(e.target.value)} // this will then always alter the editValue to match what is being written
                                    onKeyDown={(e) => { // allow the user to save or cancel the edit
                                        if (e.key === 'Enter') saveEdit(task.id); // with Enter key
                                        if (e.key === 'Escape') cancelEdit(); // with Escape key
                                    }}
                                    autoFocus // focus on the input field when the user triggers an edit
                                />

                                <button 
                                    className="save-button" 
                                    onClick={() => saveEdit(task.id)}>
                                    Save
                                </button>

                                <button 
                                    className="cancel-button" 
                                    onClick={cancelEdit}>
                                    Cancel
                                </button>
                            </>
                        ) : (
                            <>
                                <span onClick={() => toggleTaskCompletion(task.id)}> {/* if the span element is clicked, the toggleTaskCompletion function will be called, and change the isCompleted boolean */}
                                    {task.text}
                                </span>

                                <button className="edit-button" onClick={() => startEdit(task.id)}>Edit</button>
                                {/* the startEdit function will used to link the taskId to the editId, then adding the textValue to an input field */}

                                <button className="delete-button" onClick={() => deleteTask(task.id)}>X</button> {/* just to delete on click */}
                            </>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;