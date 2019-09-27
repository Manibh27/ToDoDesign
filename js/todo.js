"use strict";

// Global variables.
var lists = [];
var tasks = [];
var id = 0;
var taskId = 0;
var addList = getElementsByClass("new-list");
var listCount = 1;
var count = 0;
var addTask = getElementsByClass("add-task-input");

init();

function init() {
    initEventListeners();
    initiateDefaultList();
}

/**
 *  An event listener for the particular element is added for the given action.
 * 
 * @param {element} element -Element for which the listener to be added. 
 * @param {String} action - Type of event.
 * @param {function} functionName - Function to be performed for the particular action.
 * @param {object} bindValue - If the bindValue is passed it is binded with the function. 
 */
function addListener(element, action, functionName, bindValue = "") {
    element.addEventListener(action, functionName.bind(bindValue));
}

/**
 * Default task list stored in the first index of the global array
 */
function initiateDefaultList() {
    var defaultList = {};
    defaultList.name = "Tasks";
    defaultList.id = 0;
    defaultList.tasks= [];
    lists.push(defaultList);

    // Adding event listener to default list. 
    var homeList = getElementsByClass("task-desc");
    addListener(homeList[0], "click", changeList, defaultList);
}

/**
 * All global event listeners are initiated.
 */
function initEventListeners() {

    // Add an event listener to menu button.
    addListener(getElementById("icon"), "click", openMenu);

    // when add list is clicked the menu bar is opened.
    addListener(getElementById("new-list"), "click", openMenu);

    // To minize the right side information bar.
    addListener(getElementById("minimize"), "click", minimizeInfo);

    // Adding event listener to create new lists. 
    addListener(getElementsByClass("new-list")[0], "keyup", addNewList);

    // Adding event listner to add steps.
    addListener(getElementById("add-step"), "keyup", addStep);

    // Adding event listener to save notes on moving out of notes.
    addListener(getElementsByClass("notes")[0], "blur", saveNotes);

    //Add event listener to delete icon to delete task.
    addListener(getElementById("delete"), "click", getConfirmation);

    // Add event listener to create new task.
    addListener(getElementsByClass("add-task-input")[0], "keyup", createNewTaskDiv);
}

/**
 * Return the element with the given id.
 *
 * @param {String} id - Element corresponding to this id is returned.  
 * @return {element} - Element with corresponding id.
 */
function getElementById(id) {
    return document.getElementById(id);
}

/**
 *  Append the child elemnt with the parent element.
 * 
 * @param {element} parentElement - Element to which the sub element to be appended. 
 * @param {element} childElement - Element to be appended.
 */
function appendElement(parentElement, childElement) {
    parentElement.appendChild(childElement);
}

/**
 * Return the list of elements with the given class as an array.
 *
 * @param {String} className - Elements corresponding to this className are returned.  
 * @return {elements} - Elements with the className..
 */
function getElementsByClass(className) {
    return document.getElementsByClassName(className);
}

/**
 * Create a new div and set the given class as attribute to the class.
 *
 * @param {String} className - Set the given class as an attribute to the new div.  
 * @return {div} - Div with given class as attribute.
 */
function getDivWithClass(className) {
    var newTask = document.createElement("DIV");
    newTask.setAttribute("class", className);     
    return newTask;
}

/**
 * Set the given value as string in the innerHTML for the given element. 
 * @param {div} element - Div for in which the value to be set. 
 * @param {String} value - Value to be set.
 */
function setInnerHTML(element, value) {
    element.innerHTML = value;
}

/**
 * Create a new text input element with the given class as attribute.
 *
 * @param {String} className - Set the given class as an attribute to the input element.  
 * @return {input} - Input with given class as attribute.
 */
function getTextInputWithClass(className) {
    var input = document.createElement("input");
    input.setAttribute('type', 'text');
    input.setAttribute("class", className); 
    return input;
}

/**
 * Create a new div and return it.
 *
 * @return {div} - Newly created div.
 */
function getNewDiv() {
    return document.createElement("DIV");
}

/**
 * Return the value of the element with the given id.
 *
 * @param {String} id - Element value corresponding to this id is returned.  
 * @return {String} - Element value with corresponding id.
 */
function getElementValueById(id) {
    return document.getElementById(id).value;
}

/**
 * Set the given value for the element with corresponding id.
 *
 * @param {String} id - Element value corresponding to this id is returned.  
 * @param {String} value - Value to be set.
 */
function setElementValueById(id, value) {
    document.getElementById(id).value = value;
}

