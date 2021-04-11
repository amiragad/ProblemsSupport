import { Component, OnInit } from '@angular/core';
import { Problem } from 'src/app/Interfaces/problem';

@Component({
  selector: 'app-add-problem',
  templateUrl: './add-problem.component.html',
  styleUrls: ['./add-problem.component.css']
})
export class AddProblemComponent implements OnInit {
  problemDetails: Problem | undefined ;
  constructor() { }

  ngOnInit(): void {
  }

}
