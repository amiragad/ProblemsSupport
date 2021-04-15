import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { Category } from 'src/app/Interfaces/categories';
import { Problem, ProblemPagination } from 'src/app/Interfaces/problem';
import { CategoriesService } from 'src/app/Services/categories.service';
import { ProblemService } from 'src/app/Services/problem.service';
import { AddProblemComponent } from './add-problem/add-problem.component';


@Component({
  selector: 'app-problems',
  templateUrl: './problems.component.html',
  styleUrls: ['./problems.component.css']
})
export class ProblemsComponent implements OnInit {
  selectedcategory: string | undefined;
  myControl = new FormControl();
  problemObj:object={};
  problemList: Problem[] | undefined;
  categoriesList: Category[]| undefined;
  faPen = faPen;
  showEdit:boolean = false;
  pageNumber:Number = 1;
  pageSize:Number = 6;
  itemsCount: Number | undefined;
  requestObject:any;
  paginationData: ProblemPagination | undefined;
  constructor(
    public _router:Router, 
    public _problemService:ProblemService,
    public dialog: MatDialog,
    public _categoriesService: CategoriesService
   ) { }
  

  openProblemDialog(action:string, problemObject?:Problem) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.maxWidth = '60%';
    switch (action) {
      case 'Add':
        dialogConfig.data = {problemAction : action};
       
        break;

      case 'Edit':
        dialogConfig.data = {
          problemAction : action,
          problemObj : problemObject
        };
       break;   
    
      default:
        break;
    }
    const dialogRef = this.dialog.open(AddProblemComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  ShowProblemDtails(problemObject:Problem){
    debugger
    this._problemService.updateProblemObject(problemObject);
    this._router.navigate(['problems/view-problem']);
  }
  onPageChange(pageNum: any){
    debugger
    // let pageNum = event - 1;
    this.getAllProblems(pageNum);
  }

  getAllProblems(pageNum?:Number){
    debugger
    this.requestObject = {
      "pageSize": this.pageSize,
      "pageNumber": pageNum,
      "searchCriteria": "",
      "selectedId": []
    }
    this._problemService.getAllProblems(this.requestObject).subscribe(res => {
      debugger
     this.paginationData = res.data; 
     this.problemList = res.data.data;
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
  getAllCategories(){
    this._categoriesService.getAllCategories().subscribe(res => {
     this.categoriesList = res.data;
     console.log("this.categoriesList: ", this.categoriesList);
     
    }, err => {
      console.error(err)
    })
  }
  
  ngOnInit() {
    debugger
    this.getAllProblems();
    this.getAllCategories();
  }
}
