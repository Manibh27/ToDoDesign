import React, { Component } from "react";
import { connect } from "react-redux";

function mapStateToProps(state) {
    return { currentList: state.currentList };
};

class Tasks extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div >
                <a id="info" class="info">
                    <div id = "list-title" class="task-title">
                        <input class="task-title-input" type="text" 
                            value={this.props.currentList.title} onKeyDown={this.updateList}/>
                    </div>
                </a>
                <ul>
                    {this.props.currentList.tasks && this.props.currentList.tasks.map(task => (
                        <li key={task.id} className="added-task">{task.title}</li>
                    ))}
                </ul>
            </div>
        );
    }

    updateList(event) {
    }
}

const TaskContainer = connect(mapStateToProps)(Tasks);
export default TaskContainer;