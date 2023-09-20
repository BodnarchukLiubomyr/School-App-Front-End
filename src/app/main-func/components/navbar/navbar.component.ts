import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/shared';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  showMenu = false;

  constructor(
    private storageService: StorageService,
    private router: Router,
  ) { }

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
    console.log("Sign out, clear localStorage");
  }
}
