import React from 'react';
import {FilterValuesType, TaskType} from "./App";


export type PropsTodolistType = {
    title: String
    tasks: Array<TaskType>
    removeTask : (taskId:number) => void
    changeToDoListFilter: (filterValue:FilterValuesType) => void
}

function TodoList(props: PropsTodolistType) {

    const tasksJSXElements = props.tasks.map(t => {
        const removeTask1 = () => props.removeTask(t.id)
        return (
            <li>
                <input type="checkbox" checked={t.isDone}/>
                <span>{t.title}</span>
                <button onClick={removeTask1}>X</button>
            </li>
        )
    } )
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {tasksJSXElements}
            </ul>
            <div>
                <button onClick={() => props.changeToDoListFilter("all") }>All</button>
                <button onClick={() => props.changeToDoListFilter("active")}>Active</button>
                <button onClick={() => props.changeToDoListFilter("completed")}>Completed</button>
            </div>
        </div>
    );
}

export default TodoList