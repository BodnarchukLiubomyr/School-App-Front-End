import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { StorageService } from 'src/app/shared';
import { MainFuncService } from '../../services/main-func.service';

@Component({
  selector: 'app-work-rating',
  templateUrl: './work-rating.component.html',
  styleUrls: ['./work-rating.component.scss']
})
export class WorkRatingComponent implements OnInit,OnDestroy{

  @Input() tasks: any[] = [];
  exerciseId: string | undefined;
  fileName: string | undefined;

  fileWorks: any;
  errorMessage = '';
  private subscription: Subscription;

  constructor(
    private mainFuncService: MainFuncService,
    private storageService: StorageService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {
    this.subscription = new Subscription();
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.exerciseId = params['exerciseId'];
      this.fileName = params['fileName'];
      if (this.exerciseId) {
        this.getFileWork(this.exerciseId);
      }
      if (this.fileName) {
        this.downloadFile(this.fileName);
      }
    });
  }

  getFileWork(exerciseId: string): void{
    this.subscription = this.mainFuncService.getFileWork(exerciseId)
    .subscribe({
      next: data => {
        console.log(data);
        this.fileWorks = data;
        this.storageService.saveExercise(exerciseId)
      },
      error: err => {
        if (err.status == 500) {
          this.errorMessage = err.error.message;
        }
      }
    });
  }

  downloadFile(fileName: string){
    console.log('Requesting file download for fileName:',fileName);
    if(fileName == null){
      console.error('File name is null or undefined');
    }
    else{
      this.mainFuncService.downloadFile(fileName)
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
