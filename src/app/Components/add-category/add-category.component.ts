import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Categories, Category } from 'src/app/Interfaces/categories';
import { CategoriesService } from 'src/app/Services/categories.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {


  categoryObject: object = {
    "name": "",
  }
  categoriesList: Category[] | undefined;
  selectedcategory: String | undefined;
  categoryForm: any


  constructor(private formBuilder: FormBuilder, public _categoriesService: CategoriesService) {
    this.categoryForm = this.formBuilder.group({
      name: ['', Validators.required],
    });

  }

  get fVal() {
    return this.categoryForm.controls;
  }
  onsubmit() {
    if (this.categoryForm.get('name').invalid) {
      return;
    }
   
    this._categoriesService.addNewCategory(this.categoryForm.value).subscribe(res => {
      if (res.success) {
        console.log("res->", res)
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Category added successfully',
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
          title: 'Failed to add category',
          showConfirmButton: false,
          timer: 1500
        })
      }
    }, err => {
      console.error(err)
    })
  }


  getAllCategories() {
    this._categoriesService.getAllCategories().subscribe(res => {
      this.categoriesList = res.data;
    }, err => {
      console.error(err)
    })
  }



  ngOnInit(): void {

  }
}
