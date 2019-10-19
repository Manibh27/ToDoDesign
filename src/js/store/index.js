import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from 'redux-saga'

import getData from '../sagas/api-saga'
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
            if (action.type === "ADD") {
                action.list.subTitle = action.list.title;
                action.list.title = updateListName(action.list.title);
            }
            return next(action);
        };
    };
}

function updateListName(name) {
    console.log(store.getState().lists)
    const length = store.getState().lists.filter(list => list.subTitle === name).length;
    console.log(length);
    if (length !== 0) {
        return name + "("+length+")";
    } else {
        return name;
    }
}

const sagaMiddleware = createSagaMiddleware()

const store = createStore(
        rootReducer,
        applyMiddleware(checkListNameMiddleware, sagaMiddleware)
    );

sagaMiddleware.run(getData);

export default store;