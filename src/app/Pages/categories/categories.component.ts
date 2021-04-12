import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { category } from 'src/app/Interfaces/category';
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
  categoryList: any | undefined;

  constructor(
    public _router: Router,
    public dialog: MatDialog,
    public CategoriesService: CategoriesService
  ) { }



  addProblemDialog() {
    // const dialogConfig = new MatDialogConfig();
    // dialogConfig.maxWidth = '60%';
    // const dialogRef = this.dialog.open(AddProblemComponent, dialogConfig);
    // dialogRef.afterClosed().subscribe(result => {
    //   console.log(`Dialog result: ${result}`);
    // });
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
