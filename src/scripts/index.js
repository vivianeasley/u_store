import { renderIndex } from './pages/index';
import{ u_init } from './state/u_store';

const initialStateObj = {
    counter: {
        count: 0
    },
    todo: {
        list:[
            "get groceries",
            "run",
            "walk cats"
        ],
        allLists: [
            {list1: ["--1", "--2", 3]},
            {list2: [4, 6, 7]},
            {list3: [8, 9, 10]},
        ]
    }
}
u_init(initialStateObj, renderIndex);