
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

    // event to add new tasks while pressed enter.
    $("#add-new-task").keyup(createNewTaskDiv);

    // To minize the right side information bar.
    $("#minimize").click(minimizeInfo);

    // Adding event listner to add steps.
    $("#add-step").keyup(addStep);
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
        var newTask = $(".added-task");
        console.log(newTask.length - 1);
        $(".task-name").eq(newTask.length - 1).click(getInfo.bind(task));
        $(".tick-icon").eq(newTask.length - 1).click(finishTask.bind(task));
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
    id = this.id;
    $(".task-title-input").val(event.target.innerHTML);
    $("#task-container").html("");
    for(var task = 0; task < this.tasks.length; task = task + 1) {
        if (this.tasks[task].deleteStatus !== true) {
            $("#task-container").append("<div class='added-task'>"
                    + "<a><i class='material-icons tick-icon'>check_circle_outline</i></a>"
                    + "<p class='task-name'>" + this.tasks[task].name + "</p></div>");
            var newTask = $(".added-task");
            $(".task-name").eq(newTask.length - 1).click(getInfo.bind(this.tasks[task]));
            $("#add-new-task").val("");
            if (this.tasks[task].isComplete === false) {
                $(".task-name").eq(task).addClass("strike-text");
                $(".tick-icon").eq(task).html("check_circle");
            } 
            $(".tick-icon").eq(task).click(finishTask.bind(this.tasks[task]));

        } 
    }
}

/**
 * When the list name is updated and pressed enter the list name is changed.
 * 
 * @param {} event -  Used to find whether the pressed key is enter.
 */
function changeListName(event) {
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
    taskId = this.id;
    $(".task-info").eq(zero).show();
    $("#task-info-name").html("");
    $("#task-info-name").append("<input type='text' class='task-info-input'/>");
    $(".task-info-input").eq(zero).val(this.name);
    $(".task-info-input").eq(zero).keyup(changeTaskName);
    $("#steps").html("");
    var stepInfos = lists[id].tasks[this.id].steps;
    for (var step = 0 ; step < stepInfos.length; step = step + 1) {
        if (stepInfos[step].deleteStatus !== true) {
            $("#steps").append("<div class='created-steps'><a class='step-icon-link'>"
                + "<i class='material-icons step-icon'>check_circle_outline</i></a>"
                + "<p class='step'>" + stepInfos[step].name + "</p></div>");
            if (stepInfos[step].isComplete !== true) {
                $(".step").eq(step).addClass("strike-text");
                $(".step-icon").eq(step).html("check_circle");
            }
            $(".step-icon").eq(step).click(finishStep.bind(stepInfos[step]));
        }
        $("#add-step").val("");
   }
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

/**
 * When a any input is eneterd in add step input it checks for enter.
 * If enter is pressed then a new div is created and the value is appended
 * with steps div.
 */
function addStep(event) {
    if (event.keyCode === 13 && event.target.value !== "") {
        var step = createStep(event.target.value);
        $("#steps").append("<div class='created-steps'> <a class='step-icon-link'>"
                + "<i class='material-icons step-icon'>check_circle_outline</i></a>"
                + "<p class='step'>" + event.target.value + "</p></div>");
        console.log(step.id);
        $(".step-icon").eq(step.id).click(finishStep.bind(step));
        $("#add-step").val("");
    }
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
 * when the finish task icon is clicked the task icon is changed and stiked out.
 */
function finishTask() {
    if (this.isComplete === true) {
        this.isComplete = false;
        console.log(this.isComplete);
        changeTaskCompleteStatus(this.id, "strike-none", "strike-text", "check_circle");
    } else {
        this.isComplete = true;
        console.log(this.isComplete);
        changeTaskCompleteStatus(this.id, "strike-text", "strike-none", "check_circle_outline");
    }
}

/**
 * Change the status of the task if it is marked completed the name is striked.
 * If not then the strike is removed. Then the icon is changed accordingly.
 * 
 * @param {int} currentTaskId - Id  of task to be striked.
 * @param {String} iconStyle - Icon name according to the text style.
 */
function changeTaskCompleteStatus(currentTaskId, removeStyle,  textStyle,  iconStyle) {
    console.log(currentTaskId);
    $(".task-name").eq(currentTaskId).removeClass(removeStyle);
    $(".task-name").eq(currentTaskId).addClass(textStyle);
    $(".tick-icon").eq(currentTaskId).html(iconStyle);
}

/**
 * When the step is marked complete it is striked and the icon is changed.
 * When the step is unmarked the strike is removed and the icon is changed.
 */
function finishStep() {
    if (this.isComplete === true) {
        this.isComplete = false;
        changeStepCompleteStatus(this.id, "strike-text", "check_circle");
    } else {
        this.isComplete = true;
        changeStepCompleteStatus(this.id, "strike-none", "check_circle_outline");
    }
}

/**
 * When the step is marked complete it is striked and the icon is changed.
 * When the step is unmarked the strike is removed and the icon is changed.
 */
function finishStep() {
    if (this.isComplete === true) {
        this.isComplete = false;
        console.log(this.isComplete);
        changeStepCompleteStatus(this.id, "strike-none", "strike-text", "check_circle");
    } else {
        this.isComplete = true;
        console.log(this.isComplete);
        changeStepCompleteStatus(this.id, "strike-text", "strike-none", "check_circle_outline");
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
function changeStepCompleteStatus(stepId, removeStyle, textStyle, iconName) {
    console.log(stepId);
    $(".step").eq(stepId).removeClass(removeStyle);
    $(".step").eq(stepId).addClass(textStyle);
    $(".step-icon").eq(stepId).html(iconName);
}
