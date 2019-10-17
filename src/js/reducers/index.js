import { ADD_LIST } from "../constants/action-types";
import { CHANGE_LIST } from "../constants/action-types";


const initialState = {
    lists: [],
    currentList: { }
};

function rootReducer(state = initialState, action) {
    if (action.type === ADD_LIST) {
        return Object.assign({}, state, {
            lists: state.lists.concat(action.payload)
        });
    } else if (action.type === CHANGE_LIST) {
        return Object.assign({}, state, {
            currentList: action.payload
        });
    } 
    return state;
};

export default rootReducer;