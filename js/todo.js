
// Global array to maintain the newly creating list.
var lists = [];
var tasks = [];
var id = 0;
var taskId = 0;

// Default task list stored in the first index of the global array
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


/**
 * Checks whether the menu bar is in open or close.
 * If it is in open, close the menu bar and set the value close 
 * and performs in vice versa when it is in close.
 */
function openMenu() {
    var iconValue = getElementValueById("icon");
    var sideBar = getElementById("side-nav-bar");
    if (iconValue == "close") {
        sideBar.style.width= "4%";
        setElementValueById("icon", "open");
        getElementsByClass("side-menu-icon")[0].style.height = "4rem";
        getElementsByClass("side-menu-icon")[1].style.height = "4rem";
        getElementsByClass("side-menu-icon")[2].style.height = "4rem";
        getElementsByClass("side-menu-icon")[3].style.height = "4rem";
        getElementsByClass("icon-desc")[0].style.display = "none";
        getElementsByClass("icon-desc")[1].style.display = "none";
        getElementsByClass("icon-desc")[2].style.display = "none";
        getElementsByClass("task-desc")[0].style.display = "none";
        getElementsByClass("new-list-input")[0].style.display = "none";
        getElementById("new-lists").style.display = "none";
    }
    if (iconValue == "open") {
        sideBar.style.width= "19%";
        setElementValueById("icon", "close");
        getElementsByClass("icon-desc")[0].style.display = "block";
        getElementsByClass("icon-desc")[1].style.display = "block";
        getElementsByClass("icon-desc")[2].style.display = "block";
        getElementsByClass("task-desc")[0].style.display = "block";
        getElementsByClass("new-list-input")[0].style.display = "block";
        getElementById("new-lists").style.display = "block";
    }
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
   var title = getTextInputWithClass("task-info-input");
   title.value = this.name;
   var taskTitle = getElementById("task-info-name");
   taskTitle.innerHTML = "";
   taskTitle.appendChild(title);
   getElementsByClass("task-info-input")[0].addEventListener("keyup", changeTaskName);
   if (lists[id].tasks[taskId].isComplete === false) {
       getElementsByClass("task-info-input")[0].style.textDecoration = "line-through";
   }
   
   getElementsByClass("notes")[0].innerHTML = lists[id].tasks[taskId].notes;
   getElementById("steps").innerHTML = "";
   var stepInfos = lists[id].tasks[taskId].steps;
    for (var step = 0 ; step < stepInfos.length; step = step + 1) {
        if (stepInfos[step].deleteStatus !== true) {
            var newStep = getDivWithClass("created-steps");
            var steps = getElementById("steps");
            newStep.innerHTML = "<a class='step-icon-link'>"
                + "<i class='material-icons step-icon'>check_circle_outline</i></a>"+
                "<p class='step'>"+stepInfos[step].name+"</p> <p class='delete-step'>x</p>";
            steps.appendChild(newStep);
            if (stepInfos[step].isComplete !== true) {
                getElementsByClass("step")[step].style.textDecoration = "line-through";
                getElementsByClass("step-icon")[step].innerHTML = "check_circle";
            }
            getElementsByClass("step-icon")[step].addEventListener("click", finishStep.bind(stepInfos[step]));
            var deleteStep = getElementsByClass("delete-step");
            deleteStep[deleteStep.length - 1].addEventListener("click", deleteSubTask.bind(stepInfos[step]));
            newStep.addEventListener("mouseover", viewDeleteIcon.bind(deleteStep.length - 1));
            newStep.addEventListener("mouseout", hideDeleteIcon.bind(deleteStep.length - 1));
        }
   }
   getElementById("add-step").value = "";
}

