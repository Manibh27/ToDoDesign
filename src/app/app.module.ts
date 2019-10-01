import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Header } from './header/header.component';
import { SideMenu } from './side-menu/side-menu.component';
import { Task } from './task-component/task.component';
import { SubTaskComponent } from './sub-task/sub-task.component';

@NgModule({
  declarations: [
    AppComponent,
    Header,
    SideMenu,
    Task,
    SubTaskComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
