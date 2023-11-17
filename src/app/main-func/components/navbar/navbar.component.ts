import { Component, HostListener, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, timer } from 'rxjs';
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
  userId: string = this.storageService.getUser().id;
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

  isLoggedIn(): boolean {
    return this.storageService.isLoggedIn();
  }

  getChats(){
    this.router.navigate(['/get-chats',this.userId]);
  }

  onSignOut() {
    this.storageService.clean();
    this.router.navigate(['/log-in']);
    console.log("onSignOut method, clear localStorage");
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const targetElement = event.target as HTMLElement;
    const menuElement = document.querySelector('.dropdown');

    if (menuElement && !menuElement.contains(targetElement)) {
      this.showMenu = false;
    }
  }
}
