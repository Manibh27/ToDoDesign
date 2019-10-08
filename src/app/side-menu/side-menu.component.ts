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
        this.currentList = this.defaultList;
    }
    
    status: boolean = false; 
    currentList;

    /**
     * When the menu button is clicked the status is changed according to this status
     * the menu bar is hidden and show.
     */
    toggleMenu() {
        this.status = !this.status;  
        this.currentList.alignSubTask = !this.currentList.alignSubTask;
    }

    lists: Object[] = [];

    defaultList = {
        name: "Tasks",
        id:0,
        tasks:[]
    }

    /**
     * When a new list is created it is added to the global list array.
     * 
     * @param input The input DOM object.
     */
    addList(input) {
        if (input.value !== "") {
            var validName = this.checkName(input.value);
            var list = { 
                name:validName, 
                subName:input.value,
                isComplete:false,
                taskCount:0,
                alignSubTask: false,
                id:this.lists.length,
                tasks:[]
            }; 
            this.lists.push(list);
            this.currentList = list;
            input.value = "";
        }
    }

    /**
     * If the entered name is already present then the count of 
     * the list name repeated is appended with the name.
     * 
     * @param name Checked with the previuos list names.
     */
    checkName(name): String {
        var repeatedCount = this.lists.filter(list => (list as any).subName === name).length;
        if (name === "Tasks") {
            repeatedCount++;
        }
        if (repeatedCount === 0) {
            return name; 
        } else {
            return name+"("+repeatedCount+")";
        }
    }

    /**
     * When the list is clicked the clicked list is assigned to 
     * currentList object to bind it with task component
     * 
     * @param list Current list object.
     */
    changeList(list) {
        this.currentList = list;
    }
}
