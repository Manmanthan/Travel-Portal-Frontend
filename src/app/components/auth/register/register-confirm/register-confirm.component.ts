import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register-confirm',
  templateUrl: './register-confirm.component.html',
  styleUrls: ['./register-confirm.component.scss']
})
export class RegisterConfirmComponent implements OnInit {
  state$: any;

  constructor(
    public router: Router,
    private _http: UserService,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    if (!history.state.firstName) {
      this.router.navigateByUrl("/register")
    }
    this.loadData();
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

  loadData() {
    this.state$ = history.state;
  }

  onEdit() {
    history.back();
  }

  onSubmit() {
    this._http.register(this.state$).subscribe(response => {
      this.openSnackBar("Thank You For Registering. You will soon get a mail with Login credentials.", "Ok");
      this.router.navigateByUrl('');
    },
      error => {
        this.openSnackBar("User with this email is already registered", "Ok");
        this.router.navigateByUrl('');
      }
    );
  }
}
