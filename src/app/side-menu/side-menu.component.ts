import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss']
})
export class SideMenu implements OnInit {
    status: boolean = false;
    toggleMenu() {
        this.status = !this.status;  
    }

    listCount: number = 0;
    lists: Object[] = [];
    addList(event) {
        if(event.key === "Enter") {
            var list = { 
                name:event.target.value, 
                isComplete:false,
                id:this.listCount,
                tasks:[]
            }; 
            this.lists[this.listCount] = list;
            this.listCount++;
        }
    }

    currentList;
    changeList(list) {
        this.currentList = list;
        console.log(this.currentList.name);
    }
}
