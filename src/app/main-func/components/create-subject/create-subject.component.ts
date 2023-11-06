import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MainFuncService } from '../../services/main-func.service';
import { forbiddenDomain } from 'src/app/auth/directives/validation/forbidden-domain.directive';

@Component({
  selector: 'app-create-subject',
  templateUrl: './create-subject.component.html',
  styleUrls: ['./create-subject.component.scss']
})
export class CreateSubjectComponent {

  form = this.fb.group({
    subjectName: ['', {
      validators: [
        Validators.required,
        Validators.pattern(/^(?:[^A-Z]*[A-Z]?[^A-Z]*)?(?=.*[a-z])(?!\\d)(?!\\s).{1,}$/)
      ]
    }],
    email: ['', {
      validators: [
        Validators.required,
        Validators.pattern(/^(?=.{1,64}@)[A-Za-z0-9_-]+(\.[A-Za-z0-9_-]+)*@[^-][A-Za-z0-9-]+(\.[A-Za-z0-9-]+)*(\.[A-Za-z]{2,})$/),
        forbiddenDomain(/\w+@epam\.com$/i)
      ]
    }],
    className: ['', {
      validators: [
        Validators.required,
        Validators.pattern(/^(0?[1-9]|1[0-1])-[A-D]$/)
      ]
    }],
  }
  );

  isCreateSubjectFailed = true;
  errorMessage = '';
  private subscription: Subscription | undefined;

  constructor(
    private mainFuncService: MainFuncService,
    private router: Router,
    private fb: FormBuilder
  ) { }

  closeErrorAlert() {
    this.isCreateSubjectFailed = false;
  }

  onSubmit(): void {
    const {subjectName,email,className} = this.form.value;

    this.subscription = this.mainFuncService.createSubject(subjectName!,email!,className!).subscribe({
      next: data => {
        console.log(data);
        this.isCreateSubjectFailed = false;
        this.router.navigate(["main-part"]);
      },
      error: err => {
        if (err.status == 500) {
          this.errorMessage = err.error.message;
          this.isCreateSubjectFailed = true;
        }
      }
    })
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
