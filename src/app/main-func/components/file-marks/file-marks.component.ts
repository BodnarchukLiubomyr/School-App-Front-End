import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { StorageService } from 'src/app/shared';
import { MainFuncService } from '../../services/main-func.service';
import { Location } from '@angular/common';

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
        Validators.pattern(/^(0|[1-9]|1[0-2])$/)
      ]
  }]});

  @Input()tasks: any[] = [];
  fileName = '';

  fileWork: any;
  errorMessage = '';
  private subscription: Subscription;
  exerciseId = '';
  isRateFileFailed = false;

  constructor(
    private mainFuncService: MainFuncService,
    private storageService: StorageService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private location: Location
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
    if (this.fileWork) {
      this.fileWork.mark = mark;

    this.subscription = this.mainFuncService.fileMarks(fileName,mark!)
    .subscribe({
      next: data => {
        console.log(data);
        console.log(this.exerciseId);
        this.fileWork = data;
        this.router.navigate(["work-rating",this.exerciseId])
      },
      error: err => {
        if (err.status == 500) {
          this.errorMessage = err.error.message;
          this.isRateFileFailed = true;
        }
      }
    });
    } else {
      console.error("FileWork is not defined.");
    }
  }

  goBack(event: MouseEvent) {
    event.preventDefault();
    this.location.back();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
