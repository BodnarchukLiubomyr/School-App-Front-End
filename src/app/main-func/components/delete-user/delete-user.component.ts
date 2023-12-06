import { Component, Inject, Input } from '@angular/core';
import { StorageService } from 'src/app/shared';
import { MainPartComponent } from '../main-part/main-part.component';
import { MainFuncService } from '../../services/main-func.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.scss']
})
export class DeleteUserComponent {
  lastname = '';
  firstname = '';

  constructor(
    private mainFuncService: MainFuncService,
    public dialog: MatDialogRef<MainPartComponent>,

    @Inject(MAT_DIALOG_DATA) public data:any,
    public dialogRef: MatDialogRef<DeleteUserComponent>)
  {}

  ngOnInit(): void {
    this.lastname = this.data.lastname;
    this.firstname = this.data.firstname;
  }

  deleteUser() : void{
    this.mainFuncService.deleteUser(this.lastname,this.firstname).subscribe({
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
    this.dialog.close(false);
  }
}
