import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class DataServiceService {

  constructor() { } 

  private messageSource = new BehaviorSubject('default message');
  currentList = this.messageSource.asObservable();

  changeMessage(list) {
    this.messageSource.next(list);
  }

}
