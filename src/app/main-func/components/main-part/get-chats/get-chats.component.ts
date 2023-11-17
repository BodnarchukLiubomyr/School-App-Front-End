import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { MainFuncService } from 'src/app/main-func/services/main-func.service';
import { StorageService } from 'src/app/shared';

@Component({
  selector: 'app-get-chats',
  templateUrl: './get-chats.component.html',
  styleUrls: ['./get-chats.component.scss']
})
export class GetChatsComponent implements OnInit,OnDestroy{

  @Input()
  userId = ''; // Set the user ID here
  userChats: any[] = [];

  errorMessage = '';
  private subscription: Subscription;

  constructor(
    private mainFuncService: MainFuncService,
    private storageService: StorageService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.subscription = new Subscription();
  }

  ngOnInit(): void {
    this.userId = this.storageService.getUser().id;
    this.loadChats();
  }

  loadChats(): void {
    this.subscription = this.mainFuncService.getAllUserChats(this.userId)
    .subscribe({
      next: data => {
        console.log(data);
        this.userChats = data;
      },
      error: err => {
        if (err.status == 500) {
          this.errorMessage = err.error.message;
        }
      }
      }
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
