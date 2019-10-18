import { createStore, applyMiddleware } from "redux";
import { ADD_LIST } from "../constants/action-types";
import rootReducer from "../reducers/index";

/**
 * Check the newly enterd list name if name is present, concat the name with
 * the count of list name.
 * 
 * @param {} param
 */
export function checkListNameMiddleware({ dispatch }) {
    return function(next) {
        return function(action) {
            if (action.type === ADD_LIST) {
                action.payload.title = updateListName(action.payload.title);
            }
            return next(action);
        };
    };
}

function updateListName(name) {
    const length = store.getState().lists.filter(list => list.subTitle === name).length;
    console.log(length);
    if (length !== 0) {
        return name + "("+length+")";
    } else {
        return name;
    }
}

const store = createStore(
        rootReducer,
        applyMiddleware(checkListNameMiddleware)
    );
export default store;