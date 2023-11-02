import { Component, OnDestroy } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth';
import { fieldsMatch } from 'src/app/auth/directives/validation/fields.match.directives';
import { forbiddenDomain } from 'src/app/auth/directives/validation/forbidden-domain.directive';
import { regexValidator } from 'src/app/auth/directives/validation/multi-pattern.directive';
import { MainFuncService } from '../../services/main-func.service';

@Component({
  selector: 'app-create-exercise',
  templateUrl: './create-exercise.component.html',
  styleUrls: ['./create-exercise.component.scss']
})
export class CreateExerciseComponent implements OnDestroy{
  form = this.fb.group({
    description: ['', Validators.required],
    date: [null, Validators.required],
    className: ['', Validators.required],
    subjectName: ['', Validators.required]
  });

  private subscription: Subscription | undefined;

  constructor(
    private mainFuncService: MainFuncService,
    private router: Router,
    private fb: FormBuilder
  ) { }

  onSubmit(): void {
    const {description, date, className,subjectName} = this.form.value;

    this.subscription = this.mainFuncService.createExercise(description!,date!,className!,subjectName!).subscribe({
      next: data => {
        console.log(data);
        this.router.navigate(["get-subjects"]);
      },
      error: err => { }
    })
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
