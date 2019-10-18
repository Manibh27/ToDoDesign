import { ADD_LIST } from "../constants/action-types";
import { ADD_TASKS } from "../constants/action-types";
import { CHANGE_LIST } from "../constants/action-types";
import { UPDATE_LIST } from "../constants/action-types";

/**
 * Used to add new list into the lists array maintained in the redux state.
 * 
 * @param {*} payload 
 */
export function addList(payload) {
  return { type: ADD_LIST, payload };
}

/**
 * When a list is clicked the currentlist object in the redux state is changed.
 * 
 * @param {*} payload 
 */
export function changeList(payload) {
  return { type: CHANGE_LIST, payload };
}

/**
 * Used to add new task into the tasks array maintained in the currentList object 
 * in redux state.
 * 
 * @param {*} payload 
 */
export function addTasks(payload) {
  return { type: ADD_TASKS, payload };
}

/**
 * Used to update the currentList object title in redux state.
 * 
 * @param {*} payload 
 */
export function updateListName(payload) {
  return { type: UPDATE_LIST, payload };
}
