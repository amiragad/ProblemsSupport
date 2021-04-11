import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as Cookies from 'js-cookie';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ProblemList } from '../Interfaces/problem';

@Injectable({
  providedIn: 'root'
})
export class ProblemService {

  private problemobject = new BehaviorSubject({});
  problemObj = this.problemobject.asObservable();
  environmentUrl:string;
  
  constructor(private http: HttpClient) {
    this.environmentUrl = environment.apiUrl;
   }

  updateProblemObject (probObject:object){
    
    this.problemobject.next(probObject)
  }


  getAllProblems (): Observable<ProblemList>{
    let token = Cookies.get('ProgramerToken');
    let options = {
      headers: new HttpHeaders({
              Authorization: `Bearer ${token}`
            })
    };
    return this.http.get<ProblemList>(this.environmentUrl + 'Problems/GetListProblem', options)
  }

  solutionLikes(likesObj:object){
    debugger
    return this.http.post(this.environmentUrl + 'Solutions/SolutionsLikes' , JSON.stringify(likesObj),{ headers: { 'Content-Type': 'application/json' } });
    // return this.http.post<any>(this.environmentUrl + 'Request/TotalsDashBoardDtailsForTrial', search, options);
  }
}