function changeTaskName(event) {
    if (event.keyCode === 13 && event.target.value !== "") {
        lists[id].tasks[taskId].name = event.target.value;
        getElementsByClass("task-name")[taskId].innerHTML = event.target.value;
    }
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
        task.deleteStatus = false;
        task.isComplete = true;
        task.name = event.target.value;
        task.steps = [];
        task.notes;
        tasks.push(task);


        // Append the created div with the main to-dolist div.
        //todoListDiv.appendChild(newTask);
        var completedDiv = getDivWithClass("added-task");
        var stepLength = "0";
         
        // After new div is created the previous div is modified. 
        completedDiv.innerHTML = 
            "<a><i class='material-icons tick-icon'>check_circle_outline</i></a>"
             +"<p class='task-name'>"+event.target.value+"</p>"+
             "<p class='step-count'>"+ 0 +" of " + stepLength + "</p>";
        taskContainer.appendChild(completedDiv);
        count = count + 1;
        var taskIcon = getElementsByClass("tick-icon");
        taskIcon[taskIcon.length - 1].addEventListener("click", finishTask.bind(task.id));
        var taskName = getElementsByClass("task-name");
        taskName[taskName.length - 1].addEventListener("click", 
                getInfo.bind(task));
        addTask[0].addEventListener("keyup", createNewTaskDiv );
        getElementById("add-new-task").value = "";
        getElementsByClass("tasks-count")[id - 1].innerHTML = getTasksLength();
        if (tasks.length > 4) {
            taskContainer.style.height = "400px";
            taskContainer.style.overflow = "auto";
        } else {
            taskContainer.style.height = "";
        }
    }

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
    getElementById("task-info-name").innerHTML = 
           "<p class='task-info-title'>"+lists[id].tasks[this].name+"</P>";
    if (lists[id].tasks[this].isComplete === true) {
        lists[id].tasks[this].isComplete = false;
        completeTask[this].style.textDecoration = "line-through";
        getElementsByClass("task-info-title")[0].style.textDecoration = "line-through";
        getElementsByClass("tick-icon")[this].innerHTML = "check_circle";
        getElementsByClass("tasks-count")[id - 1].innerHTML = getTasksLength();
    } else {
        lists[id].tasks[this].isComplete = true;
        completeTask[this].style.textDecoration = "none";
        getElementsByClass("task-info-title")[0].style.textDecoration = "none";
        getElementsByClass("tick-icon")[this].innerHTML = "check_circle_outline";
        getElementsByClass("tasks-count")[id - 1].innerHTML = getTasksLength();
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
        id = listCount;   
        currentlist.name = getListName(event.target.value); 
        currentlist.subName = event.target.value;
        currentlist.id = listCount;    
        lists.push(currentlist);
        var title = getTextInputWithClass("task-title-input");
        title.value = currentlist.name;
        var listTitle = getElementById("list-title");
        listTitle.innerHTML = "";
        listTitle.appendChild(title);
        getElementById("task-info-name").innerHTML =  currentlist.name;

        var newListDiv = getDivWithClass("created-lists");
        newListDiv.setAttribute("id", lists.length - 1);
        var length = "0";
        newListDiv.innerHTML = '<a href="#add-list"><img class="add-new-list" src="icon/list.png"></a>'+
                                '<p class="created-list">'+ currentlist.name +'</p>' +
                                '<p class="tasks-count">'+ length +'</p>';
        getElementById("new-lists").appendChild(newListDiv);
        console.log(currentlist.name);
        newListDiv.addEventListener("click", changeList.bind(currentlist));
        listCount = listCount + 1;
        getElementById("add-list").value = "";
        var existingDivIcon = getElementById('task-container').innerHTML = "";
        if (lists.length > 5) {
            getElementById("side-nav-bar").style.height = "600px";
            getElementById("side-nav-bar").style.overflow = "auto";
        }
        getElementsByClass("task-title-input")[0].addEventListener("keyup", changeListName);
    }
}

