import { Component, OnInit, Input } from '@angular/core';
import { DataService } from '../data.service';

@Component({
    selector: 'task',
    templateUrl: './task.component.html',
    styleUrls: ['./task.component.scss']
})
export class Task implements OnInit {
    @Input() list;
    @Input() impList;
    @Input() defaultList;
    @Input() taskCount: number;
    alignTaskBar: boolean = false;
    count:number = 0;
    currentTask;
    constructor(private dataService: DataService){}
 
    ngOnInit(){ 
    }

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
                subTaskLength: 0,
                getInfo: true, 
                isComplete: false,
                isImportant: false,
                isMyDay: false
            };
            if (this.list.name === "Important") {
                task.isImportant = true;
                this.defaultList.tasks.push(task);
                this.defaultList.taskCount = this.getTasksCount(this.defaultList)
                this.impList.tasks.push(task);
            } else {
                this.list.tasks.push(task);
            }
            input.value = "";
            this.list.taskCount = this.getTasksCount(this.list); 
        }
        this.alignTaskBar = this.list.alignSubTask;
    }

    /**
     * Return the number of incomplete task count.
     * 
     * @param list Length of the current list object is returned.
     */
    getTasksCount(list): number {
        return list.tasks.filter(task => task.isComplete !== true).length;
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
        this.list.taskCount = this.getTasksCount(this.list);
    }

   /**
    * The clicked task object  is marked as important and removed alternatively.
    * 
    * @param task Object of the clicked task.
    */
    markTaskImportant(task) {
        task.isImportant = !task.isImportant;
        if(task.isImportant) {
            this.impList.tasks.push(task);
        } else {
            this.impList.tasks.splice(this.impList.tasks.indexOf(task), 1);
        }
    }
}