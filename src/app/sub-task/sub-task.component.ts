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
   * @param event Object of the current event.
   */
  addSubTask(input) {
      var step = {
        name: input.value,
        isComplete: false
      };
       this.task.subTasks.push(step);
       input.value = "";
  }
  
  /**
   * The name of the task is updated.
   * @param event Object of the current event.
   */
  updateTask(event) {
      if (event.key === "Enter") {
          this.task.name = event.target.value;
      }
  }

  /**
   * The complete status of the sub task is changed.
   * @param subTask Object of the current subTask.
   */
  finishSubTask(subTask) {
    subTask.isComplete = subTask.isComplete ? false : true;
  }

  changeDeleteStatus() {
     this.status = !this.status;
     console.log(this.status);
  }

  deleteTask() {
      this.list.tasks.splice(this.task.id, 1);
      this.status = !this.status;
  }
}
