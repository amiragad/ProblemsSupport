import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { tap } from 'rxjs/operators';
import { Categories, Category } from 'src/app/Interfaces/categories';
import { Problem } from 'src/app/Interfaces/problem';
import { CategoriesService } from 'src/app/Services/categories.service';
import { ProblemService } from 'src/app/Services/problem.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-problem',
  templateUrl: './add-problem.component.html',
  styleUrls: ['./add-problem.component.css']
})
export class AddProblemComponent implements OnInit {

  problemForm = this.formBuilder.group({
    problemTitle: ['', Validators.required],
    problemDescription: ['', Validators.required],
    problemCategory: ['', Validators.required]
  });
  problemObject:object = {
    "cat_Id": 0,
    "title": "",
    "description": "",
    "solved": 0
  }
  categoriesList: Category[] | undefined;
  selectedcategory:String | undefined;
  


  constructor(private formBuilder: FormBuilder, public _problemService : ProblemService, public _categoriesService: CategoriesService) { }

  onsubmit(formDate:any){
    debugger
    formDate.problemDescription = formDate.problemDescription.replace(/<\/?[^>]+(>|$)/g, "");
    this.problemObject = {
      "cat_Id": formDate.problemCategory,
      "title": formDate.problemTitle,
      "description": formDate.problemDescription,
      "solved": 0
    }
    this._problemService.addNewProblem(this.problemObject).subscribe(res => {
      if (res.success) {
        console.log("res->", res)
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Problem added successfully',
            showConfirmButton: false,
            timer: 1500
          })
          this.getAllCategories();
          setTimeout(() => {
            window.location.reload();
          }, 1500);
          
      }
      else {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Failed to add problem',
          showConfirmButton: false,
          timer: 1500
        })
      }
    }, err => {
      console.error(err)
    })
  }

  getAllCategories(){
    this._categoriesService.getAllCategories().subscribe(res => {
     this.categoriesList = res.data;
     debugger
    }, err => {
      console.error(err)
    })
  }

 
  
  ngOnInit(): void {
    debugger
    this.getAllCategories();
  }
}
