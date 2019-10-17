import React, { Component } from "react";
import { connect } from "react-redux";
import uuidv1 from "uuid";
import TaskContainer from "./TaskContainer.jsx";
import { addTasks } from "../actions/index";

function mapStateToProps(state) {
    return { currentList: state.currentList };
};

function mapDispatchToProps(dispatch) {
    return {
        addTasks: task => dispatch(addTasks(task))
    };
}

class TaskComponent extends Component {
    constructor() {
        super();
        this.state = {
            title: ""
        };
        this.addTask = this.addTask.bind(this);
    }

    addTask(event) {
        if (event.key === 'Enter') {
            console.log("hi");
            const title = event.target.value;
            const id = uuidv1();
            const subTasks = [];
            console.log(this.props.currentList.tasks);
            this.props.addTasks({ title, id, subTasks});
            this.setState();
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