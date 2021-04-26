import { Component, OnInit } from '@angular/core';
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
  ) { }

  ngOnInit(): void {
    if (!history.state.firstName) {
      this.router.navigateByUrl("/register")
    }
    this.loadData();
  }

  loadData() {
    this.state$ = history.state;
  }

  onEdit() {
    history.back();
  }

  onSubmit() {
    this._http.register(this.state$).subscribe(response => {
      alert("Thank You For Registering. You will soon get a mail with Login credentials.")
      this.router.navigateByUrl('')
    },
      error => {
        alert("User with this email is already registered")
        this.router.navigateByUrl('')
      }
    );
  }
}
