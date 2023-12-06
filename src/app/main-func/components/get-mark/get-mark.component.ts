import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { StorageService } from 'src/app/shared';
import { MainFuncService } from '../../services/main-func.service';

@Component({
  selector: 'app-get-mark',
  templateUrl: './get-mark.component.html',
  styleUrls: ['./get-mark.component.scss']
})
export class GetMarkComponent implements OnInit,OnDestroy{
  @Input()
  exerciseId: string = '';

  @Input()
  userId = '';

  fileWork: any;
  errorMessage = '';
  private subscription: Subscription;

  constructor(
    private mainFuncService: MainFuncService,
    private storageService: StorageService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.subscription = new Subscription();
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.userId = this.storageService.getUser().id;
      this.getMark();
    });
  }

  getMark(): void{
    this.subscription = this.mainFuncService.getMark(this.userId,this.exerciseId)
    .subscribe({
      next: data => {
        console.log(data);
        this.fileWork = data;
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
