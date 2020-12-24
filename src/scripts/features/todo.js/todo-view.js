import { html } from 'lighterhtml';
import { list } from '../../elements/list/list-view';
import {
    removeTodo,
    addTodo
} from './todo-controller';
import { input } from '../../elements/input/input-view';
import { buttonPrimary } from '../../elements/button/button-view';

export function todo (state, todosPath) {

    return html`
        <i>Click item to remove</i>
        ${list(state, todosPath, removeTodo)}
        <div>
            ${input(addTodo, todosPath)} |
            ${buttonPrimary("Add Todo", (e)=>{addTodo(e.target.parentNode.querySelector("input").value, todosPath)})}
        </div>
    `
}