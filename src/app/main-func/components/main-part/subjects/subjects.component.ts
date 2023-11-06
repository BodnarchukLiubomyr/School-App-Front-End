import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { MainFuncService } from '../../../services/main-func.service';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { StorageService } from 'src/app/shared';

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.scss']
})
export class SubjectsComponent implements OnInit, OnDestroy{

  @Input() tasks: any[] = [];
  userId = '';
  token = '';

  subjects: any;
  errorMessage = '';
  private subscription: Subscription;

  constructor(
    private mainFuncService: MainFuncService,
    private storageService: StorageService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.subscription = new Subscription();
  }

  ngOnInit(): void {
    this.userId = this.storageService.getUser().id;
    this.token = this.storageService.getUser().token;
    if(this.userId){
      this.getSubjects(this.userId,this.token);
    }
  }

  getSubjects(userId: string,token: string): void {
    this.subscription = this.mainFuncService.getSubjects(userId,token)
    .subscribe({
      next: data => {
        console.log(data);
        this.subjects = data;
      },
      error: err => {
        if (err.status == 500) {
          this.errorMessage = err.error.message;
        }
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
