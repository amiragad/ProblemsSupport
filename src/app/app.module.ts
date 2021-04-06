import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';


// components
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './Components/nav-bar/nav-bar.component';
import { CommentComponent } from './Components/comment/comment.component';
import { ModalComponent } from './Components/modal/modal.component';
import { FormComponent } from './Components/form/form.component';
import { TableComponent } from './Components/table/table.component';
// pages
import { UsersComponent } from './Pages/users/users.component';
import { CategoriesComponent } from './Pages/categories/categories.component';
import { ProblemsComponent } from './Pages/problems/problems.component';
import { ViewProblemComponent } from './Pages/view-problem/view-problem.component';
import { AuthComponent } from './Pages/auth/auth.component';
// libraries 
import { MatTabsModule } from '@angular/material/tabs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProblemCardComponent } from './Components/problem-card/problem-card.component';


@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    NavBarComponent,
    CommentComponent,
    ModalComponent,
    FormComponent,
    TableComponent,
    UsersComponent,
    CategoriesComponent,
    ProblemsComponent,
    ViewProblemComponent,
    ProblemCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatTabsModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
