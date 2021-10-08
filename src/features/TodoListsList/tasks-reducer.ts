import {AddTodolistAT, SetTodoListsAT, RemoveTodolistAT} from "./todolists-reducer";
import {tasksAPI, TaskStatuses, TaskType, UpdateTaskModelType} from "../../api/todolist-api";
import {Dispatch} from "redux";
import {AppRootStateType} from "../../app/store";

const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case "SET-TASKS":
            return {...state, [action.todolistId]: action.tasks}
        case "SET-TODOLISTS":
            const stateCopy = {...state}
            action.todos.forEach(tl => {
                stateCopy[tl.id] = []
            })
            return stateCopy
        case 'REMOVE-TASK':
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.taskId)
            }
        case 'ADD-TASK':
            return {...state, [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]}

        case 'CHANGE-TASK-STATUS':
            return {
                ...state,
                [action.todolistId]: state[action.todolistId]
                    .map((t:TaskType) => t.id === action.taskId ? {...t, status: action.status} : t)
            }
        case 'CHANGE-TASK-TITLE':
            return {
                ...state,
                [action.todolistId]: state[action.todolistId]
                    .map(t => t.id === action.taskId ? {...t, title: action.title} : t)
            }
        case 'ADD-TODOLIST':
            return {...state, [action.todolist.id]: []}
        case 'REMOVE-TODOLIST':
            const copyState = {...state};
            delete copyState[action.id];
            return copyState;
        default:
            return state;
    }
}
// actions
export const removeTaskAC = (taskId: string, todolistId: string) =>
    ({type: 'REMOVE-TASK', taskId: taskId, todolistId: todolistId} as const)

export const addTaskAC = (task: TaskType) =>
    ({type: 'ADD-TASK', task} as const)

export const changeTaskStatusAC = (todolistId: string, taskId: string, status: TaskStatuses) =>
    ({type: 'CHANGE-TASK-STATUS', todolistId, taskId, status} as const)

export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string) =>
    ({type: 'CHANGE-TASK-TITLE', title, todolistId, taskId} as const)

export const setTasksAC = (todolistId: string, tasks: Array<TaskType>) =>
    ({type: "SET-TASKS", todolistId, tasks} as const)

//thunks
export const setTasksTC = (todolistId: string) => (dispatch: Dispatch<ActionsType>) => {
    tasksAPI.getTasks(todolistId)
        .then(res => {
            let tasks = res.data.items
            dispatch(setTasksAC(todolistId, tasks))
        })
}
export const removeTaskTC = (taskId: string, todolistId: string) => (dispatch: Dispatch<ActionsType>) => {
    tasksAPI.deleteTask(todolistId, taskId)
        .then(res => {
            dispatch(removeTaskAC(taskId, todolistId))
        })
}
export const addTaskTC = (title: string, todolistId: string) => (dispatch: Dispatch<ActionsType>) => {
    tasksAPI.createTask(todolistId, title)
        .then(res => {
            let task = res.data.data.item
            dispatch(addTaskAC(task))
        })
}
export const changeTaskStatusTC = (todolistId: string, taskId: string, status: TaskStatuses) =>
    (dispatch: Dispatch<ActionsType>, getState: () => AppRootStateType) => {
        const stateApp = getState()
        const allTasks = stateApp.tasks
        const tasksForClickedTodoList = allTasks[todolistId]
        let clickedTask = tasksForClickedTodoList.find((t) => {
            return t.id === taskId
        })
        if (clickedTask) {
            let model: UpdateTaskModelType = {
                title: clickedTask.title,
                status,
                priority: clickedTask.priority,
                deadline: clickedTask.deadline,
                completed: clickedTask.completed,
                description: clickedTask.description,
                startDate: clickedTask.startDate
            }
            tasksAPI.updateTask(todolistId, taskId, model)
                .then(res => {
                    dispatch(changeTaskStatusAC(todolistId, taskId, status))
                })
        }

    }

//types
export type TasksStateType = {[key: string]: Array<TaskType>}
export type ChangeTaskTitleAT = ReturnType<typeof changeTaskTitleAC>
export type ChangeTaskStatusAT = ReturnType<typeof changeTaskStatusAC>
export type AddTaskAT = ReturnType<typeof addTaskAC>
export type RemoveTaskAT = ReturnType<typeof removeTaskAC>
export type SetTasksAT = ReturnType<typeof setTasksAC>

type ActionsType = RemoveTaskAT | AddTaskAT
    | ChangeTaskStatusAT
    | ChangeTaskTitleAT
    | AddTodolistAT
    | RemoveTodolistAT
    | SetTodoListsAT
    | SetTasksAT
