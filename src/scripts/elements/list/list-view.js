import { html } from 'lighterhtml';

export function list (state, paths, funct) {
    return html`
        <ul>
            ${
                state[paths].map((string, i)=>{
                    return html`<li data-i=${string} onclick=${()=>{funct(string, paths)}}>${state[string]}</li>`;
                })
            }
        </ul>
    `
}