/**
 * Checks whether the menu bar is in open or close.
 * If it is in open, close the menu bar and set the value close 
 * and performs in vice versa when it is in close.
 */
function openMenu() {
    var sideBar = getElementById("side-nav-bar");
    sideBar.classList.toggle("side-bar-width");
    var iconDescriptions =  getElementsByClass("icon-desc");
    for (var iconDescription of iconDescriptions) {
        iconDescription.classList.toggle("display");
    }
    getElementsByClass("task-desc")[0].classList.toggle("display");
    getElementsByClass("new-list-input")[0].classList.toggle("display");
    getElementById("new-lists").classList.toggle("display");
}

/**
 * Minimize the right side bar by making style display none.
 */
function minimizeInfo() {
   var taskInfo = getElementsByClass("task-info");
   taskInfo[0].style.display="none";
   var sideBar = getElementsByClass("menu-bar");
   sideBar[0].style.width="19%";
}

/**
 * Updates the task name when the task name is changed and press enter.
 * @param {*} event - Used to find whether the pressed key is enter.
 */
function changeTaskName(event) {
    if (event.keyCode === 13 && event.target.value !== "") {
        lists[id].tasks[taskId].name = event.target.value;
        setInnerHTML(getElementsByClass("task-name")[taskId], event.target.value)
    }
}


/**
 * Checks whether the entered key is enter, if it is enter create a new
 * div and append it with todo-list div and modify the last div.
 */
function createNewTaskDiv(event) {
    if (event.keyCode === 13 && event.target.value !== "") {   

        // Creates a new add task div with the coressponding class.
        var newTask =  createNewTask();    
        var taskContainer = getElementById("task-container");
        tasks = lists[id].tasks;
        var task = getNewTask(tasks.length, event.target.value);
        var completedDiv = createNewTask(event.target.value);
        appendElement(taskContainer, completedDiv);
        count = count + 1;
        var taskIcon = getElementsByClass("tick-icon");
        addListener(taskIcon[taskIcon.length - 1], "click", finishTask, task.id);
        var taskName = getElementsByClass("task-name");
        addListener(taskName[taskName.length - 1], "click", getInfo, task);
        addListener(addTask[0], "keyup", createNewTaskDiv);
        getElementById("add-new-task").value = "";
        setInnerHTML(getElementsByClass("tasks-count")[id - 1], getTasksLength());
        if (tasks.length > 4) {
            taskContainer.style.height = "400px";
            taskContainer.style.overflow = "auto";
        } else {
            taskContainer.style.height = "";
        }
    }
}

/**
 * Creates a new task object set the attributes and its value.
 * 
 * @param {int} newTaskId - Length of the task created is assigned as the id.  
 * @param {String} newTaskName - Name of the new task added.
 * @return {Object} - Created new task object.
 */
function getNewTask(newTaskId, newTaskName) {
    var task = {};
    task.id = newTaskId;
    taskId = task.id;
    task.deleteStatus = false;
    task.isComplete = true;
    task.name = newTaskName
    task.steps = [];
    task.notes;
    tasks.push(task);
    return task;
}

/**
 * Return the length of tasks which is not completed of the current list.
 * 
 * @return {int} length - Length of tasks.
 */ 
function getTasksLength() {
    return lists[id].tasks.filter(task => task.isComplete === true).length;
}

/**
 * Creates a new add task div with corresponding class.
 */
function createNewTask() {
    var newTask = getDivWithClass("add-new-task");
    var textInput = getTextInputWithClass("add-task-input");
    textInput.setAttribute("id", "add-new-task");
    var newTaskValue =
            '<a href="#add-new-task"><i class="material-icons new-task-icon">add</i></a>';
    setInnerHTML(newTask, newTaskValue);
    appendElement(newTask, textInput);
    return newTask;
}

/**
 * when the finish task icon is clicked the task icon is changed and stiked out.
 */
function finishTask() {
    getElementById("task-info-name").innerHTML = 
           "<p class='task-info-title'>"+lists[id].tasks[taskId].name+"</P>";
    if (lists[id].tasks[this].isComplete === true) {
        lists[id].tasks[this].isComplete = false;
        changeTaskCompleteStatus(this, "line-through", "check_circle");
    } else {
        lists[id].tasks[this].isComplete = true;
        changeTaskCompleteStatus(this, "none", "check_circle_outline");
    }
}

/**
 * Change the status of the task if it is marked completed the name is striked.
 * If not then the strike is removed. Then the icon is changed accordingly.
 * 
 * @param {int} currentTaskId - Id  of task to be striked.
 * @param {String} textStyle - Text style to be changed.
 * @param {String} iconStyle - Icon name according to the text style.
 */
