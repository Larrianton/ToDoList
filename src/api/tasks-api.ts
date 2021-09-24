import axios from "axios";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/todo-lists',
    withCredentials: true,
    headers: {
        'API-KEY': '782f4d9b-26da-4de6-a9b8-fe796409ea63'
    }
})
type TaskType = {
    id: string,
    title: string,
    completed:boolean,
    order: 0
}


type CommonResponseType<T={}> = {
    totalCount: number
    error: string
    items: T
    resultCode: 0
    messages: []
    fieldsErrors: Array<string>
}

export const tasksAPI = {
    updateTask(todolistId: string,taskId:string, title: string) {
        return instance.put<CommonResponseType>(`/${todolistId}/tasks/${taskId}`, {title})
    },

    createTask(todolistId: string,title: string) {
        return instance.post<CommonResponseType<{ items: TaskType }>>(`${todolistId}/tasks/`, {title})
    },
    deleteTask(todolistId: string ,taskId:string) {
        return instance.delete<CommonResponseType>(`/${todolistId}/tasks/${taskId}`)
    },
    getTasks(todolistId:string) {
        return instance.get<Array<TaskType>>(`/${todolistId}/tasks/`)
    }
}
