import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { ProblemService } from 'src/app/Services/problem.service';
import { SolutionsService } from 'src/app/Services/solutions.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-solution',
  templateUrl: './add-solution.component.html',
  styleUrls: ['./add-solution.component.css']
})
export class AddSolutionComponent implements OnInit {
  solutionForm = this.formBuilder.group({
    solutionDescription: ['', Validators.required]
  });
  solutionObject:object = {
    "problem_Id": null as any,
    "content": ""
  }
  problemObject: any = {};
  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: "15rem",
    minHeight: "5rem",
    placeholder: "Enter text here...",
    translate: "no",
    defaultParagraphSeparator: "p",
    defaultFontName: "Arial",
    toolbarHiddenButtons: [["bold"]],
    customClasses: [
      {
        name: "quote",
        class: "quote"
      },
      {
        name: "redText",
        class: "redText"
      },
      {
        name: "titleText",
        class: "titleText",
        tag: "h1"
      }
    ],
    sanitize: false
  };
  constructor(
    private formBuilder: FormBuilder,
    public _solutionService : SolutionsService,
    public _problemService : ProblemService
    ) { }

  onsubmit(formData:any){
    debugger
    // formData.solutionDescription = formData.solutionDescription.replace(/<\/?[^>]+(>|$)/g, "");
    //formData.solutionDescription = formData.solutionDescription.replace(/\s/g, '');
    this.solutionObject = {
      "problem_Id": this.problemObject.id,
      "content": formData.solutionDescription
    }
   this._solutionService.addNewSolution(this.solutionObject).subscribe(res => {
    if (res.success) {
      console.log("res->", res)
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Solution added successfully',
          showConfirmButton: false,
          timer: 1500
        })
        this.ngOnInit();
        setTimeout(() => {
          window.location.reload();
        }, 1500);
        
    }
    else {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Failed to add solution',
        showConfirmButton: false,
        timer: 1500
      })
    }
  }, err => {
    console.error(err)
  })
  }

  ngOnInit(): void {
    this._problemService.problemObj.subscribe(obj => this.problemObject = obj);
    
  }

}
