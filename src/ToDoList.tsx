import React, {ChangeEvent} from 'react';
import {FilterValuesType, TaskType} from "./App";
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";

type PropsTodoListType = {
    todoListID: string
    title: string
    tasks: Array<TaskType>
    filter: FilterValuesType
    addTask: (title: string, todoListID: string) => void
    removeTask: (taskID: string, todoListID: string) => void
    removeTodoList: (todoListID: string) => void
    changeTaskStatus: (taskID: string, isDone: boolean, todoListID: string) => void
    changeTodoListFilter: (filterValue: FilterValuesType, todoListID: string) => void
    changeTodoListTitle: (title: string, todoListID: string) => void
    changeTaskTitle: (taskID: string, title: string, todoListID: string) => void
}

function TodoList(props: PropsTodoListType) {
    const {filter} = props


    const tasksJSXElements = props.tasks.map(t => {
            // let taskClass = t.isDone ?  "is-done" : ""
            const removeTask = () => props.removeTask(t.id, props.todoListID)
            const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
                props.changeTaskStatus(t.id, e.target.checked, props.todoListID)
            }
            const changeTaskTitle = (title: string) => props.changeTaskTitle(t.id, title, props.todoListID)
            return (
                <li key={t.id} className={t.isDone ? "is-done" : ""}>
                    <input
                        type="checkbox"
                        checked={t.isDone}
                        onChange={changeTaskStatus}
                    />
                    <EditableSpan title={t.title} changeTitle={changeTaskTitle}/>
                    {/*<span>{t.title}</span>*/}
                    <button onClick={removeTask}>X</button>
                </li>
            )
        }
    )

    const addTask = (title: string) => props.addTask(title, props.todoListID)
    const changeTodoListTitle = (title: string) => props.changeTodoListTitle(title, props.todoListID)

    const onClickSetAllFilter = () => props.changeTodoListFilter("all", props.todoListID)
    const onClickSetActiveFilter = () => props.changeTodoListFilter("active", props.todoListID)
    const onClickSetCompletedFilter = () => props.changeTodoListFilter("completed", props.todoListID)

    return (
        <div>
            <h3>
                <EditableSpan title={props.title} changeTitle={changeTodoListTitle}/>
                <button
                    onClick={() => props.removeTodoList(props.todoListID)}
                >Х
                </button>
            </h3>
            <AddItemForm addItem={addTask}/>
            <ul>
                {tasksJSXElements}
            </ul>
            <div>
                <button
                    className={filter === "all" ? "active-filter" : ""}
                    onClick={onClickSetAllFilter}>All
                </button>
                <button
                    className={filter === "active" ? "active-filter" : ""}
                    onClick={onClickSetActiveFilter}>Active
                </button>
                <button
                    className={filter === "completed" ? "active-filter" : ""}
                    onClick={onClickSetCompletedFilter}>Completed
                </button>
            </div>
        </div>
    )
}

export default TodoList;