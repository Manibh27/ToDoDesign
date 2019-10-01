import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class Task implements OnInit {
  constructor(){

  }   
  ngOnInit(){

  }
  
  list;

   addtask() {
     console.log(list);
   }
}
