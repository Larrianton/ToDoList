import axios from "axios";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/todo-lists',
    withCredentials: true,
    headers: {
        'API-KEY': 'cf494fa6-50c4-47b4-b87c-61978a308635'
    }
})
export type TodoType = {
    id: string,
    title: string,
    addedDate: string,
    order: number
}


type CommonResponseType<T = {}> = {
    resultCode: 0
    messages: []
    fieldsErrors: Array<string>
    data: T
}

export const todolistAPI = {
    updateTodo(todolistId: string, title: string) {
        return instance.put<CommonResponseType>(`/${todolistId}`, {title})
    },

    createTodo(title: string) {
        return instance.post<CommonResponseType<{ item: TodoType }>>(`/`, {title})
    },
    deleteTodo(todolistId: string) {
        return instance.delete<CommonResponseType>(`/${todolistId}`)
    },
    getTodo() {
        return instance.get<Array<TodoType>>(`/`)
    }
}

export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3,
}

export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    Later = 4
}


export type TaskType = {
    description: string
    title: string
    completed: boolean
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}
export type UpdateTaskModelType ={
    title:string
    description:string
    completed:boolean
    status:number
    priority:number
    startDate:string
    deadline:string
}

type CommonResponseTaskType<T = {}> = {
    totalCount: number
    error: string
    items:T
    data:T
}

export const tasksAPI = {
    updateTask(todolistId:string , taskId:string , model:UpdateTaskModelType) {
        return instance.put<CommonResponseTaskType<{ item: TaskType }>>(`/${todolistId}/tasks/${taskId}`, {model})
    },

    createTask(todolistId: string, title: string) {
        return instance.post<CommonResponseTaskType<{ item: TaskType }>>(`${todolistId}/tasks/`, {title})
    },
    deleteTask(todolistId: string, taskId: string) {
        return instance.delete<CommonResponseTaskType>(`/${todolistId}/tasks/${taskId}`)
    },
    getTasks(todolistId: string) {
        return instance.get<CommonResponseTaskType<Array<TaskType>>>(`/${todolistId}/tasks/`)
    }
}
