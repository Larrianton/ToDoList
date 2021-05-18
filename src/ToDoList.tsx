import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType, TaskType} from "./App";


export type PropsTodolistType = {
    title: String
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    changeToDoListFilter: (filterValue: FilterValuesType) => void
    addTask: (title: string) => void
    filter: FilterValuesType
    checkValueTask: (taskId:string,isDone:boolean) => void
}

function TodoList(props: PropsTodolistType) {

    const [error, setError] = useState<string | null>(null)
    const tasksJSXElements = props.tasks.map(t => {
        let taskClass = t.isDone ? "is-done" : ""
        const OnRemoveHandler = () => props.removeTask(t.id)
        return (

            <li key={t.id} className={taskClass}>
                <input type="checkBox" checked={t.isDone}
                onChange={(e)=> props.checkValueTask(t.id,e.currentTarget.checked)}/>
                <span>{t.title}</span>
                <button onClick={OnRemoveHandler}>X</button>

            </li>
        )
    })

    const [newTaskTitle, setNewTaskTitle] = useState("")
    const addTask = () => {
        let validateNewTaskTitle = newTaskTitle.trim()
        if (validateNewTaskTitle !== "") {
            props.addTask(newTaskTitle)
        } else {
            setError("Title is required")
        }
        setNewTaskTitle("")
    }

    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => setNewTaskTitle(e.currentTarget.value)
    const onKeyPressChangeHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.key === "Enter") {
            addTask()
        }
    }
    const onAllClickHandler = () => props.changeToDoListFilter("all")
    const onActiveClickHandler = () => props.changeToDoListFilter("active")
    const onCompletedClickHandler = () => props.changeToDoListFilter("completed")
    const errorClass = error ? "error" : ""

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={newTaskTitle} onChange={onNewTitleChangeHandler}
                       onKeyPress={onKeyPressChangeHandler} className={errorClass}/>
                <button onClick={addTask}>+</button>
                {error && <div className={"error-message"}>{error}</div>}
            </div>
            <ul>
                {tasksJSXElements}
            </ul>
            <div>
                <button className={props.filter === "all" ? "active-filter" : ""}
                        onClick={onAllClickHandler}>All
                </button>
                <button className={props.filter === "active" ? "active-filter" : ""}
                        onClick={onActiveClickHandler}>Active
                </button>
                <button className={props.filter === "completed" ? "active-filter" : ""}
                        onClick={onCompletedClickHandler}>Completed
                </button>
            </div>
        </div>
    );
}

export default TodoList