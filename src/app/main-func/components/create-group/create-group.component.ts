import { Component } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MainFuncService } from '../../services/main-func.service';

@Component({
  selector: 'app-create-group',
  templateUrl: './create-group.component.html',
  styleUrls: ['./create-group.component.scss']
})
export class CreateGroupComponent {
  form = this.fb.group({
    groupName: ['',{
      validators: [
        Validators.required,
        Validators.pattern(/^(?:[^A-Z]*[A-Z]?[^A-Z]*)?(?=.*[a-z])(?!\\d)(?!\\s).{1,}$/),
        Validators.maxLength(60)
      ]
    }],
    subjectName: ['',{
      validators: [
      Validators.required,
      Validators.pattern(/^(?:[^A-Z]*[A-Z]?[^A-Z]*)?(?=.*[a-z])(?!\\d)(?!\\s).{1,}$/)
      ]
    }],
    className: ['',{
      validators: [
      Validators.required,
      Validators.pattern(/^(0?[1-9]|1[0-1])-[A-D]$/)
      ]
    }]
  });

  isCreateGroupFailed = false;
  errorMessage = '';
  private subscription: Subscription | undefined;

  constructor(
    private mainFuncService: MainFuncService,
    private router: Router,
    private fb: FormBuilder
  ) { }

  closeErrorAlert() {
    this.isCreateGroupFailed = false;
  }

  onSubmit(): void {
    const {groupName, subjectName,className} = this.form.value;

    this.subscription = this.mainFuncService.createGroup(groupName!,subjectName!,className!).subscribe({
      next: data => {
        console.log(data);
        this.router.navigate(["main-part"]);
      },
      error: err => {
        if (err.status == 500) {
          this.errorMessage = err.error.message;
          this.isCreateGroupFailed = true;
        }
      }
    })
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
