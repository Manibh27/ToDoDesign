
// Global variables.
var lists = [];
var tasks = [];
var id = 0;
var taskId = 0;
var listCount = 1;
var count = 0;
var zero = 0;
var defaultList = {};
defaultList.name = "Tasks";
defaultList.id = 0;
defaultList.tasks= [];
lists.push(defaultList);

init();

/**
 * Initialize the global event listeners.
 */
function init() {

    // Function to open and minimize side menu.
    $("#icon").click(openMenu);

    // Add event to add new list while pressed enter.
    $(".new-list").keyup(addList);

    //  event to add new tasks while pressed enter.
    $("#add-new-task").keyup(createNewTaskDiv);

    // To minize the right side information bar.
    $("#minimize").click(minimizeInfo);
}

/**
 *  When the menu bar is closed it is opened and vice versa.
 */
function openMenu() {
    $("#side-nav-bar").toggleClass("side-bar-width");
    $(".icon-desc").toggleClass("display");
    $(".task-desc").toggleClass("display");
    $(".new-list-input").toggleClass("display");
    $(".new-lists").toggleClass("display");
}

/**
 * Minimize the right side bar by making style display none.
 */
function minimizeInfo() {
    $(".task-info").eq(zero).hide();
 }
 
 
/**
 * Checks whether the entered key is enter, if it is enter create a new
 * div and append it with todo-list div and modify the last div.
 */
function createNewTaskDiv(event) {
    if (event.keyCode === 13 && event.target.value !== "") {   
        tasks = lists[id].tasks;
        var task = getNewTask(tasks.length, event.target.value);
        $("#task-container").append("<div class='added-task'>"
                + "<a><i class='material-icons tick-icon'>check_circle_outline</i></a>"
                + "<p class='task-name'>" + task.name + "</p></div>");
        $(".task-name").eq(count).click(getInfo.bind(task));
        count = count + 1;
        $("#add-new-task").val("");
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


function addList(event) {
    if (event.keyCode === 13 && event.target.value !== "") { 
        var list = createNewList(event.target.value);
        console.log(list.name);
        $("#list-title").html("");
        $("#list-title").append("<input type='text' class='task-title-input'/>");
        $(".task-title-input").keyup(changeListName);
        $(".task-title-input").val(list.name);
        $("#new-lists").append("<div class='created-lists'></div>");
        $(".created-lists").eq(lists.length - 2).html('<a href="#add-list"><img class="add-new-list" src="icon/list.png"></a>'+
                '<p class="created-list">'+ list.name +'</p>');
        listCount = listCount + 1;
        $(".created-list").eq(lists.length - 2).click(changeList.bind(list));
        $("#add-list").val("");
        $("#task-container").html("");
    }
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
    list.name = listName;
    list.id = listCount;    
    lists.push(list);
    return list;
}

/**
 * When the list is clicked the array of task within the list is iterated and 
 * printed in the screen. The tasks of the previous list is removed.
 */
function changeList(event) {
    console.log("id " + this.id);
    id = this.id;
    $(".task-title-input").val(event.target.innerHTML);
    $("#task-container").html("");
    for(var task = 0; task < this.tasks.length; task = task + 1) {
        if (this.tasks[task].deleteStatus !== true) {
            console.log(this.tasks[task].name);
            $("#task-container").append("<div class='added-task'>"
                    + "<a><i class='material-icons tick-icon'>check_circle_outline</i></a>"
                    + "<p class='task-name'>" + this.tasks[task].name + "</p></div>");
            console.log(this.tasks[task].name);
            $("#add-new-task").val("");
        } 
    }
}

/**
 * When the list name is updated and pressed enter the list name is changed.
 * 
 * @param {} event -  Used to find whether the pressed key is enter.
 */
function changeListName(event) {
    console.log(id);
    if (event.keyCode === 13 && event.target.value != "") {
        lists[id].name = event.target.value;
        $(".created-list").eq(id - 1).html(event.target.value);
    }
}

/**
 * Open the task information bar. Removes the previous steps.
 * And prints the steps added for the particular task.
 */
function getInfo() {
    console.log("info " + this.id);
    taskId = this.id;
    $(".task-info").eq(zero).show();
    $("#task-info-name").html("");
    $("#task-info-name").append("<input type='text' class='task-info-input'/>");
    $(".task-info-input").eq(zero).val(this.name);
    $(".task-info-input").eq(zero).keyup(changeTaskName);
    $("#steps").html("");
}



/**
 * Updates the task name when the task name is changed and press enter.
 * @param {*} event - Used to find whether the pressed key is enter.
 */
function changeTaskName(event) {
    if (event.keyCode === 13 && event.target.value !== "") {
        lists[id].tasks[taskId].name = event.target.value;
        $(".task-name").eq(taskId).html(event.target.value);
    }
}
