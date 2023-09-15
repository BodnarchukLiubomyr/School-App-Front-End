import { Component } from '@angular/core';
import { StorageService } from '../shared/storage.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  showMenu = false;

  constructor(private storageService: StorageService){}

  toggleMenu(){
    this.showMenu = !this.showMenu;
  }

  onBlur(){
    this.showMenu = false;
  }

  isLoggedIn(): boolean {
    return this.storageService.isLoggedIn();
  }
}
