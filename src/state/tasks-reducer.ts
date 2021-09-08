import {TasksStateType, TaskType} from "../App";
import {v1} from "uuid";
import {AddTodoListAT, RemoveTodoListAT, todoListID_1, todoListID_2} from "./todolists-reducer";

type RemoveTaskAT = {
    type: "REMOVE-TASK"
    taskId: string
    todoListId: string
}
type ChangeTaskStatusAT = {
    type: "CHANGE-TASK-STATUS"
    isDone: boolean
    todoListId: string
    taskId: string

}
type ChangeTaskTitleAT = {
    type: "CHANGE-TASK-TITLE"
    title: string
    todoListId: string
    taskId: string

}
type AddTaskAT = {
    type: "ADD-TASK"
    todoListId: string
    title: string
}


const InitialState: TasksStateType = {
    [todoListID_1]: [
        {id: v1(), title: "JS", isDone: false},
        {id: v1(), title: "CSS", isDone: false},
        {id: v1(), title: "HTML", isDone: true},
    ],
    [todoListID_2]: [
        {id: v1(), title: "Milk", isDone: false},
        {id: v1(), title: "Bread", isDone: false},
        {id: v1(), title: "Meat", isDone: true},
    ],
}

export type ActionType =
    RemoveTaskAT
    | ChangeTaskStatusAT
    | AddTaskAT
    | ChangeTaskTitleAT
    | AddTodoListAT
    | RemoveTodoListAT
export const tasksReducer = (state = InitialState, action: ActionType): TasksStateType => {
    switch (action.type) {
        case "REMOVE-TASK":
            return {
                ...state,
                [action.todoListId]: state[action.todoListId].filter(t => t.id !== action.taskId)
            }
        case "ADD-TASK" :
            const newTask: TaskType = {
                id: v1(),
                title: action.title,
                isDone: false
            }
            return {
                ...state,
                [action.todoListId]: [newTask, ...state[action.todoListId]]
            }

        case "CHANGE-TASK-STATUS" :
            return {
                ...state,
                [action.todoListId]: state[action.todoListId].map(t => t.id === action.taskId ? {
                    ...t,
                    isDone: action.isDone
                } : t)
            }
        case "CHANGE-TASK-TITLE":
            return {
                ...state,
                [action.todoListId]: state[action.todoListId].map(t => t.id === action.taskId ? {
                    ...t,
                    title: action.title
                } : t)
            }
        case "ADD-TODOLIST":
            return {
                ...state,
                [action.todoListId] : []
            }
        case "REMOVE-TODOLIST":

            let newState = {...state}
            delete newState[action.todoListId]
            return newState
        default:
            return state

    }
}
export const removeTaskAC = (taskId: string, todoListId: string): RemoveTaskAT => {
    return {
        type: "REMOVE-TASK",
        todoListId,
        taskId
    }
}


export const changeTaskStatusAС = (taskId: string, isDone: boolean, todoListId: string): ChangeTaskStatusAT => {
    return {
        type: "CHANGE-TASK-STATUS",
        isDone,
        todoListId,
        taskId
    }
}
export const changeTaskTitleAС = (taskId: string, title: string, todoListId: string): ChangeTaskTitleAT => {
    return {
        type: "CHANGE-TASK-TITLE",
        title: title,
        todoListId,
        taskId
    }
}
export const addTaskAC = (title: string, todoListId: string): AddTaskAT => {
    return {
        type: "ADD-TASK",
        todoListId,
        title: title
    }
}
