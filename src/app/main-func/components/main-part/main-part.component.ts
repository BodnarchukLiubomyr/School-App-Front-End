import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { StorageService } from 'src/app/shared';

@Component({
  selector: 'app-main-part',
  templateUrl: './main-part.component.html',
  styleUrls: ['./main-part.component.scss']
})
export class MainPartComponent implements OnInit{

  userId = '';
  userRole: string | undefined;
  roles: string[] = [];

  constructor(
    private router: Router,
    private storageService: StorageService
  ) {}

  ngOnInit(): void {
    this.userId = this.storageService.getUser().id;
  }

  isAdmin(): boolean {
    const userRole = this.storageService.getUser().role;
    console.log("Role:",userRole);
    return userRole === 'ADMIN';
  }

  isTeacher(): boolean {
    const userRole = this.storageService.getUser().role;
    console.log("Role:",userRole);
    return userRole === 'TEACHER';
  }

  isStudent(): boolean {
    const userRole = this.storageService.getUser().role;
    console.log("Role:",userRole);
    return userRole === 'STUDENT';
  }

  navigateToCreateExercise(): void {
    this.router.navigate(['create-exercise']);
  }

  navigateToWorkWithClass(): void{
    this.router.navigate(['work-with-class']);
  }

  navigateToCreateGroup(): void{
    this.router.navigate(['create-group'])
  }

  navigateToAddUserToGroup(): void{
    this.router.navigate(['add-user-to-group'])
  }

  navigateToCreateChat(): void{
    this.router.navigate(['create-chat',this.userId])
  }

  navigateToGetChats(): void{
    this.router.navigate(['get-chats',this.userId])
  }

  navigateToSignUpUser():void{
    this.router.navigate(['sign-up'])
  }

  navigateToSignUpTeacher():void{
    this.router.navigate(['sign-up-teacher'])
  }
}
