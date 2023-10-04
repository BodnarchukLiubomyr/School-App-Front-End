import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth';
import { StorageService } from 'src/app/shared';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnDestroy{
  showMenu: Boolean = false;
  email: string = this.storageService.getUser().email;
  errorMessage = '';
  private subscription: Subscription;

  constructor(
    private storageService: StorageService,
    private router: Router,
    private authService: AuthService)
    {
      this.subscription = new Subscription();
    }

    ngOnDestroy(): void {
      this.subscription?.unsubscribe();
    }

  toggleMenu(){
    this.showMenu = !this.showMenu;
  }

  onBlur(event: FocusEvent) {
    const target = event.relatedTarget as HTMLElement;
    if (!target || !target.closest('.block')) {
      this.showMenu = false;
    }
  }

  isLoggedIn(): boolean {
    return this.storageService.isLoggedIn();
  }

  onSignOut() {
    this.storageService.clean();
    this.router.navigate(['/log-in']);
    console.log("onSignOut method, clear localStorage");
  }
}
