import React, { Component } from "react";
import { connect } from "react-redux";
import { changeList } from "../actions/index";

function mapStateToProps(state) {
    return { lists: state.lists };
};

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
            <ul>
                {this.props.lists && this.props.lists.map(list => (
                    <li key={list.id} className="created-list" onClick={this.setCurrentList.bind(this, list)}>{list.title}</li>
                ))}
            </ul>
        );
    }

    setCurrentList(list) {
        this.props.changeList(list);
    }
}

const List = connect(mapStateToProps, mapDispatchToProps)(ConnectedList);
export default List;