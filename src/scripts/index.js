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
        ]
    }
}
u_init(initialStateObj, renderIndex);