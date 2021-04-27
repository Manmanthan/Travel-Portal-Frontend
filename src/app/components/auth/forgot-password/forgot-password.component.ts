import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  @Input() email: string | undefined;

  constructor(
    private userService: UserService,
    private _snackBar: MatSnackBar
  ) { }

  receiveMail() {
    if (this.email != '') {
      this.userService.getMailWithCredentials(this.email!).subscribe((response) => {
        this.openSnackBar("Mail has been sent with credentials", "Ok");
      }, error => {
        this.openSnackBar("Error, please check the email provided", "Ok")
      })
    } else {
      this.openSnackBar("Enter Username to Receive credentials.", "Ok");
    }
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

  ngOnInit(): void {
  }

}
