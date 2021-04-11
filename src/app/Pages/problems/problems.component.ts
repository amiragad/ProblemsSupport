import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { Problem } from 'src/app/Interfaces/problem';
import { ProblemService } from 'src/app/Services/problem.service';
import { AddProblemComponent } from './add-problem/add-problem.component';
interface Category {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-problems',
  templateUrl: './problems.component.html',
  styleUrls: ['./problems.component.css']
})
export class ProblemsComponent implements OnInit {
  selectedValue: string | undefined;
  myControl = new FormControl();
  problemObj:object={};
  problemList: Problem[] | undefined;
  
  constructor(
    public _router:Router, 
    public _problemService:ProblemService,
    public dialog: MatDialog,
   ) { }
  
  
  categories: Category[] = [
    {value: 'category-0', viewValue: 'category1'},
    {value: 'category-1', viewValue: 'category2'},
    {value: 'category-2', viewValue: 'category3'}
  ];

  // problems: any[] =[
  //   {
  //     title: 'Fix Backgorund Color4',
  //     desc:'Lorem Ipsum is simply dummy text of the printing and typesetting industryLorem Ipsum has been the industry Lorem Ipsum is simply dummy text of the printing and typesetting industryLorem Ipsum has been the industry Lorem Ipsum is simply dummy text of the printing and typesetting industryLorem Ipsum has been the industry',
  //     solved:true,
  //     date: '2021-04-01 10:12:12'
  //   },
  //   {
  //     title: 'Fix Backgorund Color5',
  //     desc:'Lorem Ipsum is simply dummy text of the printing and typesetting industryLorem Ipsum has been the industry.....',
  //     solved:false,
  //     date: '2017-04-13 10:12:12'
  //   },
  //   {
  //     title: 'Fix Backgorund Color6',
  //     desc:'Lorem Ipsum is simply dummy text of the printing and typesetting industryLorem Ipsum has been the industry.....',
  //     solved:true,
  //     date: '2017-04-13 10:12:12'
  //   },
  //   {
  //     title: 'Fix Backgorund Color2',
  //     desc:'Lorem Ipsum is simply dummy text of the printing and typesetting industryLorem Ipsum has been the industry.....',
  //     solved:false,
  //     date: '2017-04-13 10:12:12'
  //   },
  //   {
  //     title: 'Fix Backgorund Color3',
  //     desc:'Lorem Ipsum is simply dummy text of the printing and typesetting industryLorem Ipsum has been the industry.....',
  //     solved:false,
  //     date: '2017-04-13 10:12:12'
  //   },
  //   {
  //     title: 'Fix Backgorund Color4',
  //     desc:'Lorem Ipsum is simply dummy text of the printing and typesetting industryLorem Ipsum has been the industry.....',
  //     solved:true,
  //     date: '2017-04-13 10:12:12'
  //   },
  //   {
  //     title: 'Fix Backgorund Color2',
  //     desc:'Lorem Ipsum is simply dummy text of the printing and typesetting industryLorem Ipsum has been the industry.....',
  //     solved:false,
  //     date: '2017-04-13 10:12:12'
  //   },
  //   {
  //     title: 'Fix Backgorund Color3',
  //     desc:'Lorem Ipsum is simply dummy text of the printing and typesetting industryLorem Ipsum has been the industry.....',
  //     solved:false,
  //     date: '2017-04-13 10:12:12'
  //   },
  //   {
  //     title: 'Fix Backgorund Color4',
  //     desc:'Lorem Ipsum is simply dummy text of the printing and typesetting industryLorem Ipsum has been the industry.....',
  //     solved:true,
  //     date: '2017-04-13 10:12:12'
  //   }
  // ];

  addProblemDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.maxWidth = '60%';
    const dialogRef = this.dialog.open(AddProblemComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  ShowProblemDtails(problemObject:object){
    debugger
    this._problemService.updateProblemObject(problemObject);
    this._router.navigate(['problems/view-problem']);
  }

  getAllProblems(){
    this._problemService.getAllProblems().subscribe(res => {
      debugger
     this.problemList = res.data;
     for (let index = 0; index < this.problemList.length; index++) {
       if (this.problemList[index].solutions === undefined || this.problemList[index].solutions.length == 0) {
        this.problemList[index].solved = false;
       } else {
        this.problemList[index].solved = true;
       }
       console.log("this.problemList: ", this.problemList);
     }
    }, err => {
      console.error(err)
    })
  }
  
  ngOnInit() {
    debugger
    this.getAllProblems();
  }
}
