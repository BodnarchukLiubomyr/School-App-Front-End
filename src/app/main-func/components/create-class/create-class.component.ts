import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MainFuncService } from '../../services/main-func.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-create-class',
  templateUrl: './create-class.component.html',
  styleUrls: ['./create-class.component.scss']
})
export class CreateClassComponent implements OnDestroy{
  form = this.fb.group({
    classNumber: ['',{
      validators: [
        Validators.required,
        Validators.pattern(/^(0?[1-9]|1[0-1])$/)
      ]
    }],
    classLetter: ['',{
      validators: [
        Validators.required,
        Validators.pattern(/^[A-D]$/)
      ]
    }],
  });

  isCreateClassFailed = true;
  errorMessage = '';
  private subscription: Subscription | undefined

  constructor(
    private mainFuncService: MainFuncService,
    private router: Router,
    private fb: FormBuilder
  ) { }

  closeErrorAlert() {
    this.isCreateClassFailed = false;
  }

  onSubmit(): void {
    const {classNumber,classLetter} = this.form.value;

    this.subscription = this.mainFuncService.createClass(classNumber!,classLetter!).subscribe({
      next: data => {
        console.log(data);
        this.isCreateClassFailed = false;
        this.router.navigate(["work-with-class"]);
      },
      error: err => {
        if (err.status == 500) {
          this.errorMessage = err.error.message;
          this.isCreateClassFailed = true;
        }
      }
    })
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}