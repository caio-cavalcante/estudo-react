import { Droppable } from "@hello-pangea/dnd";
// DnD (Drop n' Drag) is a library that allows the user to drag and drop elements around
// Droppable is where Draggable elements can be dropped in or dragged out
import Task from "./Task";
// importing the other component to be used

function Column({ column, tasks }) {
    return (
        <div className="column">
            <h3>{column.title}</h3>

            <Droppable droppableId={column.id}>
                {/* droppable is the element from dnd that has draggable children */}
                {(provided) => (
                    <div
                        className="task-list"
                        ref={provided.innerRef} // access the inner reference of the provided element
                        {...provided.droppableProps} // from the provided element, inject the necessary styles and events from its props
                    >
                        {tasks.map((task, index) => ( // map is used as a for each
                            <Task
                                key={task.id}
                                task={task}
                                index={index}
                            ></Task>
                        ))}
                        {provided.placeholder} {/* keeps the original space before dragging an element out of the column */}
                    </div>
                )}
            </Droppable>
        </div>
    );
}

export default Column;
