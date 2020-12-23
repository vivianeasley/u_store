import { u_store, u_push, u_remove } from '../../state/u_store';

export function removeTodo (index) {
    if (index === undefined) console.error("removeTodo requires an index");
    u_store(async (state) => {
        u_remove(state, index);
    })
}

export function addTodo (value, paths) {
    if (value === undefined) console.error("addTodo requires a value");
    u_store(async (state) => {
        u_push(state, paths, value);

    })
}
