import { render, html } from 'lighterhtml';
import { counter } from '../features/counter/counter-view';
import { todo } from '../features/todo.js/todo-view';
import { sd } from '../state/selectors';
import { u_unflat } from '../state/u_store';

const main = document.querySelector("main");

export async function renderIndex (state) {
    const unflattened = await u_unflat(state);
    render(main, html`
        <h1>Flat State</h2>
        <p>This immutable state library flattens JSON to make it easier and safer to work with. U_store is less than 1kb gzipped, and mainly helps you flatten then manage your state. The only part of the JSON object that isn't flat are arrays that have the keys to the former array values. The benifits are:</p>
        <ul>
            <li>Easier to avoid uncaught exceptions</li>
            <li>Simplier selectors</li>
            <li>Easy debugging with descriptive key value paths</li>
            <li>More efficient than accessing deeply nested data</li>
        </ul>
        <hr>
        <h2>Counter</h2>
        ${counter(state[sd["count"]])}
        <hr>
        <h2>Todo</h2>
        ${todo(state, sd["todoList"])}
        <hr>
        <h2>Flattened State</h2>
        <pre>${JSON.stringify(state, null, "\t")}</pre>
        <h2>Unflattened State</h2>
        <pre>${JSON.stringify(unflattened, null, "\t")}</pre>
    `);
}