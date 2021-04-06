import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UsersComponent } from './Pages/users/users.component';
import { CategoriesComponent } from './Pages/categories/categories.component';
import { AuthComponent } from './Pages/auth/auth.component';

const routes: Routes = [
  { path: '', component: AuthComponent },
  { path: 'users', component: UsersComponent },
  {
    path: 'problems',
    loadChildren: () => import('./Pages/problems/problems.module').then(m => m.ProblemsModule)
  },
  { path: 'categories', component: CategoriesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
