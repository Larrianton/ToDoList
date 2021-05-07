import React, {useState} from 'react';
import './App.css';
import TodoList from "./ToDoList";


export type TaskType = {
    id: number
    title: string
    isDone: boolean
}
export type FilterValuesType = "all" | "completed" | "active"

function App() {

    const [filter , setFilter] = useState<FilterValuesType>("all")

    // const Array =
    const [tasks, setTasks] = useState<Array<TaskType>>([
            {id: 1, title: "Html", isDone: true},
            {id: 2, title: "CSS", isDone: true},
            {id: 3, title: "JS", isDone: false},
            {id: 4, title: "React", isDone: false}
        ]
    )
    // const tasks = array[0]
    // const setTasks = array[1]
    function changeToDoListFilter(filterValue:FilterValuesType) {
        setFilter(filterValue)
    }

    function removeTask(x: number) { //id task
        const filteredTasks = tasks.filter(t => t.id !== x)
        setTasks(filteredTasks)
        // if (filteredTasks !== tasks ) {
        //  tasks = filteredTasks
        // React.render ()
        // }
    }

    function getFilterTasks () {
        switch (filter) {
            case "active":
                return tasks.filter (t => t.isDone === false)
            case "completed":
                return tasks.filter (t => t.isDone ===true)
            default :
                return tasks
        }
    }

    return (

        <div className="App">
            <TodoList title={"what to learn ?"}
                      tasks={getFilterTasks()}
                      removeTask={removeTask}
                      changeToDoListFilter={changeToDoListFilter}
            />


        </div>
    );
}

export default App;
