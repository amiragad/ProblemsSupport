import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { faCommentDots as farCommentDots, faThumbsUp as farThumbsUp, faThumbsDown as farThumbsDown } from '@fortawesome/free-regular-svg-icons';
import { faCommentDots as fasCommentDots, faThumbsUp as fasThumbsUp, faThumbsDown as fasThumbsDown } from '@fortawesome/free-solid-svg-icons';
import * as Cookies from 'js-cookie';
import { catchError, tap } from 'rxjs/operators';
import { Solution } from 'src/app/Interfaces/problem';
import { DateCalculationService } from 'src/app/Services/date-calculation.service';
import { ProblemService } from 'src/app/Services/problem.service';
import { SolutionsService } from 'src/app/Services/solutions.service';
import Swal from 'sweetalert2';
import { AddSolutionComponent } from '../add-solution/add-solution.component';

@Component({
  selector: 'app-view-problem',
  templateUrl: './view-problem.component.html',
  styleUrls: ['./view-problem.component.css']
})
export class ViewProblemComponent implements OnInit {
  problemObject: any = {};
  problemDate: Date | undefined;
  problemExactDateObj: any = {};
  iconsObj: any = {
    fasThumbsUp: farThumbsUp,
    farThumbsUp: fasThumbsUp,
    farCommentDots: farCommentDots,
    fasCommentDots: fasCommentDots,
    farThumbsDown: farThumbsDown,
    fasThumbsDown: fasThumbsDown,
  };
  commentForm = this.formBuilder.group({
    commentContent: ['', Validators.required]
  });
  pressedLike: boolean = false;
  pressedDislike: boolean = false;
  htmlContent: any;
  username: string | undefined;
  LikedOBj = {
    id: null as any,
    like: false,
    disLike: false
  }
  showCounts: boolean = false;
  commentObject:object = {
    "solution_Id": null as any,
    "content": ""
  }


  constructor(
    public _problemService: ProblemService,
    public _dataCalcService: DateCalculationService,
    public _SolutionService: SolutionsService,
    public dialog: MatDialog,
    private formBuilder: FormBuilder,
  ) { }


  checkPressed(action: string, from: String, obj: Solution) {
    debugger
    switch (action) {
      case 'Like':
        if (obj.isLike == true) {
          obj.isLike = false;
          obj.isDisLike = true;
        }
        else {
          if (obj.isDisLike == true) {
            obj.isDisLike = false;
            obj.isLike = true;
          }
          else { obj.isLike = true; }
        }
        this.LikedOBj = {
          id: obj.id,
          like: obj.isLike,
          disLike: obj.isDisLike
        }
        if (from === "Solution") {
          this._SolutionService.solutionLikes(this.LikedOBj).subscribe(res => {
            if (res.success) {
              this.showCounts = true;
            }
          },
            err => {
              console.error(err);
            })
        }
        if (from === "Comment") {
          this._SolutionService.commentLikes(this.LikedOBj).subscribe(res => {
            debugger
            if (res.success) {
              this.showCounts = true;
            }
          },
            err => {
              console.error(err);
            })
        }
        break;
      case 'Dislike':
        if (obj.isDisLike == true) {
          obj.isDisLike = false;
        } else {
          if (obj.isLike == true) {
            obj.isLike = false;
            obj.isDisLike = true;
          }
          else { obj.isDisLike = true; }
        }
        this.LikedOBj = {
          id: obj.id,
          like: obj.isLike,
          disLike: obj.isDisLike
        }
        if (from === "Solution") {
          this._SolutionService.solutionLikes(this.LikedOBj).subscribe(res => {
            if (res.success) {
              this.showCounts = true;
            }
          },
            err => {
              console.error(err);
            })

        }
        if (from === "Comment") {
          this._SolutionService.commentLikes(this.LikedOBj).subscribe(res => {
            if (res.success) {
              this.showCounts = true;
            }
          },
            err => {
              console.error(err);
            })
        }
        break;
      default:
        break;
    }
  }

  addsolution() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.maxWidth = '60%';
    const dialogRef = this.dialog.open(AddSolutionComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  onsubmitComment(formData:any){
    debugger
    // formData.solutionDescription = formData.solutionDescription.replace(/<\/?[^>]+(>|$)/g, "");
    //formData.solutionDescription = formData.solutionDescription.replace(/\s/g, '');
    this.commentObject = {
      "solution_Id": this.problemObject.id,
      "content": formData.commentContent
    }
   this._SolutionService.addNewSolution(this.commentObject).subscribe(res => {
    if (res.success) {
      console.log("res->", res)
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Comment added successfully',
          showConfirmButton: false,
          timer: 1500
        })
        this.ngOnInit();
        setTimeout(() => {
          window.location.reload();
        }, 1500);
        
    }
    else {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Failed to add comment',
        showConfirmButton: false,
        timer: 1500
      })
    }
  }, err => {
    console.error(err)
  })
  }
  
  ngOnInit(): void {
    debugger
    this._problemService.problemObj.subscribe(obj => this.problemObject = obj);
    for (let index = 0; index < this.problemObject.solutions.length; index++) {
      this.problemObject.solutions[index].content = this.problemObject.solutions[index].content.replace(/<\/?[^>]+(>|$)/g, "");
    }
    this.problemDate = new Date(this.problemObject.date);
    this.problemExactDateObj = this._dataCalcService.calculateTime(this.problemDate);
    this.username = Cookies.get('ProgramerUser');
  }

}
