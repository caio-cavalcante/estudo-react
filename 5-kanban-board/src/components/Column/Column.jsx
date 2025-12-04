import { Droppable } from '@hello-pangea/dnd';
import Task from './Task';

function Column({ column, tasks }) {
    return (
        <div className="column">
        <h3>{column.title}</h3>
        
        <Droppable droppableId={column.id}>
            {(provided) => (
            <div
                className="task-list"
                ref={provided.innerRef}
                {...provided.droppableProps}
            >
                {tasks.map((task, index) => (
                <Task key={task.id} task={task} index={index} />
                ))}
                {provided.placeholder} {/* Mantém o espaço enquanto arrasta */}
            </div>
            )}
        </Droppable>
        </div>
    );
}
export default Column;