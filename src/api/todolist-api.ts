import axios from "axios";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': '50ce9562-504b-455c-9d4f-2670455fd5d4'
    }
})
type TodoType = {
    id: "9f27f97b-bc63-4114-9baa-c91facbd4ffb",
    title: "what todo"
    addedDate: "2019-07-30T12:24:15.063",
    order: 0
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
