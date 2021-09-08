import React from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';
import {action} from "@storybook/addon-actions";
import Task from "./Task";

const changeTaskTitleCallback = action("Change Task Title clicked")
const changeTaskStatusCallback = action("change Task Status clicked")
const removeTaskCallback = action("Remove Task clicked")

export default {
    title: 'TodoList/Task',
    component: Task,
    argTypes: {
        changeTaskTitle: {
            description:"Change Task Title clicked"
        },
        changeTaskStatus: {
            description:"Change Task Status clicked"
        } ,
        removeTask: {
            description:"Remove Task clicked"
        }
    }
} as ComponentMeta<typeof Task>;


const TaskFormTemplate: ComponentStory<typeof Task> = (args) => <Task {...args} />;


export const TaskIsDoneStory = TaskFormTemplate.bind({});
TaskIsDoneStory.args = {
    todoListID: "todo1",
    task: {id: "1", title: "HTML", isDone: true},

};
export const TaskIsNotDoneStory = TaskFormTemplate.bind({});
TaskIsNotDoneStory.args = {
    todoListID: "todo1",
    task: {id: "1", title: "HTML", isDone: false},

};

