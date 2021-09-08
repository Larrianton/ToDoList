import React from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';
import {action} from "@storybook/addon-actions";
import EditableSpan from "./EditableSpan";


export default {
    title: 'TodoList/EditableSpan',
    component: EditableSpan,
    argTypes: {
        changeTitle: {
            description: "Value EditableSpan changed"
        },
        title: {
            defaultValue: "HTML",
            description: "StartValue EditableSpan"
        }
    }
} as ComponentMeta<typeof EditableSpan>;


const EditableSpanFormTemplate: ComponentStory<typeof EditableSpan> = (args) => <EditableSpan{...args} />;


export const EditableSpanStory = EditableSpanFormTemplate.bind({});
EditableSpanStory.args = {
    changeTitle: action("Value is changed"),
    title: "HTML"
};



