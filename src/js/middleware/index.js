import { ADD_LIST } from "../constants/action-types";


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
            }
            return next(action);
        };
    };
}
