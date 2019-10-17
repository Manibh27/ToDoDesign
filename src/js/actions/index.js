import { ADD_LIST } from "../constants/action-types";
import { ADD_TASKS } from "../constants/action-types";
import { CHANGE_LIST } from "../constants/action-types";

export function addList(payload) {
  return { type: ADD_LIST, payload };
}

export function changeList(payload) {
  return { type: CHANGE_LIST, payload };
}

export function addTasks(payload) {
  return { type: ADD_TASKS, payload };
}