function changeTaskCompleteStatus(currentTaskId, textStyle, iconStyle) {
    var completeTask = getElementsByClass("task-name");
    completeTask[currentTaskId].style.textDecoration = textStyle;
    getElementsByClass("task-info-title")[0].style.textDecoration = textStyle;
    setInnerHTML(getElementsByClass("tick-icon")[currentTaskId], iconStyle);
    setInnerHTML(getElementsByClass("tasks-count")[id - 1], getTasksLength());
}

/**
 * When a new list is added , a new object is created and the entered value is
 * placed in a new div and appended with the parent div. Then a eventlistner is 
 * added to the list to change the list in main div.
 */
function addNewList(event) {
    if (event.keyCode === 13 && event.target.value !== "") { 
        var listDiv = getElementById("lists");
        var currentlist = createNewList(event.target.value);
        var title = getTextInputWithClass("task-title-input");
        title.value = currentlist.name;
        var listTitle = getElementById("list-title");
        listTitle.innerHTML = "";
        appendElement(listTitle, title);
        setInnerHTML(getElementById("task-info-name"), currentlist.name);
        var newListDiv = getNewList(lists.length - 1, currentlist.name);
        appendElement(getElementById("new-lists"), newListDiv);
        addListener(newListDiv, "click", changeList, currentlist);
        listCount = listCount + 1;
        getElementById("add-list").value = "";
        setInnerHTML(getElementById('task-container'), "");
        if (lists.length > 5) {
            getElementById("side-nav-bar").style.height = "600px";
            getElementById("side-nav-bar").style.overflow = "auto";
        }
        addListener(getElementsByClass("task-title-input")[0], "keyup", changeListName);
    }
}

/**
 * Creates a new div and set the list attributes to the div.
 * 
 * @param {int} divId - Length of the list is assigned as id for the div.
 * @param {String} listName - Name of the list added.
 */
function getNewList(divId, listName) {
    var newListDiv = getDivWithClass("created-lists");
    newListDiv.setAttribute("id", divId);
    var length = "0";
    var newListValue = '<a href="#add-list"><img class="add-new-list" src="icon/list.png"></a>'+
            '<p class="created-list">'+ listName +'</p>' +
            '<p class="tasks-count">'+ length +'</p>';
    setInnerHTML(newListDiv, newListValue);
    return newListDiv;
}

/**
 * When the list name is updated and pressed enter the list name is changed.
 * @param {} event -  Used to find whether the pressed key is enter.
 */
function changeListName(event) {
    if (event.keyCode === 13 && event.target.value != "") {
        lists[id].name = event.target.value;
        setInnerHTML(getElementsByClass("created-list")[id - 1], event.target.value);
    }
}

/**
 * If the enterd name is already present then the name is concated with no of the
 * times it is repeated.
 */
function getListName(name) {
    console.log(name);
    var repeatedCount = getRepeatedListCount(name);
    console.log("count " + repeatedCount);
    if (repeatedCount === 0) {
        return name; 
    } else {
        return name+"("+repeatedCount+")";
    }
}

/**
 * Return the count of list name repeated.
 * 
 * @return {int} length - count of repeated name.
 */ 
function getRepeatedListCount(name) {
    return lists.filter(list => list.subName === name).length;
}

/**
 * Create a new list object with name, id and an tasks array.
 * 
 * @param {String} listName - Name of the list enterd.
 * @return {object} - A newly created list object.
 */
function createNewList(listName) {
    var list = {};
    list.tasks = [];
    id = listCount;   
    list.name = getListName(listName); 
    list.subName = listName;
    list.id = listCount;    
    lists.push(list);
    return list;
}

/**
 * Creates a new div, set the icon and the the name of the created task in the div through innerHTML.
 * 
 * @param {String} createdTaskName - name of the created task. 
 * @return {div} - Div with the created task values.
 */
function createNewTask(createdTaskName) {
    var newDiv = getDivWithClass("added-task");
    var taskValue = "<a><i class='material-icons tick-icon'>check_circle_outline</i></a>"
        + "<p class='task-name'>" + createdTaskName + "</p>" 
        + "<p class='step-count'>0 of 0</p>";
    setInnerHTML(newDiv, taskValue);
    return newDiv;
}
/**
 * When the list is clicked the array of task within the list is iterated and 
 * printed in the screen. The tasks of the previous list is removed.
 */
