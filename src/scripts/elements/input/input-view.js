import { html } from 'lighterhtml';

export function input (returnFunct, path) {

    function add (e) {
        if (!returnFunct) return;
        if ( e.keyCode === 13) {
            returnFunct(e.target.value, path);
        }
    }

    return html`
        <input onkeydown=${add} type="text">
    `
}