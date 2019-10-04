import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'task',
    templateUrl: './task.component.html',
    styleUrls: ['./task.component.scss']
})
export class Task implements OnInit {
    @Input() list;
    count:number = 0;
    currentTask;
    constructor(){ }   
    ngOnInit(){ }

    /**
    * Used to change the list name.
    * 
    * @param event The current event object.
    */
    updateList(event) {
        if(event.key === "Enter") {
            this.list.name = event.target.value;
        }
    }

    /**
    * When a new task is added the task object is added to the list array.
    * 
    * @param input The input DOM object.
    */
    addTask(input) {
        if (input.value !== "") {
            var task = {
                name:input.value,
                id:this.list.tasks.length,
                subTasks:[],
                getInfo: true
            };
            this.list.tasks.push(task);
            input.value = "";
        }
    }

    /**
    * When the task is clicked the currenttask object is modified to 
    * the clicked task object.
    * 
    * @param task Object of the clicked task.
    */
    changeTask(task) {
        task.getInfo = true; 
        this.currentTask = task;
    }

    /**
    * The clicked task object status is changed and the name is striked and undone
    * respectively.
    * 
    * @param task Object of the clicked task.
    */
    finishTask(task) {
        task.isComplete = task.isComplete ? false : true;
    }
}