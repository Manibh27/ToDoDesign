import { ADD_LIST } from "../constants/action-types";
import { CHANGE_LIST } from "../constants/action-types";
import { ADD_TASKS } from "../constants/action-types";


const initialState = {
    lists: [],
    currentList: { 
        title: "",
        id: "",
        tasks:[]
    }
};

function rootReducer(state = initialState, action) {
    if (action.type === ADD_LIST) {
        return Object.assign({}, state, {
            lists: state.lists.concat(action.payload)
        });
    } else if (action.type === CHANGE_LIST) {
        return Object.assign({}, state, {
            currentList: Object.assign({}, state.currentList, {
                title: action.payload.title,
                id: action.payload.id,
                tasks: action.payload.tasks
            })
        });
    } else if (action.type === ADD_TASKS) {
        console.log(action.payload);
        return Object.assign({}, state, {
            currentList: Object.assign({}, state.currentList, {
                tasks: state.currentList.tasks.concat(action.payload)
            })
        });
    }
    return state;
};

export default rootReducer;