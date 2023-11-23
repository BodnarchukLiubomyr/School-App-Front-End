import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { StorageService } from 'src/app/shared';
import { MainFuncService } from '../../services/main-func.service';

@Component({
  selector: 'app-file-marks',
  templateUrl: './file-marks.component.html',
  styleUrls: ['./file-marks.component.scss']
})
export class FileMarksComponent implements OnInit,OnDestroy{
  form = this.fb.group({
    mark: ['',{
      validators: [
        Validators.required,
        Validators.pattern(/^(0?[1-9]|1[0-1])$/)
      ]
  }]});

  @Input()tasks: any[] = [];
  fileName = '';

  fileWorks: any;
  errorMessage = '';
  private subscription: Subscription;
  exerciseId = '';
  // isRateFileComplete= false;
  isRateFileFailed = false;

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
      this.fileName = params['fileName'];
    });
    this.exerciseId = this.storageService.getExercise().id;
  }

  closeErrorAlert() {
    this.isRateFileFailed = false;
  }

  rateFile(fileName: string): void{
    const {mark} = this.form.value;
    this.subscription = this.mainFuncService.fileMarks(fileName,mark!)
    .subscribe({
      next: data => {
        console.log(data);
        this.fileWorks = data;
        this.router.navigate(["work-rating",this.exerciseId])
      },
      error: err => {
        if (err.status == 500) {
          this.errorMessage = err.error.message;
          this.isRateFileFailed = true;
        }
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
