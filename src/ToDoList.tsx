import React, {useCallback} from 'react';
import {FilterValuesType, TaskType} from "./App";
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";
import {Button, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import Task from "./Task";


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

const TodoList = React.memo((props: PropsTodoListType) => {
    console.log("TOdoList")

    let allToDoListTasks = props.tasks
    let tasksForToDoList = allToDoListTasks

    if (props.filter === "active") {
        tasksForToDoList = allToDoListTasks.filter(t => !t.isDone)
    }
    if (props.filter === "completed") {
        tasksForToDoList = allToDoListTasks.filter(t => t.isDone)
    }


    const addTask = useCallback((title: string) => props.addTask(title, props.todoListID), [props.addTask, props.todoListID])
    const changeTodoListTitle =useCallback ((title: string) => props.changeTodoListTitle(title, props.todoListID),[props.todoListID,props.changeTodoListTitle])
    const onClickSetAllFilter = useCallback(() => props.changeTodoListFilter("all", props.todoListID), [props.todoListID,props.changeTodoListFilter])
    const onClickSetActiveFilter = useCallback(() => props.changeTodoListFilter("active", props.todoListID), [props.todoListID,props.changeTodoListFilter])
    const onClickSetCompletedFilter = useCallback(() => props.changeTodoListFilter("completed", props.todoListID), [props.todoListID,props.changeTodoListFilter])


    return (
        <div>
            <h3>
                <EditableSpan title={props.title} changeTitle={changeTodoListTitle}/>
                <IconButton
                    onClick={() => props.removeTodoList(props.todoListID)}
                > <Delete/>
                </IconButton>
            </h3>
            <AddItemForm addItem={addTask}/>
            <ul>
                {tasksForToDoList.map(t => {

                        return <Task key={t.id}
                                     todoListID={props.todoListID}
                                     task={t}
                                     changeTaskTitle={props.changeTaskTitle}
                                     changeTaskStatus={props.changeTaskStatus}
                                     removeTask={props.removeTask}
                        />
                    }
                )}
            </ul>
            <div>
                <Button
                    variant={props.filter === "all" ? "contained" : "text"}
                    onClick={onClickSetAllFilter}>All
                </Button>
                <Button
                    color={"primary"}
                    variant={props.filter === "active" ? "contained" : "text"}
                    onClick={onClickSetActiveFilter}>Active
                </Button>
                <Button
                    color={"secondary"}
                    variant={props.filter === "completed" ? "contained" : "text"}
                    onClick={onClickSetCompletedFilter}>Completed
                </Button>
            </div>
        </div>
    )
})

export default TodoList;