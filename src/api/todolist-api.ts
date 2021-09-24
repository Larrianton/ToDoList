import axios from "axios";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': '782f4d9b-26da-4de6-a9b8-fe796409ea63'
    }
})
type TodoType = {
    id: string,
    title: string,
    addedDate: string,
    order: number
}


type CommonResponseType<T={}> = {
    resultCode: 0
    messages: []
    fieldsErrors: Array<string>
    data: T
}

export const todolistAPI = {
    updateTodo(todolistId: string, title: string) {
        return instance.put<CommonResponseType>(`/todo-lists/${todolistId}`, {title})
    },

    createTodo(title: string) {
        return instance.post<CommonResponseType<{ item: TodoType }>>(`/todo-lists/`, {title})
    },
    deleteTodo(todolistId: string) {
        return instance.delete<CommonResponseType>(`/todo-lists/${todolistId}`)
    },
    getTodo() {
        return instance.get<Array<TodoType>>(`/todo-lists/`)
    }
}
