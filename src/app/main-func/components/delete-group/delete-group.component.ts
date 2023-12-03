import { Component, Inject, Input, OnInit } from '@angular/core';
import { MainFuncService } from '../../services/main-func.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { StorageService } from 'src/app/shared';
import { ActivatedRoute } from '@angular/router';
import { GetGroupComponent } from '../..';

@Component({
  selector: 'app-delete-group',
  templateUrl: './delete-group.component.html',
  styleUrls: ['./delete-group.component.scss']
})
export class DeleteGroupComponent implements OnInit{
  groupName = '';

  constructor(
    private mainFuncService:MainFuncService,
    private route: ActivatedRoute,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<DeleteGroupComponent>)
    {}

  ngOnInit(): void {
    this.groupName = this.data.groupName;
  }

  deleteGroup() : void{
    this.mainFuncService.deleteGroup(this.groupName).subscribe({
      next: (data) => {
        console.log(data);
        window.location.reload();
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  closeDialog(): void{
    this.dialogRef.close(false);
  }
}
