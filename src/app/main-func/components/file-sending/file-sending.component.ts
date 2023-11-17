import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { MainFuncService } from '../../services/main-func.service';
import { StorageService } from 'src/app/shared';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-file-sending',
  templateUrl: './file-sending.component.html',
  styleUrls: ['./file-sending.component.scss']
})
export class FileSendingComponent implements OnInit,OnDestroy{
    @Input()
    exerciseId: string = '';
    userId = '';
    token = '';

    @Output() UploadFileEvent = new EventEmitter<string>();
    fileName = '';
    errorMessage: string = '';
    processing = false;
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
      this.token = this.storageService.getUser().token;
    }

    onDragOver(event: any) {
      event.preventDefault();
      this.processing = true;
    }

    onDropSuccess(event: any) {
      event.preventDefault();
      this.onFileDropped(event);
      this.processing = false;
    }

    onDragLeave(event: any) {
      event.preventDefault();
      this.processing = false;
    }

    onFileDropped(event: any): void {
      const files = event.dataTransfer.files;
      if (files.length === 1 && this.isFileTypeAllowed(files[0])) {
        this.uploadFile(files[0]);
      } else {
        this.showError('Please upload a valid file.');
      }
    }

    onFileSelected(event: any): void {
      const file: File = event.target.files[0];
      if (this.isFileTypeAllowed(file)) {
        this.uploadFile(file);
      } else {
        this.showError('Please upload a valid file.');
      }
    }

    uploadFile(file: File): void {
      console.log(this.exerciseId)
      if (file) {
        this.fileName = file.name;
        this.subscription = this.mainFuncService.uploadFile(this.userId,this.exerciseId,this.token,file)
          .subscribe({
            next: data => {
              if (data.status === 'success') {
                console.log('The project has been successfully uploaded.');
                // Handle success
                this.UploadFileEvent.emit(data.file);
              } else {
                // Handle other statuses or errors
                this.showError(data.message);
              }
              // Navigate to the desired route after successful upload
            },
            error: err => {
              console.error('Error occurred during file upload:', err);
              this.showError('An unexpected error occurred during file upload.');
            }
          });
      }
    }

    ngOnDestroy(): void {
      this.subscription.unsubscribe();
    }

    private isFileTypeAllowed(file: File): boolean {
      const allowedTypes = ['.pdf', '.doc', '.docx', '.ppt', '.pptx'];
      const fileType = `.${file.name.split('.').pop()}`;
      return allowedTypes.includes(fileType.toLowerCase());
    }

    private showError(message: string): void {
      console.error('Error:', message);
      this.errorMessage = 'Error:'+message;
    }
}
