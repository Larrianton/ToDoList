import React, {useState} from 'react';
import './App.css';
import TodoList from "./ToDoList";
import {v1} from "uuid";


export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
export type FilterValuesType = "all" | "completed" | "active"

function App() {

    const [filter , setFilter] = useState<FilterValuesType>("all")

    // const Array =
    const [tasks, setTasks] = useState<Array<TaskType>>([
            {id: v1() , title: "Html", isDone: true},
            {id: v1() , title: "CSS", isDone: true},
            {id: v1() , title: "JS", isDone: false},
            {id: v1() , title: "React", isDone: false}
        ]
    )


    function changeToDoListFilter(filterValue:FilterValuesType) {
        setFilter(filterValue)
    }

    function removeTask(t_id: string) { //id task
        const filteredTasks = tasks.filter(t => t.id !== t_id)
        setTasks(filteredTasks)
        // if (filteredTasks !== tasks ) {
        //  tasks = filteredTasks
        // React.render ()
        // }
    }
        const addTask = (title:string) => {
         let  newTask = {id:v1() , title: title ,isDone:false}
         let newTasks = [newTask ,...tasks]
            setTasks(newTasks)
        }
    function getFilterTasks () {
        switch (filter) {
            case "active":
                return tasks.filter (t => !t.isDone)
            case "completed":
                return tasks.filter (t => t.isDone )
            default :
                return tasks
        }
    }
    function checkValueTask(taskId:string ,isDone:boolean) {
        const updatedTasks =tasks.map(t =>  t.id===taskId ? {...t ,isDone:isDone } : t )
        setTasks(updatedTasks)
    }

    return (

        <div className="App">
            <TodoList title={"what to learn ?"}
                      tasks={getFilterTasks()}
                      removeTask={removeTask}
                      changeToDoListFilter={changeToDoListFilter}
                      addTask={addTask}
                      filter={filter}
                      checkValueTask={checkValueTask}
            />


        </div>
    );
}

export default App;
