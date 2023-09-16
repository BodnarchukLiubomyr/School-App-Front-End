import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-check-mail',
  templateUrl: './check-mail.component.html',
  styleUrls: ['./check-mail.component.scss']
})
export class CheckMailComponent implements OnDestroy{
  private subscription: Subscription;
  email = this.route.snapshot.paramMap.get('email');

  isEmailSent = true;
  isEmailConfirmed = false;
  errorMessage = '';

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.subscription = new Subscription();
  }

  closeSuccessAlert() {
    this.isEmailConfirmed = false;
  }

  closeErrorAlert() {
    this.isEmailSent = true;
  }

  sendChangePasswordMail(): void {
    var subscription = this.authService.forgotPassword(this.email!)
      .subscribe({
        next: req => {
          console.log("sended email to ", this.email);
          console.log(req.status);
        },
        error: err => {
          if (err.status == 500) {
            this.errorMessage = err.error.message;
            this.isEmailSent = false;
          }
        }
      });
    this.subscription.add(subscription);
  };

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
