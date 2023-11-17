import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MainFuncService } from '../../services/main-func.service';
import { StorageService } from 'src/app/shared';

@Component({
  selector: 'app-subject-view',
  templateUrl: './subject-view.component.html',
  styleUrls: ['./subject-view.component.scss']
})
export class SubjectViewComponent implements OnInit,OnDestroy{

  @Input() tasks: any[] = [];
  subjectId: string | undefined;
  userId = '';
  token = '';

  exercises: any;
  errorMessage = '';
  private subscription: Subscription;

  constructor(
    private mainFuncService: MainFuncService,
    private storageService: StorageService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {
    this.subscription = new Subscription();
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.subjectId = params['subjectId'];
      this.userId = this.storageService.getUser().id;
      this.token = this.storageService.getUser().token;

      if (this.subjectId) {
        this.getExercises(this.subjectId);
      }
    });
  }

  getExercises(subjectId: string): void {
    this.subscription = this.mainFuncService.getExercises(subjectId)
    .subscribe({
      next: data => {
        console.log(data);
        this.exercises = data;
        this.storageService.saveExercise(data);/////////////////////
      },
      error: err => {
        if (err.status == 500) {
          this.errorMessage = err.error.message;
        }
      }
    });
  }

  isTeacher(): boolean {
    const userRole = this.storageService.getUser().role;
    console.log("Role:",userRole);
    return userRole === 'TEACHER';
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}