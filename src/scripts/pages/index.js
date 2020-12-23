import { render, html } from 'lighterhtml';
import { counter } from '../features/counter/counter-view';
import { todo } from '../features/todo.js/todo-view';
import { sd } from '../state/selectors';
import { u_unflat } from '../state/u_store';

const main = document.querySelector("main");

export async function renderIndex (state) {
    const unflattened = await u_unflat(state);
    render(main, html`
        <h1>State Simplifier u_store</h2>
        <p>This library flattens JSON to make it easier and safer to work with immutable state. This is a very simple (less than 1kb gzipped) library for flattening and then managing that flattened stated. The only part of the JSON object that isn't flat are arrays that have the keys to the former array values.</p>
        <h2>Counter</h2>
        ${counter(state[sd["count"]])}
        <h2>Todo</h2>
        ${todo(state, sd["todoList"])}
        <h2>Flattened State</h2>
        <pre>${JSON.stringify(state, null, "\t")}</pre>
        <h2>Unflattened State</h2>
        <pre>${JSON.stringify(unflattened, null, "\t")}</pre>
    `);
}