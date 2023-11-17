import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StorageService } from 'src/app/shared';
import { MainFuncService } from '../../services/main-func.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-group-chat',
  templateUrl: './group-chat.component.html',
  styleUrls: ['./group-chat.component.scss']
})
export class GroupChatComponent implements OnInit, OnDestroy{
  @Input() tasks: any[] = [];
  groupId = '';
  chatHistory: { userName: string, message: string }[] = []; // Change the type accordingly
  userId = '';
  newMessageContent: any = '';
  message: string | undefined;
  errorMessage = '';

  private subscription: Subscription;

  constructor(private route: ActivatedRoute,
    private mainFuncService: MainFuncService,
    private storageService: StorageService)
    {
      this.subscription = new Subscription();
    }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.groupId = params['groupId'];
      this.userId = this.storageService.getUser().id;
      this.getChatHistory();
    });
  }

  onMessageInput(event: Event): void {
    const target = event.target as HTMLTextAreaElement;
    this.newMessageContent = target.value || '';
  }

  getChatHistory(): void {
    this.subscription = this.mainFuncService.getGroupChatHistory(this.groupId)
    .subscribe({
      next: (data: { user: { firstname: string, lastname: string }, content: string }[]) => {
        console.log('Received data:', data);
        this.chatHistory = data.map((message) => ({
          userName: (message.user && `${message.user.firstname} ${message.user.lastname}`) || 'Unknown User',
          message: message.content
        }));

        // this.userName = this.storageService.getUser().lastname + this.storageService.getUser().firstname;
      },
      error: err => {
        if (err.status == 500) {
          this.errorMessage = err.error.message;
        }
      }
    });
  }

  sendMessage(): void {
    this.subscription = this.mainFuncService.sendGroupMessage(this.groupId, this.userId, this.newMessageContent)
    .subscribe({
        next: data => {
          console.log('Message sent:', data);
          this.chatHistory.push(data);
          this.newMessageContent = '';
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
