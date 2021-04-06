import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddProblemComponent } from './add-problem/add-problem.component';
import { ProblemsComponent } from './problems.component';
import { ViewProblemComponent } from './view-problem/view-problem.component';


const routes: Routes = [
  { path: '' , component : ProblemsComponent },
  { path: 'view-problem', component: ViewProblemComponent },
  { path: 'add-problem', component: AddProblemComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProblemsRoutingModule { }
