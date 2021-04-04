import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UsersComponent } from './Pages/users/users.component';
import { CategoriesComponent } from './Pages/categories/categories.component';
import { ProblemsComponent } from './Pages/problems/problems.component';
import { ViewProblemComponent } from './Pages/view-problem/view-problem.component';
import { AuthComponent } from './Pages/auth/auth.component';
const routes: Routes = [
  { path: '', component: AuthComponent },
  { path: 'users', component: UsersComponent },
  { path: 'problems', component: ProblemsComponent },
  { path: 'view-problem', component: ViewProblemComponent },
  { path: 'categories', component: CategoriesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
