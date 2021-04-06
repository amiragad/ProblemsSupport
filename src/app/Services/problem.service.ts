import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProblemService {

  private problemobject = new BehaviorSubject({});
  problemObj = this.problemobject.asObservable();
  
  constructor() { }

  updateProblemObject (probObject:object){
    
    this.problemobject.next(probObject)
  }
}
