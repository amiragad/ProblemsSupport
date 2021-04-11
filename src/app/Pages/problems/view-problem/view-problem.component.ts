import { Component, Input, OnInit } from '@angular/core';
import { faCommentDots as farCommentDots, faThumbsUp as farThumbsUp, faThumbsDown as farThumbsDown } from '@fortawesome/free-regular-svg-icons';
import { faCommentDots as fasCommentDots,faThumbsUp as fasThumbsUp, faThumbsDown as fasThumbsDown} from '@fortawesome/free-solid-svg-icons';
import * as Cookies from 'js-cookie';
import { catchError, tap } from 'rxjs/operators';
import { Solution } from 'src/app/Interfaces/problem';
import { DateCalculationService } from 'src/app/Services/date-calculation.service';
import { ProblemService } from 'src/app/Services/problem.service';

@Component({
  selector: 'app-view-problem',
  templateUrl: './view-problem.component.html',
  styleUrls: ['./view-problem.component.css']
})
export class ViewProblemComponent implements OnInit {
  problemObject : any = {}; 
  problemDate : Date | undefined ; 
  problemExactDateObj: any = {} ;
  iconsObj: any = { 
    fasThumbsUp : farThumbsUp,
    farThumbsUp : fasThumbsUp,
    farCommentDots: farCommentDots,
    fasCommentDots : fasCommentDots,
    farThumbsDown: farThumbsDown,
    fasThumbsDown: fasThumbsDown,
  };
  pressedLike:boolean = false;
  pressedDislike:boolean = false;
  htmlContent: any;
  username: string | undefined;
  solutionLikedOBj = {
    solutionId:null as any,
    like:false,
    disLike:false
  }
  commentLikedOBj = {
    CommentId:null,
    Like:false,
    DisLike:false
  }

  constructor(
    public _problemService:ProblemService,
    public _dataCalcService: DateCalculationService,
  ) { }


  checkPressed(action:string, from:String , obj:Solution){
    debugger
    switch (action) {
      case 'Like':
        if (this.pressedDislike == true) {
          this.pressedDislike = false;
        }
        if (from === "Solution") {
          this.solutionLikedOBj={
            solutionId:obj.id,
            like:true,
            disLike:false
          }
        this._problemService.solutionLikes(this.solutionLikedOBj).pipe(
          tap((res: any) => console.log(res))
        );

        } 
        if(from === "Comment"){

        }
        break;
        case 'Dislike':
        if (this.pressedLike == true) {
          this.pressedLike = false;
        }
        break;
    
      default:
        break;
    }
  }

  ngOnInit(): void {
    debugger
    this._problemService.problemObj.subscribe(obj => this.problemObject = obj);
    this.problemDate = new Date(this.problemObject.date);
    this.problemExactDateObj = this._dataCalcService.calculateTime(this.problemDate);
    this.username = Cookies.get('ProgramerUser');
  }

}
