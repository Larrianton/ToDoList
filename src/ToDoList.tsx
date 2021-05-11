import React, {ChangeEvent, KeyboardEvent , useState} from 'react';
import {FilterValuesType, TaskType} from "./App";


export type PropsTodolistType = {
    title: String
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    changeToDoListFilter: (filterValue: FilterValuesType) => void
    addTask: (title: string) => void
}

function TodoList(props: PropsTodolistType) {


    const tasksJSXElements = props.tasks.map(t => {
        const OnRemoveHandler = () => props.removeTask(t.id)
        return (

            <li>
                <input type="checkBox" checked={t.isDone}/>
                <span>{t.title}</span>
                <button onClick={OnRemoveHandler}>X</button>
            </li>
        )
    })

    const [newTaskTitle, setNewTaskTitle] = useState("")
    const addTask = () => {
        props.addTask(newTaskTitle)
        setNewTaskTitle("")
    }

    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => setNewTaskTitle(e.currentTarget.value)
    const onKeyPressChangeHandler = (e:KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            addTask()
        }
    }
    const onAllClickHandler = () => props.changeToDoListFilter("all")
    const onActiveClickHandler = () => props.changeToDoListFilter("active")
    const onCompletedClickHandler = () => props.changeToDoListFilter("completed")
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={newTaskTitle} onChange={onNewTitleChangeHandler}
                       onKeyPress={onKeyPressChangeHandler}/>
                <button onClick={addTask}>+</button>
            </div>
            <ul>
                {tasksJSXElements}
            </ul>
            <div>
                <button onClick={onAllClickHandler}>All</button>
                <button onClick={onActiveClickHandler}>Active</button>
                <button onClick={onCompletedClickHandler}>Completed</button>
            </div>
        </div>
    );
}

export default TodoList