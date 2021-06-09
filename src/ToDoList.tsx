import React, {ChangeEvent} from 'react';
import {FilterValuesType, TaskType} from "./App";
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";
import {Button, Checkbox} from "@material-ui/core";
import {IconButton} from '@material-ui/core';
import {Delete} from "@material-ui/icons";


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
                    <Checkbox
                        checked={t.isDone}
                        onChange={changeTaskStatus}
                    />
                    <EditableSpan title={t.title} changeTitle={changeTaskTitle}/>

                    <IconButton onClick={removeTask}> <Delete /> </IconButton>
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
                <IconButton
                    onClick={() => props.removeTodoList(props.todoListID)}
                > <Delete />
                </IconButton>
            </h3>
            <AddItemForm addItem={addTask}/>
            <ul>
                {tasksJSXElements}
            </ul>
            <div>
                <Button
                    variant={filter === "all" ? "contained" : "text"}
                    onClick={onClickSetAllFilter}>All
                </Button>
                <Button
                    color={"primary"}
                    variant={filter === "active" ? "contained" : "text"}
                    onClick={onClickSetActiveFilter}>Active
                </Button>
                <Button
                    color={"secondary"}
                    variant={filter === "completed" ? "contained" : "text"}
                    onClick={onClickSetCompletedFilter}>Completed
                </Button>
            </div>
        </div>
    )
}

export default TodoList;