import { Injectable } from '@angular/core';

const USER_KEY = 'auth-user';
const SUBJECTS_KEY = 'user-subjects';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  clean(): void {
    window.localStorage.clear();
  }

  public saveUser(user: any): void {
    window.localStorage.removeItem(USER_KEY);
    window.localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUser(): any {
    const user = window.localStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }

    return {};
  }

  public isLoggedIn(): boolean {
    const user = window.localStorage.getItem(USER_KEY);
    if (user) {
      return true;
    }

    return false;
  }

  public saveSubject(subject: any): void {
    window.localStorage.removeItem(SUBJECTS_KEY);
    window.localStorage.setItem(SUBJECTS_KEY, JSON.stringify(subject));
  }

  public getSubject(): any {
    const subject = window.localStorage.getItem(SUBJECTS_KEY);
    if (subject) {
      return JSON.parse(subject);
    }

    return {};
  }
}
