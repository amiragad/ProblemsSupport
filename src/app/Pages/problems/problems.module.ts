import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ViewProblemComponent } from './view-problem/view-problem.component';
import { ProblemCardComponent } from 'src/app/Components/problem-card/problem-card.component';
import { AddProblemComponent } from './add-problem/add-problem.component';
import { MaterialModule } from 'src/app/material.module';
import { ProblemsRoutingModule } from './problems-routing.module';




@NgModule({
  declarations: [
    ViewProblemComponent,
    ProblemCardComponent,
    AddProblemComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    ProblemsRoutingModule
  ]
})
export class ProblemsModule { }
