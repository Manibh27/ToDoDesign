import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-sub-task',
  templateUrl: './sub-task.component.html',
  styleUrls: ['./sub-task.component.scss']
})
export class SubTaskComponent implements OnInit {
    @Input() task;
    @Input() list;

    constructor() { }

    ngOnInit() {
    }

    status: boolean = true;

    /**
    * When a new sub task is added the sub task object object is added to the 
    * sub task array of the current task object.
    * 
    * @param input The input DOM object.
    */
    addSubTask(input) {
        if (input.value !== "") {  
            var step = {
                name: input.value, 
                id:this.task.subTasks.length,
                isComplete: false
            };
            this.task.subTasks.push(step);
            input.value = "";
        }
    }
  
   /**
    * The name of the task is updated.
    * 
    * @param event Object of the current event.
    */
    updateTask(event) {
        if (event.key === "Enter") {
            this.task.name = event.target.value;
        }
    }

    /**
     * The complete status of the sub task is changed.
     * 
     * @param subTask Object of the current subTask.
     */
    finishSubTask(subTask) {
        subTask.isComplete = subTask.isComplete ? false : true;
    }

    /**
     * When the delete icon is clicked the popup is shown.
    */
    changeDeleteStatus() {
        this.status = !this.status;
    }

    /**
    * Current task object is removed from the list.
    */
    deleteTask() {
        this.list.tasks.splice(this.list.tasks.indexOf(this.task), 1);
        this.task.getInfo = false;
        this.status = !this.status;
    }

    /**
    * Current task object is removed from the list.
    * 
    * @param subTask Object of the current subTask to be removed.
    */
    deleteSubTask(subTask) {
       this.task.subTasks.splice(this.task.subTasks.indexOf(subTask), 1);
    }

    /**
     * Hides the right side task info bar.
     */
    hideInfo() {
        this.task.getInfo = false;
    }
}
