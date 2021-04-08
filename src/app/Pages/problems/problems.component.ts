import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { ProblemService } from 'src/app/Services/problem.service';
import { AddProblemComponent } from './add-problem/add-problem.component';
interface Category {
  value: string;
  viewValue: string;
}
export interface Problem {
  name: string;
}

@Component({
  selector: 'app-problems',
  templateUrl: './problems.component.html',
  styleUrls: ['./problems.component.css']
})
export class ProblemsComponent implements OnInit {
  selectedValue: string | undefined;
  myControl = new FormControl();
  filteredOptions: Observable<Problem[]> | undefined;
  problemObj:object={};
  
  constructor(public _router:Router, public _problemService:ProblemService, public dialog: MatDialog) { }
  
  options: Problem[] = [
    {name: 'Fix Backgorund Color'},
    {name: 'Fix iput width'},
    {name: 'Fix Arrow Style'}
  ];
  categories: Category[] = [
    {value: 'category-0', viewValue: 'category1'},
    {value: 'category-1', viewValue: 'category2'},
    {value: 'category-2', viewValue: 'category3'}
  ];

  problems: any[] =[
    {
      title: 'Fix Backgorund Color4',
      desc:'Lorem Ipsum is simply dummy text of the printing and typesetting industryLorem Ipsum has been the industry Lorem Ipsum is simply dummy text of the printing and typesetting industryLorem Ipsum has been the industry Lorem Ipsum is simply dummy text of the printing and typesetting industryLorem Ipsum has been the industry',
      solved:true,
      date: '2021-04-01 10:12:12'
    },
    {
      title: 'Fix Backgorund Color5',
      desc:'Lorem Ipsum is simply dummy text of the printing and typesetting industryLorem Ipsum has been the industry.....',
      solved:false,
      date: '2017-04-13 10:12:12'
    },
    {
      title: 'Fix Backgorund Color6',
      desc:'Lorem Ipsum is simply dummy text of the printing and typesetting industryLorem Ipsum has been the industry.....',
      solved:true,
      date: '2017-04-13 10:12:12'
    },
    {
      title: 'Fix Backgorund Color2',
      desc:'Lorem Ipsum is simply dummy text of the printing and typesetting industryLorem Ipsum has been the industry.....',
      solved:false,
      date: '2017-04-13 10:12:12'
    },
    {
      title: 'Fix Backgorund Color3',
      desc:'Lorem Ipsum is simply dummy text of the printing and typesetting industryLorem Ipsum has been the industry.....',
      solved:false,
      date: '2017-04-13 10:12:12'
    },
    {
      title: 'Fix Backgorund Color4',
      desc:'Lorem Ipsum is simply dummy text of the printing and typesetting industryLorem Ipsum has been the industry.....',
      solved:true,
      date: '2017-04-13 10:12:12'
    },
    {
      title: 'Fix Backgorund Color2',
      desc:'Lorem Ipsum is simply dummy text of the printing and typesetting industryLorem Ipsum has been the industry.....',
      solved:false,
      date: '2017-04-13 10:12:12'
    },
    {
      title: 'Fix Backgorund Color3',
      desc:'Lorem Ipsum is simply dummy text of the printing and typesetting industryLorem Ipsum has been the industry.....',
      solved:false,
      date: '2017-04-13 10:12:12'
    },
    {
      title: 'Fix Backgorund Color4',
      desc:'Lorem Ipsum is simply dummy text of the printing and typesetting industryLorem Ipsum has been the industry.....',
      solved:true,
      date: '2017-04-13 10:12:12'
    }
  ];

  addProblemDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.maxWidth = '60%';
    const dialogRef = this.dialog.open(AddProblemComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  displayFn(problem: Problem): string {
    return problem && problem.name ? problem.name : '';
  }

  private _filter(name: string): Problem[] {
    const filterValue = name.toLowerCase();

    return this.options.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0);
  }

  ShowProblemDtails(problemObject:object){
    
    this._problemService.updateProblemObject(problemObject);
    this._router.navigate(['problems/view-problem']);
  }

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.name),
        map(name => name ? this._filter(name) : this.options.slice())
      );
  }
}
