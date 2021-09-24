import React, {useEffect, useState} from 'react'
import {tasksAPI} from "../api/tasks-api";

export default {
    title: 'API'
}


export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        tasksAPI.getTasks("5cd8f80b-99a5-4084-b093-3bb3ca06d868" )
            .then((res) => {
                setState(res.data);
            })

    }, [])

    return <div> {JSON.stringify(state)}</div>


    return <div> {JSON.stringify(state)}</div>
}
export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        tasksAPI.createTask(`5cd8f80b-99a5-4084-b093-3bb3ca06d868`,"first task")
            .then((res) => {
                setState(res.data);
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        tasksAPI.deleteTask(`5cd8f80b-99a5-4084-b093-3bb3ca06d868` ,"1b91c127-0c50-433f-8e08-7b523802699d")
            .then((res) => {
                setState(res.data);
            })

    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const UpdateTaskTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        tasksAPI.updateTask('5cd8f80b-99a5-4084-b093-3bb3ca06d868',"793912d3-8805-41ac-a553-c830b49c8e88", 'SOME NEW TasK TITLE2')
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}


