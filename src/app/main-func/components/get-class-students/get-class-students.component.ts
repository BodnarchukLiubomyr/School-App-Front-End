import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { forbiddenDomain } from 'src/app/auth/directives/validation/forbidden-domain.directive';
import { MainFuncService } from '../../services/main-func.service';
import { StorageService } from 'src/app/shared';

@Component({
  selector: 'app-get-class-students',
  templateUrl: './get-class-students.component.html',
  styleUrls: ['./get-class-students.component.scss']
})
export class GetClassStudentsComponent implements OnInit,OnDestroy{

  @Input() tasks: any[] = [];
  className: string | undefined;
  private subscription: Subscription;

  isGetClassUsersFailed = false;
  errorMessage = '';

  schoolClasses: any;

  constructor(
    private mainFuncService: MainFuncService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private storageService: StorageService,
  ) {
    this.subscription = new Subscription();
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.className = params['className'];
      if (this.className) {
        this.getClassUsers(this.className);
      }
    });
  }

  closeErrorAlert() {
    this.isGetClassUsersFailed = false;
  }

  getClassUsers(className: string): void {
    this.subscription = this.mainFuncService.getClassUsers(className)
    .subscribe({
      next: data => {
        this.schoolClasses = data;
        this.className = this.storageService.getClassName();
      },
      error: err => {
        if (err.status == 500) {
          this.errorMessage = err.error.message;
          this.isGetClassUsersFailed = true;
        }
      }
    })
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
