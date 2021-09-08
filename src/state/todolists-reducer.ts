import {FilterValuesType, TodoListType} from "../App";
import {v1} from "uuid";

export type RemoveTodoListAT = {
    type: "REMOVE-TODOLIST"
    todoListId: string
}
export type AddTodoListAT = {
    type: "ADD-TODOLIST"
    title: string
    todoListId:string
}
type ChangeTodoListFilterAT = {
    type: "CHANGE-TODOLIST-FILTER"
    filter: FilterValuesType
    todoListId: string
}
type ChangeTodoListTitleAT = {
    type: "CHANGE-TODOLIST-TITLE"
    title: string
    todoListId: string
}
export const todoListID_1 = v1()
export const todoListID_2 = v1()
const initialState :Array<TodoListType> = [
    {id: todoListID_1, title: "What to learn", filter: "all"},
    {id: todoListID_2, title: "What to buy", filter: "all"},
]
export type ActionType = RemoveTodoListAT | AddTodoListAT | ChangeTodoListFilterAT | ChangeTodoListTitleAT
export const todoListsReducer = (todoLists= initialState, action: ActionType) : Array<TodoListType>=> {
    switch (action.type) {
        case "REMOVE-TODOLIST":
            return todoLists.filter(tl => tl.id !== action.todoListId)
        case "ADD-TODOLIST":

            const newTodoList: TodoListType = {
                id: action.todoListId,
                title: action.title,
                filter: "all"
            }
            return [...todoLists, newTodoList]
        case "CHANGE-TODOLIST-FILTER" :
            return todoLists.map(tl => tl.id === action.todoListId ? {...tl, filter: action.filter} : tl)
        case "CHANGE-TODOLIST-TITLE" :
            return todoLists.map(tl => tl.id === action.todoListId ? {...tl, title: action.title} : tl)
        default:
            return todoLists

    }

}
export const RemoveTodoListAC = (todoListId:string) : RemoveTodoListAT => {
    return {
        type: "REMOVE-TODOLIST",
        todoListId
    }
}
export const AddTodoListAС = (title:string) : AddTodoListAT => {
    return {
        type: "ADD-TODOLIST",
        title:title,
        todoListId: v1()
    }
}
export const ChangeTodoListFilterAC = (todoListId:string,filter:FilterValuesType) : ChangeTodoListFilterAT  => {
    return {
        type: "CHANGE-TODOLIST-FILTER" ,
        filter ,
        todoListId
    }
}
export const ChangeTodoListTitleAC = (todoListId:string , title:string) : ChangeTodoListTitleAT  => {
    return {
        type: "CHANGE-TODOLIST-TITLE" ,
        title,
        todoListId
    }
}
