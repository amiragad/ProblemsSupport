import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as Cookies from 'js-cookie';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ProblemList, ProblemPagination } from '../Interfaces/problem';

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


  getAllProblems (requestObj:any): Observable<ProblemList>{
    let token = Cookies.get('ProgramerToken');
    let options = {
      headers: new HttpHeaders({
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json'
            })
    };
    return this.http.post<ProblemList>(this.environmentUrl + 'Problems/GetListProblem', JSON.stringify(requestObj), options)
  }

  

  addNewProblem(problemObj:object):Observable<any>{
    let token = Cookies.get('ProgramerToken');
    let options = {
      headers: new HttpHeaders({
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json'
            })
    };
    return this.http.post(this.environmentUrl + 'Problems/AddProblem' , JSON.stringify(problemObj), options);
  }
}
