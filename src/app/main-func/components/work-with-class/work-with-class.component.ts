import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MainFuncService } from '../../services/main-func.service';

@Component({
  selector: 'app-work-with-class',
  templateUrl: './work-with-class.component.html',
  styleUrls: ['./work-with-class.component.scss']
})
export class WorkWithClassComponent implements OnDestroy{

  errorMessage = '';
  private subscription: Subscription;

  constructor(
    private mainFuncService: MainFuncService,
    private router: Router
  ) {
    this.subscription = new Subscription();
  }

  navigateToCreateClass(){
    this.router.navigate(['create-class'])
  }

  navigateToAddUserToClass(){
    this.router.navigate(['add-user-to-class'])
  }

  navigateToCreateSubject(): void {
    this.router.navigate(['create-subject']);
  }

  transferUsers(): void {
      this.subscription = this.mainFuncService.transferUsersToNextClass()
      .subscribe({
        next: data => {
          console.log(data);
          this.router.navigate(['work-with-class'])
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
