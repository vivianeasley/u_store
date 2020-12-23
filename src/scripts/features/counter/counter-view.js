import { html } from 'lighterhtml';
import { addCount, subtractCount } from './counter-controller';
import { buttonPrimary } from '../../elements/button/button-view'

export const counter = function counter (count) {
    return html`
        <div>${count}</div>
        <div>${buttonPrimary("Add 1", addCount)} | ${buttonPrimary("Subtract 1", subtractCount)}</div>
    `
}