import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DateCalculationService {
 
  currentDate: Date = new Date();

  constructor() { }

  calculateTime(datePast:Date){ 
    let dateDiff = this.currentDate.getTime() - datePast.getTime();
    let days = Math.floor(dateDiff / (60 * 60 * 24 * 1000));
    let hours = Math.floor(dateDiff / (60 * 60 * 1000)) - (days * 24);
    let minutes = Math.floor(dateDiff / (60 * 1000)) - ((days * 24 * 60) + (hours * 60));
    let seconds = Math.floor(dateDiff / 1000) - ((days * 24 * 60 * 60) + (hours * 60 * 60) + (minutes * 60));
    return { days: days, hours: hours, minutes: minutes, second: seconds };

  }
}
