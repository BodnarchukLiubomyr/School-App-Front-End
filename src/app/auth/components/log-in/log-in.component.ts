import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { forbiddenDomain } from '../../directives/validation/forbidden-domain.directive';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { StorageService } from 'src/app/shared/storage.service';
import { regexValidator } from '../../directives/validation/multi-pattern.directive';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent implements OnInit, OnDestroy{
  loginForm = this.fb.group({
    email: ['', {
      validators: [
        Validators.required,
        Validators.pattern(/^(?=.{1,64}@)[A-Za-z0-9_-]+(\.[A-Za-z0-9_-]+)*@[^-][A-Za-z0-9-]+(\.[A-Za-z0-9-]+)*(\.[A-Za-z]{2,})$/),
        forbiddenDomain(/\w+@epam\.com$/i)
      ]
    }],
  password: ['', {
    validators: [
      Validators.required,
      Validators.minLength(8),
      regexValidator(/[A-Z]+/, { 'uppercase': ' ' }),
      regexValidator(/[a-z]+/, { 'lowercase': ' ' }),
      regexValidator(/[0-9]+/, { 'number': ' ' }),
      regexValidator(/^\S+/, { 'nospaces': ' ' })
      ]
    }]
  }
  );

  private subscription: Subscription;

  isLoggedIn = false;
  isLogInFailed = false;
  errorMessage = '';
  roles: string[] = [];

  showPassword = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder,
    private storageService: StorageService,
  ) {
    this.subscription = new Subscription();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


  ngOnInit(): void {
    if (this.storageService.isLoggedIn()) {
      this.isLoggedIn = true;
      this.roles = this.storageService.getUser().roles;
    }
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  closeErrorAlert() {
    this.isLogInFailed = false;
  }

  onSubmit(): void {
    const { email, password} = this.loginForm.value;

    this.subscription = this.authService.logIn(email!, password!).subscribe({
      next: data => {
        console.log(data);
        this.storageService.saveUser(data);

        this.isLogInFailed = false;
        this.isLoggedIn = true;

        this.roles = this.storageService.getUser().roles;
        this.router.navigate(['empty-test']);
      },
      error: err => {
        if (err.status == 500) {
          this.errorMessage = err.error.message;
          this.isLogInFailed = true;
        }
      }
    })
  }

  reloadPage(): void {
    window.location.reload();
  }
}
