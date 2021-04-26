import { Component, Input, OnInit } from '@angular/core';
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
  ) { }

  receiveMail() {
    if (this.email != '') {
      this.userService.getMailWithCredentials(this.email!).subscribe((response) => {
        alert("Mail has been sent with credentials")
      })
    } else {
      alert("Enter Username to Receive credentials.")
    }
  }

  ngOnInit(): void {
  }

}
