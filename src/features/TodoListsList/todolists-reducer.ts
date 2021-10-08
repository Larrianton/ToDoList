import {todolistAPI, TodoType} from "../../api/todolist-api";
import {Dispatch} from "redux";
import {AppRootStateType} from "../../app/store";

const initialState: Array<TodoListsDomainType> = []
export const todolistsReducer = (state: Array<TodoListsDomainType> = initialState, action: ActionsType): Array<TodoListsDomainType> => {
    switch (action.type) {
        case "SET-TODOLISTS":
            return action.todos.map(tl => ({...tl, filter: "all"}))
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.id)
        case 'ADD-TODOLIST':
            return [{...action.todolist, filter: 'all'}, ...state]
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl)
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl)
        default:
            return state;
    }
}
//actions
export const removeTodolistAC = (todolistId: string) =>
    ({type: 'REMOVE-TODOLIST', id: todolistId} as const)

export const addTodolistAC = (todolist: TodoType) =>
    ({type: 'ADD-TODOLIST', todolist} as const)

export const changeTodolistTitleAC = (id: string, title: string) =>
    ({type: 'CHANGE-TODOLIST-TITLE', id: id, title: title} as const)

export const changeTodolistFilterAC = (id: string, filter: FilterValuesType) =>
    ({type: 'CHANGE-TODOLIST-FILTER', id: id, filter: filter} as const)

export const setTodoListsAC = (todos: Array<TodoType>) =>
    ({type: 'SET-TODOLISTS', todos} as const)

//thunks
export const setTodoListsTC = () => (dispatch: Dispatch<ActionsType>, getState: () => AppRootStateType) => {
    todolistAPI.getTodo()
        .then(res => {
                dispatch(setTodoListsAC(res.data))
            }
        )
}
export const addTodoListTC = (title:string) => (dispatch:Dispatch<ActionsType>,getState: () => AppRootStateType) => {
    todolistAPI.createTodo(title)
        .then(res => {
            dispatch(addTodolistAC(res.data.data.item))
        })
}

// types
export type TodoListsDomainType = TodoType & { filter: FilterValuesType }
export type FilterValuesType = "all" | "active" | "completed";
type ActionsType =
    | SetTodoListsAT
    | RemoveTodolistAT
    | AddTodolistAT
    | ReturnType<typeof changeTodolistTitleAC>
    | ReturnType<typeof changeTodolistFilterAC>
export type AddTodolistAT = ReturnType<typeof addTodolistAC>
export type SetTodoListsAT = ReturnType<typeof setTodoListsAC>
export type RemoveTodolistAT = ReturnType<typeof removeTodolistAC>
