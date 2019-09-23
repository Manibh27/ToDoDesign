
// Object to store the task informations.
var lists = [];
var tasks = [];
var id = 0;
var taskId = 0;
var defaultList = {};
defaultList.name = "Tasks";
defaultList.id = 0;
defaultList.tasks= [];
lists.push(defaultList);

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
   var sideBar = getElementsByClass("menu-bar");
   sideBar[0].style.width="20%";
}

/**
 * Open the task information bar. Removes the previous steps.
 * And prints the steps added for the particular task.
 */
function getInfo() {
   var taskInfo = getElementsByClass("task-info");
   var sideBar = getElementsByClass("menu-bar");
   sideBar[0].style.width="27%";
   taskInfo[0].style.display="block";
   taskId = this.id;
   getElementsByClass("mark-complete-btn")[0].addEventListener("click", finishTask.bind(taskId))
   
   getElementById("task-info-name").innerHTML = "<p class='task-info-title'>"+this.name+"</P>";
   if (lists[id].tasks[taskId].isComplete === false) {
       getElementsByClass("task-info-title")[0].style.textDecoration = "line-through";
   }
   getElementById("steps").innerHTML = "";
   var stepInfos = lists[id].tasks[taskId].steps;
   for (var step = 0 ; step < stepInfos.length; step = step + 1) {
        var newStep = getDivWithClass("created-steps");
        var steps = getElementById("steps");
        newStep.innerHTML = "<a class='step-icon-link'>"
            + "<i class='material-icons step-icon'>check_circle_outline</i></a>"+
              "<p class='step'>"+stepInfos[step].name+"</p>";
        steps.appendChild(newStep);
        console.log(stepInfos[step].id);
        getElementsByClass("step-icon")[step].addEventListener("click", finishStep.bind(stepInfos[step]));
        if (stepInfos.length > 2) {
            steps.style.height = "50px";
            steps.style.overflow = "auto";
        } else {
            steps.style.height = "";
        }
   }
   getElementById("add-step").value = "";
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
        var task = {};
        tasks = lists[id].tasks;
        task.id = tasks.length;
        taskId = task.id;
        task.isComplete = true;
        task.name = event.target.value;
        task.steps = [];
        tasks.push(task);


        // Append the created div with the main to-dolist div.
        //todoListDiv.appendChild(newTask);
        var completedDiv = getDivWithClass("added-task");
	
        // After new div is created the previous div is modified. 
        completedDiv.innerHTML = 
            "<a><i class='material-icons tick-icon'>check_circle_outline</i></a>"
             +"<p class='task-name'>"+event.target.value+"</p>";
        taskContainer.appendChild(completedDiv);
        count = count + 1;
        var taskIcon = getElementsByClass("tick-icon");
        taskIcon[taskIcon.length - 1].addEventListener("click", finishTask.bind(task.id));
        var taskName = getElementsByClass("task-name");
        taskName[taskName.length - 1].addEventListener("click", 
                getInfo.bind(task));
        addTask[0].addEventListener("keyup", createNewTaskDiv );
        var completeIcon = getElementsByClass("tick-icon");
        completeIcon[0].addEventListener("focus", showCompleteIcon);
        completeIcon[0].addEventListener("click", finishTask);
        getElementById("add-new-task").value = "";
        if (tasks.length > 6) {
            taskContainer.style.height = "400px";
            taskContainer.style.overflow = "auto";
        } else {
            taskContainer.style.height = "";
        }
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
    if (lists[id].tasks[this].isComplete === true) {
        lists[id].tasks[this].isComplete = false;
        completeTask[this].style.textDecoration = "line-through";
        getElementsByClass("task-info-title")[0].style.textDecoration = "line-through";
        getElementsByClass("tick-icon")[this].innerHTML = "check_circle";
    } else {
        lists[id].tasks[this].isComplete = true;
        completeTask[this].style.textDecoration = "none";
        getElementsByClass("task-info-title")[0].style.textDecoration = "none";
        getElementsByClass("tick-icon")[this].innerHTML = "check_circle_outline";
    }
}

var addList = getElementsByClass("new-list");
var listCount = 1;

/**
 * When a new list is added , a new object is created and the entered value is
 * placed in a new div and appended with the parent div. Then a eventlistner is 
 * added to the list to change the list in main div.
 */
