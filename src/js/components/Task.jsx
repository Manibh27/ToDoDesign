import React, { Component } from "react";
import { connect } from "react-redux";
import uuidv1 from "uuid";
import TaskContainer from "./TaskContainer.jsx";
import { addTasks } from "../actions/index";


/**
 * Used to connect  currentList object from redux state to the components props.
 * 
 * @param {*} dispatch 
 */
function mapStateToProps(state) {
    return { currentList: state.currentList };
};


/**
 * Used to connect addTasks action function to the components props.
 * 
 * @param {*} dispatch 
 */
function mapDispatchToProps(dispatch) {
    return {
        addTasks: state => dispatch(addTasks(state))
    };
}

class TaskComponent extends Component {
    constructor() {
        super();
        this.addTask = this.addTask.bind(this);
    }

    /**
     * Used to add task in tasks array maintained in the currentList object in redux state. 
     * The created task object is passed through action to the reducer.
     */
    addTask(event) {
        if (event.key === 'Enter') {
            const title = event.target.value;
            const id = uuidv1();
            const subTasks = [];
            this.props.addTasks({ title, id, subTasks });
        }
    }

    render() {
        return (
            <div id="todo-list" className="todo-task-list">
                <TaskContainer />
                <div className="add-new-task">
                    <a id="add-task-icon" href="#add-new-task">
                        <i className="material-icons new-task-icon">add</i>
                    </a>  
                    <input className="add-task-input" type="text"  onKeyDown={this.addTask}/>   
                </div>
            </div>
        );
    }
}

const Task = connect(mapStateToProps, mapDispatchToProps)(TaskComponent);
export default Task;