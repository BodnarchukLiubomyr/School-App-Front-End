import { Component, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { StorageService } from 'src/app/shared';
import { MainFuncService } from '../../services/main-func.service';
import { DeleteGroupComponent } from '../delete-group/delete-group.component';

@Component({
  selector: 'app-delete-exercise',
  templateUrl: './delete-exercise.component.html',
  styleUrls: ['./delete-exercise.component.scss']
})
export class DeleteExerciseComponent {
  exerciseName = '';

  constructor(
    private mainFuncService:MainFuncService,
    private storageService: StorageService,
    private route: ActivatedRoute,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<DeleteExerciseComponent>)
    {}

  ngOnInit(): void {
    this.exerciseName = this.data.exerciseName;
  }

  deleteExercise() : void{
    this.mainFuncService.deleteExerise(this.exerciseName).subscribe({
      next: (data) => {
        console.log(data);
        window.location.reload();
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  onClose(){
    this.dialogRef.close(false);
  }
}
