import { ADD_LIST } from "../constants/action-types";
import { CHANGE_LIST } from "../constants/action-types";
import { ADD_TASKS } from "../constants/action-types";
import { UPDATE_LIST } from "../constants/action-types";


const initialState = {
    lists: [],
    currentList: { 
        title: "Tasks",
        subTitle: "Tasks",
        id: "",
        tasks:[]
    }
};

function rootReducer(state = initialState, action) {
    if (action.type === ADD_LIST) {
        return {
            ...state,
            lists: state.lists.concat(action.payload),
            currentList: action.payload
        };
    } else if (action.type === CHANGE_LIST) {
        return  {
            ...state,
            currentList: action.payload
        };
    } else if (action.type === ADD_TASKS) {
        const list = {...state.currentList}
        list.tasks.push(action.payload) 
        return {
            ...state,
            currentList: list
        };
    } else if (action.type === UPDATE_LIST) {
        const list = {...state.currentList}
        list.title = action.payload.title; 
        console.log(list.title);
        return {
            ...state,
            currentList: list
        };
    }
    return state;
};

export default rootReducer;