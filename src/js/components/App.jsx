import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
  
import List from "./List.jsx";
import Form from "./Form.jsx";
import Task from "./Task.jsx";


const App = () => (
    <div className="container">
        <div className="header">
            <span>To-Do</span>
            <i className="material-icons search-icon">search</i>
            <input type="text" className="search-box" placeholder="Search"/>
        </div>
        <div className="main-frame">
            <div id="side-nav-bar">
                <div className="menu-icon">
                    <button className="menu-btn" id="icon" value="open">
                        <i className="material-icons" >menu</i>
                    </button>
                </div>
                <div className="side-div">  
                    <div className="side-menu-icon">
                        <div className="day-icon"></div>
                    </div>
                    <div className="icon-desc">
                        <a href="" className="icon-description">My Day</a>
                    </div>
                </div>    	
                <div className="side-div">
                    <div className="side-menu-icon">
                        <div className="important-icon"></div>
                    </div>
                    <div className="icon-desc">
                        <a href="" className="icon-description">Important</a>
                    </div>
                </div>
                <div className="side-div"> 
                    <div  className="side-menu-icon">
                        <div className="plan-icon"></div>
                    </div>
                    <div className="icon-desc">
                        <a href="" className="icon-description">Planned</a>
                    </div>
                </div>    
                <div className="side-div">
                    <div className="side-menu-icon" >
                        <div className="home-icon"></div>
                    </div>
                    <div id="task-desc" className="task-desc">    
                            <p className="action-description">Tasks</p>
                    </div>
                </div>
                <List />
                <Form />
            </div>
            <Task />
        </div>

    </div>
);

export default App;