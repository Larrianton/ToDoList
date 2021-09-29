import {AddTodolistAT, GetTodoListsAT, RemoveTodolistAT} from "./todolists-reducer";
import {tasksAPI, TaskStatuses, TaskType, UpdateTaskModelType} from "../api/todolist-api";
import {TasksStateType} from "../App";
import {Dispatch} from "redux";
import {AppRootStateType} from "./store";

export type ChangeTaskTitleAT = ReturnType<typeof changeTaskTitleAC>
export type ChangeTaskStatusAT = ReturnType<typeof changeTaskStatusAC>
export type AddTaskAT = ReturnType<typeof addTaskAC>
export type RemoveTaskAT = ReturnType<typeof removeTaskAC>
export type GetTasksAT = ReturnType<typeof getTasksAC>

type ActionsType = RemoveTaskAT | AddTaskAT
    | ChangeTaskStatusAT
    | ChangeTaskTitleAT
    | AddTodolistAT
    | RemoveTodolistAT
    | GetTodoListsAT
    | GetTasksAT

const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case "GET-TASKS": {
            const stateCopy = {...state}
            stateCopy[action.todolistId] = action.tasks
            return stateCopy
        }
        case "GET-TODOLISTS": {
            const stateCopy = {...state}
            action.todos.forEach((tl) => {
                stateCopy[tl.id] = []
            })
            return stateCopy

        }
        case 'REMOVE-TASK': {
            const stateCopy = {...state}
            const tasks = stateCopy[action.todolistId];
            const newTasks = tasks.filter((t: TaskType) => t.id !== action.taskId);
            stateCopy[action.todolistId] = newTasks;
            return stateCopy;
        }
        case 'ADD-TASK': {
            const stateCopy = {...state}
            const tasks = stateCopy[action.task.todoListId];
            const newTasks = [action.task, ...tasks];
            stateCopy[action.task.todoListId] = newTasks;
            return stateCopy;
        }
        case 'CHANGE-TASK-STATUS': {
            let todolistTasks = state[action.todolistId];
            let newTasksArray = todolistTasks
                .map(t => t.id === action.taskId ? {...t, status: action.status} : t);

            state[action.todolistId] = newTasksArray;
            return ({...state});
        }
        case 'CHANGE-TASK-TITLE': {
            let todolistTasks = state[action.todolistId];
            // найдём нужную таску:
            let newTasksArray = todolistTasks
                .map(t => t.id === action.taskId ? {...t, title: action.title} : t);

            state[action.todolistId] = newTasksArray;
            return ({...state});
        }
        case 'ADD-TODOLIST': {
            return {
                ...state,
                [action.todolistId]: []
            }
        }
        case 'REMOVE-TODOLIST': {
            const copyState = {...state};
            delete copyState[action.id];
            return copyState;
        }
        default:
            return state;
    }
}

export const removeTaskAC = (taskId: string, todolistId: string) => {
    return {type: 'REMOVE-TASK', taskId: taskId, todolistId: todolistId} as const
}
export const addTaskAC = (task: TaskType) => {
    return {type: 'ADD-TASK', task} as const
}
export const changeTaskStatusAC = (todolistId:string,taskId:string ,status:TaskStatuses) => {
    return {type: 'CHANGE-TASK-STATUS', todolistId,taskId,status} as const
}
export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string) => {
    return {type: 'CHANGE-TASK-TITLE', title, todolistId, taskId} as const
}
export const getTasksAC = (todolistId: string, tasks: Array<TaskType>) => {
    return {type: "GET-TASKS", todolistId, tasks} as const
}


export const getTaskTC = (todolistId: string) => {
    return (dispatch: Dispatch) => {
        tasksAPI.getTasks(todolistId)
            .then(res => {
                let tasks = res.data.items
                dispatch(getTasksAC(todolistId, tasks))

            })
    }
}
export const removeTaskTC = (taskId: string, todolistId: string) => {
    return (dispatch: Dispatch) => {
        tasksAPI.deleteTask(todolistId, taskId)
            .then(res => {
                dispatch(removeTaskAC(taskId, todolistId))
            })
    }
}
export const addTaskTC = (title: string, todolistId: string) => {
    return (dispatch: Dispatch) => {
        tasksAPI.createTask(todolistId, title)
            .then(res => {
                let task = res.data.data.item
                debugger
                dispatch(addTaskAC(task))
            })
    }
}
export const changeTaskStatusTC = (todolistId: string, taskId: string, status: TaskStatuses) =>
    (dispatch: Dispatch, getState: () => AppRootStateType) => {
        const stateApp = getState()
        const allTasks = stateApp.tasks
        const tasksForClickedTodoList = allTasks[todolistId]
        let clickedTask = tasksForClickedTodoList.find((t) => {
            return t.id === taskId
        })
        if (clickedTask) {
            let model: UpdateTaskModelType = {
                title:clickedTask.title,
                status,
                priority: clickedTask.priority,
                deadline:clickedTask.deadline,
                completed:clickedTask.completed,
                description:clickedTask.description,
                startDate:clickedTask.startDate
            }
            tasksAPI.updateTask(todolistId, taskId, model)
                .then(res => {
                    dispatch(changeTaskStatusAC(todolistId,taskId,status))
                })
        }

    }

