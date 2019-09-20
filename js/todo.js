function getElementById(id) {
    return document.getElementById(id);
}

function getElementsByClass(className) {
    return document.getElementsByClassName(className);
}

function getDivWithClass(className) {
    var newTask = document.createElement("DIV");
    newTask.setAttribute("class", className);     
    return newTask;
}

function getTextInputWithClass(className) {
    var input = document.createElement("input");
    input.setAttribute('type', 'text');
    input.setAttribute("class", className); 
    return input;
}

function getNewDiv() {
    return document.createElement("DIV");
}

function getElementValueById(id) {
    return document.getElementById(id).value;
}

function setElementValueById(id, value) {
    document.getElementById(id).value = value;
}

var menuBtn = getElementById("icon");
menuBtn.addEventListener("click", openMenu);

var newList = getElementById("new-list");
newList.addEventListener("click", openMenu);

var minimize = getElementById("minimize");
minimize.addEventListener("click", minimizeInfo);

var info = getElementById("info");
info.addEventListener("click", getInfo);

function openMenu() {
    var iconValue = getElementValueById("icon");
    var sideBar = getElementById("side-nav-bar");
    if (iconValue == "close") {
        sideBar.style.display= "block";
        setElementValueById("icon", "open");
    }
    if (iconValue == "open") {
        sideBar.style.display= "none";
        setElementValueById("icon", "close");
    }
}

function minimizeInfo() {
   var taskInfo = getElementsByClass("task-info");
   taskInfo[0].style.display="none";
   var sideBar = getElementById("side-nav-bar");
   sideBar.style.width="23.8%";
}

function getInfo() {
   var taskInfo = getElementsByClass("task-info");
   var sideBar = getElementById("side-nav-bar");
   sideBar.style.width="32.8%";
   taskInfo[0].style.display="block";
}

var addTask = getElementsByClass("add-task-input");
console.log(addTask.length - 1);
addTask[addTask.length - 1].addEventListener("keyup", function createNewTaskDiv(e) {
    if (e.keyCode === 13) {
        console.log(addTask.length - 1);
        var newTask = getDivWithClass("add-new-task");
        addTask[addTask.length - 1].setAttribute("id", "");
        var textInput = getTextInputWithClass("add-task-input");
        textInput.setAttribute("id", "add-new-task");
        newTask.innerHTML =
            '<a href="#add-new-task"><i class="material-icons new-task-icon">add</i></a>';
        newTask.appendChild(textInput);
        var todoListDiv = getElementById("todo-list");
        todoListDiv.appendChild(newTask);
        addTask = getElementsByClass("add-task-input");
    }
});
