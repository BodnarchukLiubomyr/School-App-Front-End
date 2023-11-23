import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { StorageService } from 'src/app/shared';
import { MainFuncService } from '../../services/main-func.service';

@Component({
  selector: 'app-get-group',
  templateUrl: './get-group.component.html',
  styleUrls: ['./get-group.component.scss']
})
export class GetGroupComponent implements OnInit,OnDestroy{
  @Input() subjectId = '';
  @Input() userId = '';

  groups: any;
  errorMessage = '';
  isGetGroupFailed = false;
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
      this.getGroup();
    });
  }

  claseErrorAlert(){
    this.isGetGroupFailed = false;
  }

  isTeacher(): boolean {
    const userRole = this.storageService.getUser().role;
    console.log("Role:",userRole);
    return userRole === 'TEACHER';
  }

  getGroup(): void{
    this.subscription = this.mainFuncService.getGroup(this.subjectId,this.userId)
    .subscribe({
      next: data => {
        this.groups = data;
      },
      error: err => {
        if (err.status == 500) {
          this.errorMessage = err.error.message;
          this.isGetGroupFailed = true;
        }
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
