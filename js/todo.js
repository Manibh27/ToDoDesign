
// Object to store the task informations.
var lists = [];
var tasks = [];
var id = 0;

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

// Add an event listener to menu button.
var menuBtn = getElementById("icon");
menuBtn.addEventListener("click", openMenu);

// when add list is clicked the menu bar is opened.
var newList = getElementById("new-list");
newList.addEventListener("click", openMenu);

// To minize the right side information bar.
var minimize = getElementById("minimize");
minimize.addEventListener("click", minimizeInfo);

// Event listener to open the information side bar.
var info = getElementById("info");
info.addEventListener("click", getInfo);

/**
 * Checks whether the menu bar is in open or close.
 * If it is in open, close the menu bar and set the value close 
 * and performs in vice versa when it is in close.
 */
function openMenu() {
    var iconValue = getElementValueById("icon");
    var sideBar = getElementById("side-nav-bar");
	var listBar = getElementById("todo-list");
    if (iconValue == "close") {
        sideBar.style.display= "block";
        setElementValueById("icon", "open");
    }
    if (iconValue == "open") {
        sideBar.style.display= "none";
        setElementValueById("icon", "close");
    }
}

/**
 * Minimize the right side bar by making style display none.
 */
function minimizeInfo() {
   var taskInfo = getElementsByClass("task-info");
   taskInfo[0].style.display="none";
   var sideBar = getElementById("side-nav-bar");
   sideBar.style.width="23.8%";
}

/**
 * Open the right side bar by making style display block.
 */
function getInfo() {
   var taskInfo = getElementsByClass("task-info");
   var sideBar = getElementById("side-nav-bar");
   sideBar.style.width="32.8%";
   taskInfo[0].style.display="block";
   getElementById("task-info-name").innerHTML = this;
}

var count = 0;
var addTask = getElementsByClass("add-task-input");

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
        tasks.push(event.target.value);

        // Append the created div with the main to-dolist div.
        //todoListDiv.appendChild(newTask);
        var completedDiv = getDivWithClass("added-task");
	
        // After new div is created the previous div is modified. 
        completedDiv.innerHTML = 
            "<a><i class='material-icons tick-icon'>check_circle_outline</i></a>"
             +"<p class='task-name'>"+event.target.value+"</p>";
		taskContainer.appendChild(completedDiv);
        count = count + 1;
        addTask[0].addEventListener("keyup", createNewTaskDiv );
        var completeIcon = getElementsByClass("tick-icon");
        completeIcon[0].addEventListener("focus", showCompleteIcon);
        completeIcon[0].addEventListener("click", finishTask);
    }
}

/**
 * Creates a new add task div with corresponding class.
 */
function createNewTask() {
    var newTask = getDivWithClass("add-new-task");
    var textInput = getTextInputWithClass("add-task-input");
    textInput.setAttribute("id", "add-new-task");
    newTask.innerHTML =
            '<a href="#add-new-task"><i class="material-icons new-task-icon">add</i></a>';
    newTask.appendChild(textInput);
    return newTask;
}

addTask[0].addEventListener("keyup", createNewTaskDiv);

// Add event listner for focus of complete icon.


/**
 * When the strike task icon is focused the icon is changed.  
 */
function showCompleteIcon() {
    completeIcon[0].innerHTML = '<i class="material-icons tick-icon">check_circle</i>'
}

/**
 * when the finish task icon is clicked the task icon is changed and stiked out.
 */
function finishTask() {
    var completeTask = getElementsByClass("task-name");
    completeTask[0].style.textDecoration = "line-through";
}

var addList = getElementsByClass("new-list");
var listCount = 0;
function addNewList(event) {
    if (event.keyCode === 13 && event.target.value !== "") {   
        var listDiv = getElementById("lists");
        var currentlist = {};
        currentlist.name = event.target.value; 
        currentlist.id = listCount;
        id = listCount;
        currentlist.tasks = [];
        lists.push(currentlist);
        getElementById("task-name").innerHTML =  currentlist.name;
        getElementById("task-info-name").innerHTML =  currentlist.name;
        var listIconDiv = getElementById("list-icon-div");
        var listIcon = getNewDiv();
        listIcon.innerHTML = 
            '<a href="#add-list"><img class="add-new-list" src="icon/list.png"></a>';
        listIconDiv.appendChild(listIcon);
        var newListDiv = getDivWithClass("lists");
        newListDiv.setAttribute("id", lists.length - 1);
        newListDiv.innerHTML = '<p class="created-list">'+event.target.value+'</p>';
        listDiv.appendChild(newListDiv);
        var newList = getElementsByClass("new-list-input");
        var listInput = getTextInputWithClass("new-list");
        newList[0].appendChild(listInput);
        newListDiv.addEventListener("click", changeTask.bind(currentlist));
        listCount = listCount + 1;
        addList[0].addEventListener("keyup", addNewList);
    }
}

addList[0].addEventListener("keyup", addNewList);

function changeTask() {
    getElementById("task-name").innerHTML = this.name;
    id = this.id;
    var existingDiv = getElementsByClass('tick-icon');
    var existingDivIcon = getElementById('task-container').innerHTML = "";

    for(var task = 0; task < this.tasks.length; task = task + 1) {
        var taskContainer = getElementById("task-container");
       
        var newDiv = getDivWithClass("added-task");
	
        // After new div is created the previous div is modified. 
        newDiv.innerHTML = 
            "<a><i class='material-icons tick-icon'>check_circle_outline</i></a>"
             +"<p class='task-name'>"+this.tasks[task]+"</p>";
		taskContainer.appendChild(newDiv);
        var completeIcon = getElementsByClass("tick-icon");
        var taskDetails = getElementsByClass("task-name");
        taskDetails[task].addEventListener("click", getInfo.bind(this.tasks[task]));
        completeIcon[0].addEventListener("focus", showCompleteIcon);
        completeIcon[0].addEventListener("click", finishTask);
    }
}