function changeListName(event) {
    console.log(event.target.value);
    if (event.keyCode === 13 && event.target.value != "") {
        lists[id].name = event.target.value;
        getElementsByClass("created-list")[id - 1].innerHTML = event.target.value;
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
    console.log(this.name);
    id = this.id;
    getElementsByClass("task-title-input")[0].value = this.name;
    var existingDiv = getElementsByClass('tick-icon');
    var existingDivIcon = getElementById('task-container').innerHTML = "";
    for(var task = 0; task < this.tasks.length; task = task + 1) {
        console.log(this.tasks[task].deleteStatus);
        if (this.tasks[task].deleteStatus !== true) {
            var taskContainer = getElementById("task-container");     
            var newDiv = getDivWithClass("added-task");	
            taskId = this.tasks[task].id;
            var stepLength = getStepsLength();

            // After new div is created the previous div is modified. 
            newDiv.innerHTML = 
                "<a><i class='material-icons tick-icon'>check_circle_outline</i></a>"
                +"<p class='task-name'>"+this.tasks[task].name+"</p>" +
                "<p class='step-count'>"+stepLength+ " of " + lists[id].tasks[taskId].steps.length+"</p>";
            taskContainer.appendChild(newDiv);
            var completeIcon = getElementsByClass("tick-icon");
            var taskDetails = getElementsByClass("task-name");
            taskDetails[task].addEventListener("click", getInfo.bind(this.tasks[task]));
            completeIcon[task].addEventListener("focus", showCompleteIcon);
            if (this.tasks[task].isComplete === false) {
                taskDetails[task].style.textDecoration = "line-through";
                getElementsByClass("tick-icon")[task].innerHTML = "check_circle";
            } 
            completeIcon[task].addEventListener("click", finishTask.bind(task));
            getElementById("add-new-task").value = "";
        }
    }
    if (this.tasks.length > 4) {
        taskContainer.style.height = "400px";
        taskContainer.style.overflow = "auto";
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
            "<p class='step'>"+event.target.value+"</p> <p class='delete-step'>x</p>";
        steps.style.height = "";
        steps.appendChild(newStep);
        var step = {};
        step.deleteStatus = false;
        step.name = event.target.value;
        step.id = lists[id].tasks[taskId].steps.length;
        step.isComplete = true;
        lists[id].tasks[taskId].steps.push(step);
        getElementsByClass("step-icon")[step.id].addEventListener("click", finishStep.bind(step));
        getElementById("add-step").value = "";
        if (lists[id].tasks[taskId].steps.length > 2) {
            getElementsByClass("task-info")[0].style.height = "600px";
            getElementsByClass("task-info")[0].style.overflow = "auto";
        }
        getElementsByClass("step-count")[taskId].innerHTML = 
                  getStepsLength() + " of " + lists[id].tasks[taskId].steps.length;
        var deleteStep = getElementsByClass("delete-step");
        deleteStep[deleteStep.length - 1].addEventListener("click", deleteSubTask.bind(step));
        newStep.addEventListener("mouseover", viewDeleteIcon.bind(deleteStep.length - 1));
        newStep.addEventListener("mouseout", hideDeleteIcon.bind(deleteStep.length - 1));
    }
}

function viewDeleteIcon() {
    getElementsByClass("delete-step")[this].style.display = "block";
}

function hideDeleteIcon() {
    getElementsByClass("delete-step")[this].style.display = "none";
}

function deleteSubTask() {
    this.isComplete = false;
    this.deleteStatus = true;
    getElementsByClass("step-count")[taskId].innerHTML = 
            getStepsLength() + " of " + lists[id].tasks[taskId].steps.length;
    var updateSteps = getInfo.bind(lists[id].tasks[taskId]);
    updateSteps();
}
/**
 * Return the length of sub tasks which is not completed of the current task.
 * 
 * @return {int} length - Length of sub tasks.
 */ 
function getStepsLength() {
    return lists[id].tasks[taskId].steps.filter(step => step.isComplete !== true).length;
}

/**
 * When the step is marked complete it is striked and the icon is changed.
 * When the step is unmarked the strike is removed and the icon is changed.
 */
function finishStep() {
    if (this.isComplete === true) {
        this.isComplete = false;
        getElementsByClass("step")[this.id].style.textDecoration = "line-through";
        getElementsByClass("step-icon")[this.id].innerHTML = "check_circle";
        getElementsByClass("step-count")[taskId].innerHTML =  
            getStepsLength() + " of " + lists[id].tasks[taskId].steps.length;
    } else {
        this.isComplete = true;
        getElementsByClass("step")[this.id].style.textDecoration = "none";
        getElementsByClass("step-icon")[this.id].innerHTML = "check_circle_outline"
        getElementsByClass("step-count")[taskId].innerHTML = 
            getStepsLength() + " of " + lists[id].tasks[taskId].steps.length;;
    }
}

var homeList = getElementsByClass("task-desc");
homeList[0].addEventListener("click", changeList.bind(lists[0]));

var notes = getElementsByClass("notes");
notes[0].addEventListener("blur", saveNotes);

function saveNotes(event) {
    lists[id].tasks[taskId].notes = event.target.textContent;
}

var deleteIcon = getElementById("delete");
deleteIcon.addEventListener("click", getConfirmation);

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
        console.log(lists[id]);
        lists[id].tasks[taskId].isComplete = false;
        lists[id].tasks[taskId].deleteStatus = true;
        var updateTasks = changeList.bind(lists[id]);
        updateTasks();
        minimizeInfo();
        getElementsByClass("tasks-count")[id - 1].innerHTML = getTasksLength();
    }
}