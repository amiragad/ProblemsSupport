import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as Cookies from 'js-cookie';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SolutionsService {
  environmentUrl:string;
  solutionLikedOBj = {
    solutionId:null as any,
    like:false,
    disLike:false
  }
  commentLikedOBj = {
    commentId:null as any,
    like:false,
    disLike:false
  }
  token = Cookies.get('ProgramerToken');
  constructor(private http: HttpClient) {
    this.environmentUrl = environment.apiUrl;
   }

   solutionLikes(likesObj:any) : Observable<any>{
    debugger
    this.solutionLikedOBj = {
      solutionId : likesObj.id,
      like : likesObj.like,
      disLike : likesObj.disLike
    };
    let options = {
      headers: new HttpHeaders({'Authorization': `Bearer ${this.token}`}),
      params: new HttpParams()
      .set('solutionId',  this.solutionLikedOBj.solutionId)
      .set('like',  String(this.solutionLikedOBj.like) )
      .set('disLike', String(this.solutionLikedOBj.disLike))
    };
    return this.http.post(this.environmentUrl + 'Solutions/SolutionsLikes' , JSON.stringify(this.solutionLikedOBj), options);
  }
  commentLikes(likesObj:any) : Observable<any>{
    debugger
    this.commentLikedOBj = {
      commentId : likesObj.id,
      like : likesObj.like,
      disLike : likesObj.disLike
    };
    let options = {
      headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.token}`
            })
    };
    return this.http.post(this.environmentUrl + 'Comments/CommentsLikes' , JSON.stringify(this.commentLikedOBj), options);
  }
  addNewSolution(solutionObj:object):Observable<any>{
    let token = Cookies.get('ProgramerToken');
    let options = {
      headers: new HttpHeaders({
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json'
            })
    };
    return this.http.post(this.environmentUrl + 'Solutions/AddSolutions' , JSON.stringify(solutionObj), options);
  }

  addNewComment(commentObj:object):Observable<any>{
    let token = Cookies.get('ProgramerToken');
    let options = {
      headers: new HttpHeaders({
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json'
            })
    };
    return this.http.post(this.environmentUrl + 'Comments/AddComments' , JSON.stringify(commentObj), options);
  }

}
