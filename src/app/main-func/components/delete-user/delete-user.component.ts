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
  @Input() projectName: string = '';

  constructor(
    private mainfuncService: MainFuncService,
    private storageService: StorageService,
    public dialog: MatDialogRef<MainPartComponent>,

    @Inject(MAT_DIALOG_DATA) public data:any)
    {
      this.projectName = data.name;
    }

  onDeleteUser() : void{
    this.mainfuncService.deleteUser(this.storageService.getUser().email,this.storageService.getUser().token).subscribe(
      {
        next: data => {
          console.log(data);
          window.location.reload();
        }
      }
    );
    console.log("onDeleteUser");
  }

  onClose(){
    this.dialog.close(false);
  }
}