function changeList() {
    id = this.id;
    getElementsByClass("task-title-input")[0].value = this.name;
    var existingDiv = getElementsByClass('tick-icon');
    var existingDivIcon = getElementById('task-container').innerHTML = "";
    for(var task = 0; task < this.tasks.length; task = task + 1) {
        if (this.tasks[task].deleteStatus !== true) {
            var taskContainer = getElementById("task-container");     
            var newDiv = createNewTask(this.tasks[task].name);
            appendElement(taskContainer, newDiv);
            var completeIcon = getElementsByClass("tick-icon");
            var taskDetails = getElementsByClass("task-name");
            taskId = this.tasks[task].id;
            setStepCount();
            addListener(taskDetails[taskDetails.length - 1], "click", getInfo, this.tasks[task]);
            if (this.tasks[task].isComplete === false) {
                taskDetails[task].style.textDecoration = "line-through";
                setInnerHTML(getElementsByClass("tick-icon")[task], "check_circle");
            } 
            addListener(completeIcon[completeIcon.length - 1], "click", finishTask, taskDetails.length - 1);
            getElementById("add-new-task").value = "";
        }
    }
    if (this.tasks.length > 4) {
        taskContainer.style.height = "400px";
        taskContainer.style.overflow = "auto";
    } 
}

/**
 * Creates a new div, add icon and name of the step created  as string to the newly created 
 * div through innerHTML.
 * 
 * @param {String} stepName - Name of the step created.
 * @return {div} - Div with created step values.
 */
function getNewStep(stepName) {
    var newStep = getDivWithClass("created-steps");
    var stepValue = "<a class='step-icon-link'>"
            + "<i class='material-icons step-icon'>check_circle_outline</i></a>"+
            "<p class='step'>" + stepName + "</p> <p class='delete-step'>x</p>";
    setInnerHTML(newStep, stepValue);
    return newStep;
}

/**
 * When a any input is eneterd in add step input it checks for enter.
 * If enter is pressed then a new div is created and the value is appended
 * with steps div.
 */
function addStep(event) {
    if (event.keyCode === 13 && event.target.value !== "") {
        var steps = getElementById("steps");
        var newStep = getNewStep(event.target.value);      
        steps.style.height = "";
        appendElement(steps, newStep);
        var step = createStep(event.target.value);
        getElementById("add-step").value = "";
        if (lists[id].tasks[taskId].steps.length > 2) {
            getElementsByClass("task-info")[0].style.height = "600px";
            getElementsByClass("task-info")[0].style.overflow = "auto";
        }
        addStepEventListener(step, newStep);
        setStepCount();
    }
}

/**
 * event listeners for step delete operation and mark complete operation is added.
 *  
 * @param {Object} step - Object of to which the listeners to be added. 
 * @param {Div} newStep - Div to which the delete function listener to be added.
 */
function addStepEventListener(step, newStep) {
    addListener(getElementsByClass("step-icon")[step.id], "click", finishStep, step);
    var deleteStep = getElementsByClass("delete-step");
    addListener(deleteStep[deleteStep.length - 1], "click", deleteSubTask, step);
    addListener(newStep, "mouseover", viewDeleteIcon, deleteStep.length - 1);
    addListener(newStep, "mouseout", hideDeleteIcon, deleteStep.length - 1);
}

/**
 * Open the task information bar. Removes the previous steps.
 * And prints the steps added for the particular task.
 */
function getInfo() {
    var taskInfo = getElementsByClass("task-info");
    taskInfo[0].style.display="block";
    taskId = this.id;
    addListener(getElementsByClass("mark-complete-btn")[0], "click", finishTask, taskId);
    var title = getTextInputWithClass("task-info-input");
    title.value = this.name;
    var taskTitle = getElementById("task-info-name");
    taskTitle.innerHTML = "";
    appendElement(taskTitle, title);
    addListener(getElementsByClass("task-info-input")[0], "keyup", changeTaskName);
    if (lists[id].tasks[taskId].isComplete === false) {
        getElementsByClass("task-info-input")[0].style.textDecoration = "line-through";
    }   
    setInnerHTML(getElementsByClass("notes")[0], lists[id].tasks[taskId].notes);
    getElementById("steps").innerHTML = "";
    var stepInfos = lists[id].tasks[taskId].steps;
     for (var step = 0 ; step < stepInfos.length; step = step + 1) {
         if (stepInfos[step].deleteStatus !== true) {
             var newStep = getNewStep(stepInfos[step].name);
             var steps = getElementById("steps");
             appendElement(steps, newStep);
             var stepIcon  = getElementsByClass("step-icon");
             var stepInfo = getElementsByClass("step");
             if (stepInfos[step].isComplete !== true) {
                 stepInfo[stepInfo.length - 1].style.textDecoration = "line-through";
                 setInnerHTML(stepIcon[stepIcon.length - 1], "check_circle");
             }
             stepInfos[step].id = stepIcon.length - 1;
             addStepEventListener(stepInfos[step], newStep);
         }
    }
    getElementById("add-step").value = "";
 }

