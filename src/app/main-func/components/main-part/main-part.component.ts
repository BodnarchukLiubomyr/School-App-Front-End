import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-main-part',
  templateUrl: './main-part.component.html',
  styleUrls: ['./main-part.component.scss']
})
export class MainPartComponent{

  constructor(
    private router: Router
  ) {}

  navigateToCreateExercise(): void {
    this.router.navigate(['create-exercise']);
  }

  navigateToWorkWithClass(): void{
    this.router.navigate(['work-with-class']);
  }

  navigateToCreateSubject(): void {
    this.router.navigate(['create-subject']);
  }
}
