import { Component, Input, OnInit } from '@angular/core';
import { ProblemService } from 'src/app/Services/problem.service';

@Component({
  selector: 'app-view-problem',
  templateUrl: './view-problem.component.html',
  styleUrls: ['./view-problem.component.css']
})
export class ViewProblemComponent implements OnInit {
  problemObject : object = {}; 
  constructor(public _problemService:ProblemService) { }

  ngOnInit(): void {
    this._problemService.problemObj.subscribe(obj => this.problemObject = obj);
    
  }

}
