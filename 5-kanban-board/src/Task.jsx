import { Draggable } from "@hello-pangea/dnd";
// DnD (Drop n' Drag) is a library that allows the user to drag and drop elements around
// the Draggable element can be dragged by the user by a grab handle (this can be the Draggable itself)

function Task({ task, index }) {
    return (
        // draggableId will allow a .map() to work as a for each for the tasks array
        <Draggable draggableId={task.id} index={index}>
            {/* draggable is the element from dnd that allows its children to be draggable */}
            {(provided) => ( // provided is the element from dnd that has draggable children
                <div
                    className="task-card"
                    ref={provided.innerRef} // this avoids the need to use ReactDOM to get the element
                    {...provided.draggableProps} // by spreading 'provided' it is possible to inject the necessary styles and events
                    {...provided.dragHandleProps} // every draggable element must have a drag handle
                >
                    {task.content}
                </div>
            )}
        </Draggable>
    );
}

export default Task;
