import React, { Component } from "react";
import { connect } from "react-redux";
import { updateListName } from "../actions/index";

/**
 * Used to connect  currentList object from redux state to the components props.
 * 
 * @param {*} dispatch 
 */
function mapStateToProps(state) {
    return { currentList: state.currentList };
};

/**
 * Used to connect updateListName action function to the components props.
 * 
 * @param {*} dispatch 
 */
function mapDispatchToProps(dispatch) {
    return {
        updateListName: name => dispatch(updateListName(name))
    };
}

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
                {this.props.currentList.tasks && this.props.currentList.tasks.map(task => (
                    <div class="added-task">
                        <div>
                            <a>
                                <i class='material-icons tick-icon'>check_circle_outline</i>
                            </a>
                        </div>
                        <div className="task-name" key={task.id}>
                            <p>{task.title}</p>
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    /**
     * Updates the currentList name when it is changed.
     * @param {*} event 
     */
    updateList(event) {
        const title = event.target.value;
        this.props.updateListName({title});
    }
}

const TaskContainer = connect(mapStateToProps, mapDispatchToProps)(Tasks);
export default TaskContainer;