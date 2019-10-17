import React, { Component } from "react";
import { connect } from "react-redux";

function mapStateToProps(state) {
    return { currentList: state.currentList };
};

class Tasks extends Component {
    constructor() {
        super();
        this.updateList = this.updateList.bind(this);
    }

    render() {
        return (
            <div >
                <a id="info" class="info">
                    <div id = "list-title" class="task-title">
                        <input class="task-title-input" type="text" 
                            value={this.props.currentList.title} onChange={this.updateList}/>
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
        console.log(event.target.value);
        this.props.currentList.title = event.target.value;
    }
}

const TaskContainer = connect(mapStateToProps)(Tasks);
export default TaskContainer;