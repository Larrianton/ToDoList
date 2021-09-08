import React, {ChangeEvent} from 'react';
import {Checkbox, IconButton} from "@material-ui/core";
import EditableSpan from "./EditableSpan";
import {Delete} from "@material-ui/icons";
import {TaskType} from "./App";

export type TaskPropsType = {
    todoListID: string
    task: TaskType
    changeTaskTitle: (taskID: string, title: string, todoListID: string) => void
    changeTaskStatus: (taskID: string, isDone: boolean, todoListID: string) => void
    removeTask: (taskID: string, todoListID: string) => void
}


const Task = React.memo((props: TaskPropsType) => {
    console.log("Task")
    const removeTask = () => props.removeTask(props.task.id, props.todoListID)
    const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
        props.changeTaskStatus(props.task.id, e.target.checked, props.todoListID)
    }
    const changeTaskTitle = (title: string) => props.changeTaskTitle(props.task.id, title, props.todoListID)
    return <li key={props.task.id} className={props.task.isDone ? "is-done" : ""}>
        <Checkbox
            checked={props.task.isDone}
            onChange={changeTaskStatus}
        />
        <EditableSpan title={props.task.title} changeTitle={changeTaskTitle}/>

        <IconButton onClick={removeTask}> <Delete/> </IconButton>
    </li>
})
export default Task