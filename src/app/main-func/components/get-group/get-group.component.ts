import { Component, Input,OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { StorageService } from 'src/app/shared';
import { MainFuncService } from '../../services/main-func.service';
import { DeleteGroupComponent } from '../delete-group/delete-group.component';

@Component({
  selector: 'app-get-group',
  templateUrl: './get-group.component.html',
  styleUrls: ['./get-group.component.scss']
})
export class GetGroupComponent implements OnInit,OnDestroy{
  @Input()
  subjectId = '';
  @Input()
  userId = '';

  groups: any;
  errorMessage = '';
  isGetGroupFailed = false;
  private subscription: Subscription;

  constructor(
    private mainFuncService: MainFuncService,
    private storageService: StorageService,
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog
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
    this.subscription = this.mainFuncService.getGroups(this.subjectId,this.userId)
    .subscribe({
      next: data => {
        console.log(data);
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

  onDelete(groupName: string): void {
    const dialogRef = this.dialog.open(DeleteGroupComponent, {
      data: {
        groupName: groupName},
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getGroup();
      }
    });
    // [routerLink]="['/delete-group', group.groupName]"
  }


  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
