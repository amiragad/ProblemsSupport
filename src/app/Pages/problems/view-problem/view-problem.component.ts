import { Component, Input, OnInit } from '@angular/core';
import { faCommentDots as farCommentDots, faThumbsUp as farThumbsUp, faThumbsDown as farThumbsDown } from '@fortawesome/free-regular-svg-icons';
import { faCommentDots as fasCommentDots,faThumbsUp as fasThumbsUp, faThumbsDown as fasThumbsDown} from '@fortawesome/free-solid-svg-icons';
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

  constructor(public _problemService:ProblemService, public _dataCalcService: DateCalculationService) { }


  checkPressed(action:string){
    switch (action) {
      case 'Like':
        if (this.pressedDislike == true) {
          this.pressedDislike = false;
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
    this._problemService.problemObj.subscribe(obj => this.problemObject = obj);
    
    this.problemDate = new Date(this.problemObject.date);
    this.problemExactDateObj = this._dataCalcService.calculateTime(this.problemDate);
  }

}
