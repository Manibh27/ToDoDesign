import React, { Component } from "react";
import { connect } from "react-redux";
import uuidv1 from "uuid";
import { addList } from "../actions/index";

function mapDispatchToProps(dispatch) {
    return {
        addList: list => dispatch(addList(list))
    };
}

class ConnectedForm extends Component {
    constructor() {
        super();
        this.state = {
            title: ""
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        if (event.key === 'Enter') {
            const title = event.target.value;
            const id = uuidv1();
            const tasks = [];
            this.props.addList({ title, id, tasks});
            this.setState({ title: "" });
        }
    }
    render() {
        const { title } = this.state;
        return (
            <div className="side-div"> 
                <div className="side-menu-icon" >
                    <div id="new-list" className="add-icon new-list-icon"></div>
                </div>
                <div className="new-list-input">
                    <input id="add-list" type="text" className="new-list" onKeyDown={this.handleSubmit} 
                        placeholder="New List"/>
                </div>
            </div>
        );
    }
}

const Form = connect(null, mapDispatchToProps)(ConnectedForm);
export default Form;