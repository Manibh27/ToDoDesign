import React, { Component } from "react";
import { connect } from "react-redux";
import { changeList } from "../actions/index";


/**
 * Used to connect lists array from redux state to the components props.
 * 
 * @param {*} dispatch 
 */
function mapStateToProps(state) {
    return { lists: state.lists };
};

/**
 * Used to connect changeList action function to the components props.
 * 
 * @param {*} dispatch 
 */
function mapDispatchToProps(dispatch) {
    return {
        changeList: list => dispatch(changeList(list))
    };
}

class ConnectedList extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div>
                {this.props.lists && this.props.lists.map(list => (
                    <div  className="created-list" onClick={this.setCurrentList.bind(this, list)}>
                        <div><img className="add-new-list" src="../icon/list.png"/></div>
                        <div className="list-name" key={list.id}>
                            <p>{list.title}</p>
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    /**
     * Sets the clicked list as currentList object in redux state.
     * By calling the changeList action.
     * @param {} list 
     */
    setCurrentList(list) {
        this.props.changeList(list);
    }
}

const List = connect(mapStateToProps, mapDispatchToProps)(ConnectedList);
export default List;