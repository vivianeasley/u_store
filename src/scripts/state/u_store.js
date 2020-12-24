// TODO:
// add quequeing system
// add debugging flag
// Typescript

const states = [];
let renderFunct;
let max = 2;

export async function u_init (data, render, maxStates) {
    if (maxStates) max = maxStates;
    renderFunct = render;
    const flattened = await u_flat(data);
    Object.freeze(flattened);
    states.push(flattened);
    renderFunct(states[0]);
}

export async function u_store (storeFunct) {
    const copiedState = {...states[states.length - 1]};
    // TODO: Add to Async queque and return if argument passed

    await storeFunct(copiedState);

    // DEBUG
    // console.log(copiedState)
    // console.log(await u_unflat(copiedState))

    Object.freeze(copiedState);
    renderFunct(copiedState);
    states.push(copiedState);
    if (states.length > max) states.shift()
}

export function u_get () {
    return states[states.length - 1];
}

export function u_getLast () {
    return states[states.length - 2];
}

export function u_diff (path) {
    return states[states.length - 1][path] !== states[states.length - 2][path];
}

// TODO: u_stepBack, u_stepForward

export function u_updateRenderFunct (render) {
    renderFunct = render;
}

export function u_push (state, paths, value) {
    const hash = Date.now().toString(36);
    const newPath = paths + "." +hash;
    state[paths].push(newPath);
    state[newPath] = value;
}

export function u_remove (state, index) {
    const root = getRootPath(index);
    const i = state[root].indexOf(index);
    delete state[index];
    state[root].splice(i, 1);
}

export function getRootPath (path) {
    return path.split('.').slice(0, -1).join('.');
}

export function u_unflat (data) {
    return new Promise((resolve, reject) => {
        try {
            if (Object(data) !== data || Array.isArray(data)) return data;
            var result = {}, cur, prop, idx, last, temp;
            for(var p in data) {
                const tmpArr = [];
                if (Array.isArray(data[p])) {
                    for (let i = 0; i < data[p].length; i++) {
                        tmpArr.push(data[data[p][i]]);
                    }
                }
                cur = result, prop = "", last = 0;
                do {
                    idx = p.indexOf(".", last);
                    temp = p.substring(last, idx !== -1 ? idx : undefined);
                    cur = cur[prop] || (cur[prop] = (!isNaN(parseInt(temp)) ? [] : {}));
                    prop = temp;
                    last = idx + 1;
                } while(idx >= 0);
                if (tmpArr.length > 0) {
                    cur[prop] = tmpArr;
                } else {
                    cur[prop] = data[p];
                }

            }
            resolve(result[""]);
        } catch (err) {
            reject(err);
        }
    })
}



export function u_flat (data) {
    return new Promise((resolve, reject) => {
        try {
            var result = {};
            function recurse (cur, prop) {
                if (Object(cur) !== cur) {
                    result[prop] = cur;
                } else if (Array.isArray(cur)) {
                    const uArray = [];
                     for(var i=0, l=cur.length; i<l; i++) {
                         const key = prop ? prop+"."+i : ""+i;
                         uArray.push(key);
                        recurse(cur[i], key);
                     }
                     result[prop] = uArray
                } else {
                    var isEmpty = true;
                    for (var p in cur) {
                        isEmpty = false;
                        recurse(cur[p], prop ? prop+"."+p : p);
                    }
                    if (isEmpty)
                        result[prop] = {};
                }
            }
            recurse(data, "");
            resolve(result);
        } catch (err) {
            reject(err);
        }
    })
}