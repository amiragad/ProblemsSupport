import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { AddCategoryComponent } from 'src/app/Components/add-category/add-category.component';
import { Category ,Categories} from 'src/app/Interfaces/categories';
import { CategoriesService } from '../../Services/categories.service'

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  selectedValue: string | undefined;
  myControl = new FormControl();
  problemObj: object = {};
  categoryList: Category[] | undefined;

  constructor(
    public _router: Router,
    public dialog: MatDialog,
    public CategoriesService: CategoriesService
  ) { }



  addCategoryDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.maxWidth = '60%';
    const dialogRef = this.dialog.open(AddCategoryComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }


  getAllCategories() {
    this.CategoriesService.getAllCategories().subscribe(res => {
      this.categoryList = res.data;
      console.log("--->", this.categoryList)
    }, err => {
      console.error(err)
    })
  }

  ngOnInit() {
    this.getAllCategories();
  }

}
