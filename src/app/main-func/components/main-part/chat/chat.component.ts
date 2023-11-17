import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { MainFuncService } from 'src/app/main-func/services/main-func.service';
import { StorageService } from 'src/app/shared';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit,OnDestroy{
  @Input() tasks: any[] = [];
  chatId = '';
  chatHistory: { userName: string, message: string }[] = [];
  newMessageContent: any = '';
  errorMessage = '';
  userId = '';
  message: string | undefined;
  isCreateChatFailed = true;

  private subscription: Subscription;

  constructor(
    private mainFuncService: MainFuncService,
    private storageService: StorageService,
    private route: ActivatedRoute)
    {
      this.subscription = new Subscription();
    }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.chatId = params['chatId'];
      this.userId = this.storageService.getUser().id;
      this.loadChatHistory();
    })
  }

  // getMessageClass(userName: string): string {
  //   return userName === this.userName ? 'my-message' : 'other-message';
  // }

  onMessageInput(event: Event): void {
    const target = event.target as HTMLTextAreaElement;
    this.newMessageContent = target.value || '';
  }

  loadChatHistory() {
    // Call your chat service to get chat history based on the chatId
    this.subscription = this.mainFuncService.getChatHistory(this.chatId)
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

  sendMessage() {
    this.subscription = this.mainFuncService.sendMessage(this.chatId, this.userId, this.newMessageContent)
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

  getMessageClass(userName: string): string {
    return userName === this.storageService.getUser().firstname + this.storageService.getUser().lastname
      ? 'my-message'
      : 'other-message';
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
