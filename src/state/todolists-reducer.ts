import {v1} from 'uuid';
import {todolistAPI, TodoType} from "../api/todolist-api";
import {Dispatch} from "redux";
import {AppRootStateType} from "./store";

export type RemoveTodolistAT = ReturnType<typeof removeTodolistAC>
export type AddTodolistAT = ReturnType<typeof addTodolistAC>
export type ChangeTodolistTitleAT = ReturnType<typeof changeTodolistTitleAC>
export type ChangeTodolistFilterAT = ReturnType<typeof changeTodolistFilterAC>
export type GetTodoListsAT = ReturnType<typeof getTodoListsAC>
export type TodoListsDomainType = TodoType & {
    filter: FilterValuesType
}
export type FilterValuesType = "all" | "active" | "completed";

type ActionsType = RemoveTodolistAT | AddTodolistAT
    | ChangeTodolistTitleAT
    | ChangeTodolistFilterAT
    | GetTodoListsAT

const initialState: Array<TodoListsDomainType> = []

export const todolistsReducer = (state: Array<TodoListsDomainType> = initialState, action: ActionsType): Array<TodoListsDomainType> => {
    switch (action.type) {
        case "GET-TODOLISTS": {
            let newTodos: Array<TodoListsDomainType> = action.todos.map(tl => {
                    return {...tl, filter: "all"}
                }
            )
            return [...state, ...newTodos]
        }
        case 'REMOVE-TODOLIST': {
            return state.filter(tl => tl.id !== action.id)
        }
        case 'ADD-TODOLIST': {
            return [{
                id: action.todolistId,
                title: action.title,
                filter: 'all',
                addedDate: '',
                order: 0
            }, ...state]
        }
        case 'CHANGE-TODOLIST-TITLE': {
            const todolist = state.find(tl => tl.id === action.id);
            if (todolist) {
                // если нашёлся - изменим ему заголовок
                todolist.title = action.title;
            }
            return [...state]
        }
        case 'CHANGE-TODOLIST-FILTER': {
            const todolist = state.find(tl => tl.id === action.id);
            if (todolist) {
                // если нашёлся - изменим ему заголовок
                todolist.filter = action.filter;
            }
            return [...state]
        }
        default:
            return state;
    }
}

export const removeTodolistAC = (todolistId: string) => {
    return {type: 'REMOVE-TODOLIST', id: todolistId} as const
}
export const addTodolistAC = (title: string) => {
    return {type: 'ADD-TODOLIST', title: title, todolistId: v1()} as const
}
export const changeTodolistTitleAC = (id: string, title: string) => {
    return {type: 'CHANGE-TODOLIST-TITLE', id: id, title: title} as const
}
export const changeTodolistFilterAC = (id: string, filter: FilterValuesType) => {
    return {type: 'CHANGE-TODOLIST-FILTER', id: id, filter: filter} as const
}
export const getTodoListsAC = (todos: Array<TodoType>) => {
    return {type: 'GET-TODOLISTS', todos} as const
}


export const getTodoListsTC = () => {
    return (dispatch: Dispatch, getState: () => AppRootStateType) => {
        todolistAPI.getTodo()
            .then(res => {
                    dispatch(getTodoListsAC(res.data))
                }
            )

    }
}
