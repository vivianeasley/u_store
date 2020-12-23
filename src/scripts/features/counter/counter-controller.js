import { u_store } from '../../state/u_store';
import { sd } from '../../state/selectors';

export function addCount (amount) {
    if (!amount || typeof amount !== Number) amount = 1;
    u_store(async (state) => {
        state[sd["count"]] += amount;
    })
}

export function subtractCount (amount) {
    if (!amount || typeof amount !== Number) amount = 1;
    u_store(async (state) => {
        state[sd["count"]] -= amount;
    })
}