/**
 * Creates a new step object and set the default attributes and value for it.
 * 
 * @param {String} stepName - Name of the step entered.
 * @return {Object} - New step object.
 */
function createStep(stepName) {
    var step = {};
    step.deleteStatus = false;
    step.name = stepName;
    step.id = lists[id].tasks[taskId].steps.length;
    step.isComplete = true;
    lists[id].tasks[taskId].steps.push(step);
    return step;
}

/**
 * Calculates the number of steps completed and the total steps length of the particular task.
 * Then set the value near the task name. 
 */
function setStepCount() {
    getElementsByClass("step-count")[taskId].innerHTML =  getStepsLength() + " of " 
            + lists[id].tasks[taskId].steps.filter(stepInfo => stepInfo.deleteStatus === false).length;
}
/**
 * When the mouse is moved over the sub task the delete symbol will be displayed.
 */
function viewDeleteIcon() {
    getElementsByClass("delete-step")[this].style.display = "block";
}

/**
 * When the mouse is moved from the sub task the delete symbol will be hidden.
 */
function hideDeleteIcon() {
    getElementsByClass("delete-step")[this].style.display = "none";
}

/**
 * When the subtask is deleted, the deleteStatus is changed.
 */
function deleteSubTask() {
    this.isComplete = false;
    this.deleteStatus = true;
    var modifiedStepCount = getStepsLength() + " of " + lists[id].tasks[taskId].steps.length;
    setInnerHTML(getElementsByClass("step-count")[taskId], modifiedStepCount);
    var updateSteps = getInfo.bind(lists[id].tasks[taskId]);
    updateSteps();
    var updateTasks = changeList.bind(lists[id]);
    updateTasks();
}
/**
 * Return the length of sub tasks which is not completed of the current task.
 * 
 * @return {int} length - Length of sub tasks.
 */ 
function getStepsLength() {
    return lists[id].tasks[taskId].steps.filter(step => (step.isComplete !== true || step.deleteStatus === true)).length;
}

/**
 * When the step is marked complete it is striked and the icon is changed.
 * When the step is unmarked the strike is removed and the icon is changed.
 */
function finishStep() {
    if (this.isComplete === true) {
        this.isComplete = false;
        changeStepCompleteStatus(this.id, "line-through", "check_circle");
    } else {
        this.isComplete = true;
        changeStepCompleteStatus(this.id, "none", "check_circle_outline");
    }
}

/**
 * If the step is marked complete then the step name is striked and similarly when
 * the step is removed from complete the strike is removed. 
 * 
 * @param {int} stepId - Id of the step name to striked or un striked.
 * @param {String} textStyle - Style to strike or remove.
 * @param {String} iconName - To change icon as per the status.
 */
function changeStepCompleteStatus(stepId, textStyle, iconName) {
    getElementsByClass("step")[stepId].style.textDecoration = textStyle;
    setInnerHTML(getElementsByClass("step-icon")[stepId], iconName);
    var modifiedStepCount = getStepsLength() + " of " 
            + lists[id].tasks[taskId].steps.filter(stepInfo => stepInfo.deleteStatus === false).length;
    setInnerHTML(getElementsByClass("step-count")[taskId], modifiedStepCount);
        
}

//Adding notes for each task.
function saveNotes(event) {
    lists[id].tasks[taskId].notes = event.target.textContent;
}

/**
 * When the task is deleted, a confirmation popup is rised. If it is confirmed the status is changed.
 */
function getConfirmation() {
    var modal = document.getElementById("myModal");
    var cancel = getElementsByClass("cancel")[0];
    modal.style.display = "block";
    cancel.onclick = function() {
        modal.style.display = "none";
    }
    var deleteTask = getElementsByClass("delete-task")[0];
    deleteTask.onclick = function() {
        modal.style.display = "none";
        console.log(lists[id].tasks[taskId]);
        lists[id].tasks[taskId].isComplete = false;
        lists[id].tasks[taskId].deleteStatus = true;
        var updateTasks = changeList.bind(lists[id]);
        updateTasks();
        minimizeInfo();
        setInnerHTML(getElementsByClass("tasks-count")[id - 1], getTasksLength());
    }
}