function addNewList(event) {
    if (event.keyCode === 13 && event.target.value !== "") { 
        defaultId = 1;  
        var listDiv = getElementById("lists");
        var currentlist = createNewList();
        currentlist.name = event.target.value; 
        currentlist.id = listCount;
        id = listCount;       
        lists.push(currentlist);
        getElementById("task-name").innerHTML =  currentlist.name;
        getElementById("task-info-name").innerHTML =  currentlist.name;
        if (lists.length < 7) {
            var listIconDiv = getElementById("list-icon-div");
            var listIcon = getNewDiv();
            listIcon.innerHTML = 
                '<a href="#add-list"><img class="add-new-list" src="icon/list.png"></a>';
            listIconDiv.appendChild(listIcon);
        }
        var newListDiv = getDivWithClass("lists");
        newListDiv.setAttribute("id", lists.length - 1);
        newListDiv.innerHTML = '<p class="created-list">'+event.target.value+'</p>';
        listDiv.appendChild(newListDiv);
        var newList = getElementsByClass("new-list-input");
        var listInput = getTextInputWithClass("new-list");
        newList[0].appendChild(listInput);
        newListDiv.addEventListener("click", changeList.bind(currentlist));
        listCount = listCount + 1;
        addList[0].addEventListener("keyup", addNewList);
        getElementById("add-list").value = "";
        var existingDivIcon = getElementById('task-container').innerHTML = "";
        getElementById("task-container").style.height = "";
        if (lists.length > 5) {
            getElementById("lists").style.height = "145px";
            getElementById("lists").style.overflow = "auto";
        }
    }
}

addList[0].addEventListener("keyup", addNewList);

/**
 * Create a new list object with name, id and an tasks array.
 *
 * @return {object} - A newly created list object.
 */
function createNewList() {
    var list = {};
    list.name;
    list.id;
    list.tasks = [];
    return list;
}


/**
 * When the list is clicked the array of task within the list is iterated and 
 * printed in the screen. The tasks of the previous list is removed.
 */
function changeList() {
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
             +"<p class='task-name'>"+this.tasks[task].name+"</p>";
		taskContainer.appendChild(newDiv);
        var completeIcon = getElementsByClass("tick-icon");
        var taskDetails = getElementsByClass("task-name");
        taskDetails[task].addEventListener("click", getInfo.bind(this.tasks[task]));
        completeIcon[task].addEventListener("focus", showCompleteIcon);
        if (this.tasks[task].isComplete === false) {
            taskDetails[task].style.textDecoration = "line-through";
        } else {
            completeIcon[task].addEventListener("click", finishTask.bind(task));
        }
        getElementById("add-new-task").value = "";
    }
    if (this.tasks.length > 6) {
        taskContainer.style.height = "400px";
        taskContainer.style.overflow = "auto";
    } else {
        taskContainer.style.height = "";
    }
}

// Adding event listneer to add steps.
var step = getElementById("add-step");
step.addEventListener("keyup", addStep);

/**
 * When a any input is eneterd in add step input it checks for enter.
 * If enter is pressed then a new div is created and the value is appended
 * with steps div.
 */
function addStep(event) {
    if (event.keyCode === 13 && event.target.value !== "") {
        var newStep = getDivWithClass("created-steps");
        var steps = getElementById("steps");
        newStep.innerHTML = "<a class='step-icon-link'>"
            + "<i class='material-icons step-icon'>check_circle_outline</i></a>"+
            "<p class='step'>"+event.target.value+"</p>";
        steps.style.height = "";
        steps.appendChild(newStep);
        var step = {};
        step.name = event.target.value;
        step.id = lists[id].tasks[taskId].steps.length;
        step.isComplete = true;
        lists[id].tasks[taskId].steps.push(step);
        getElementsByClass("step-icon")[step.id].addEventListener("click", finishStep.bind(step));
        getElementById("add-step").value = "";
        if (lists[id].tasks[taskId].steps.length > 2) {
            steps.style.height = "50px";
            steps.style.overflow = "auto";
        } else {
            steps.style.height = "";
        }
    }
}


function finishStep() {
    console.log("step");
    if (this.isComplete === true) {
        console.log("true");
        this.isComplete = false;
        getElementsByClass("step")[this.id].style.textDecoration = "line-through";
        getElementsByClass("step-icon")[this.id].innerHTML = "check_circle";
    } else {
        console.log("fasle");
        this.isComplete = true;
        getElementsByClass("step")[this.id].style.textDecoration = "none";
        getElementsByClass("step-icon")[this.id].innerHTML = "check_circle_outline"
    }
}

var homeList = getElementsByClass("task-desc");
homeList[0].addEventListener("click", changeList.bind(lists[0]));

