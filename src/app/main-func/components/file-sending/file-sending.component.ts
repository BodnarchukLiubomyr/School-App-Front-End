import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-file-sending',
  templateUrl: './file-sending.component.html',
  styleUrls: ['./file-sending.component.scss']
})
export class FileSendingComponent {
  selectedFile: File | null = null;

  constructor(private http: HttpClient) { }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0] as File;
  }

  uploadFile() {
    if (this.selectedFile) {
      const formData: FormData = new FormData();
      formData.append('file', this.selectedFile, this.selectedFile.name);

      // Replace the URL with your Spring Boot API endpoint for file upload
      this.http.post('http://localhost:8080/api/files/upload', formData)
        .subscribe(response => {
          console.log('File uploaded successfully:', response);
        }, error => {
          console.error('Error uploading file:', error);
        });
    } else {
      console.error('No file selected');
    }
  }
}
