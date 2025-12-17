import { useState } from "react";
import { DragDropContext } from "@hello-pangea/dnd";
import Column from "./Column";
import "./App.css";

const initialData = {
    tasks: {
        // a task is an object with id and content that will be used in the Column component
        "task-1": { id: "task-1", content: "Estudar React" },
        "task-2": { id: "task-2", content: "Configurar Node" },
        "task-3": { id: "task-3", content: "Ver filme" },
    },
    columns: {
        "col-1": {
            id: "col-1",
            title: "To do",
            taskIds: ["task-1", "task-2"], // for now the tasks are hard coded, but they will be fetched from a database
        },
        "col-2": {
            id: "col-2",
            title: "Doing",
            taskIds: ["task-3"],
        },
        "col-3": {
            id: "col-3",
            title: "Done",
            taskIds: [],
        },
    },

    // setting the order of columns once eases the process
    columnOrder: ["col-1", "col-2", "col-3"],
};

function App() {
    // state is used to store data and update the UI dinamically
    const [data, setData] = useState(initialData);

    // whenever a task is dragged and dropped this function will be called
    const onDragEnd = (result) => {
        // this 'result' will tell where the item came from, and where it will go to
        const { destination, source, draggableId } = result;

        if (!destination) return; // if there is nowhere to go, such as dropping outside the board, returns

        if (
            destination.droppableId === source.droppableId && // if the task is dropped in the same column
            destination.index === source.index // and if the task is dropped in the same position
        ) {
            return; 
        }
        // now that specific cases are covered, the main logic can be written

        const startColumn = data.columns[source.droppableId]; // where the task came from
        const finishColumn = data.columns[destination.droppableId]; // where the task will go to

        // FIRST CASE: the task is dropped in the same column
        if (startColumn === finishColumn) {
            // the original array is never changed
            const newTaskIds = Array.from(startColumn.taskIds);
            // removes the task from the old index
            newTaskIds.splice(source.index, 1);
            // adds it to the new index
            newTaskIds.splice(destination.index, 0, draggableId);
            // .splice() asks for the index to start removing, and how many elements to remove
            // can also add new elements in the removed position

            const newColumn = { // the original array is never changed
                ...startColumn, // a new array is created with the rest of the starting column
                taskIds: newTaskIds, // the taskIds are replaced with the new taskIds, already spliced
            };

            setData((prev) => ({ // prev comes from this very same function, it will be populated while the function is running
                ...prev,
                columns: {
                    ...prev.columns, // the rest of the columns are kept
                    [newColumn.id]: newColumn, // and the new one is added
                },
            }));

            return;
        }

        // SECOND CASE: the task is dropped in a different column
        const startTaskIds = Array.from(startColumn.taskIds); // create a copy of the array
        startTaskIds.splice(source.index, 1); // remove the task by splicing the array
        const newStartColumn = { // create a new object
            ...startColumn, // keep the rest of the original column
            taskIds: startTaskIds, // and replace the taskIds
        };

        const finishTaskIds = Array.from(finishColumn.taskIds); // create a copy of the array
        finishTaskIds.splice(destination.index, 0, draggableId); // in the destination index, doesn't remove anything (0), and just add the task
        const newFinishColumn = { // create a new object
            ...finishColumn, // keep the rest of the original column
            taskIds: finishTaskIds, // and replace the taskIds
        };

        setData((prev) => ({ // prev is populated while the function is running
            ...prev,
            columns: {
                ...prev.columns, // the rest of the columns are kept
                [newStartColumn.id]: newStartColumn,
                [newFinishColumn.id]: newFinishColumn,
            },
        }));
    };

    return (
        <div className="App">
            <DragDropContext onDragEnd={onDragEnd}> {/* onDragEnd is the function that will be called when a task is dragged and dropped */}
                <div className="board-container">
                    {data.columnOrder.map((columnId) => { // mapping columnOrder works as a for each, returning all the columns and the tasks within them 
                        const column = data.columns[columnId];
                        const tasks = column.taskIds.map(
                            (taskId) => data.tasks[taskId]
                        );

                        return (
                            <Column
                                key={column.id}
                                column={column}
                                tasks={tasks}
                            />
                        );
                    })}
                </div>
            </DragDropContext>
        </div>
    );
}

export default App;
