import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss']
})
export class SideMenu implements OnInit {
    constructor(){
    }   
    ngOnInit(){
    }
    
    status: boolean = false;

    /**
     * When the menu button is clicked the status is changed according to this status
     * the menu bar is hidden and show.
     */
    toggleMenu() {
        this.status = !this.status;  
    }

    lists: Object[] = [];
    currentList;

    /**
     * When a new list is created it is added to the global list array.
     * @param event Object of the current occuring event.
     */
    addList(input) {
        var list = { 
            name:input.value, 
            isComplete:false,
            id:this.lists.length,
            tasks:[]
        }; 
        this.lists.push(list);
        this.currentList = list;
        input.value = "";
    }

    /**
     * When the list is clicked the clicked list is assigned to 
     * currentList object to bind it with task component
     * @param list Current list object.
     */
    changeList(list) {
        this.currentList = list;
        console.log(this.currentList.tasks);
    }
}
