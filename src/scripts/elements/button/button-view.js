import { html } from 'lighterhtml';

export const buttonPrimary = function buttonPrimary (text, funct) {
    return html`
        <button onclick=${funct}>${text}</button>
    `
}