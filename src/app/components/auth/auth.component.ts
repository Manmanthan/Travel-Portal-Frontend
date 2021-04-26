import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  username: string = '';
  password: string = '';
  invalidLogin = false;

  constructor(
    private router: Router,
    private loginService: AuthService
  ) { }

  checkLogin() {
    if (this.username != "" && this.password != "") {
      (this.loginService.authenticate(this.username, this.password).subscribe(
        data => {
          this.router.navigate(['ticket'])
          this.invalidLogin = false
        },
        error => {
          this.invalidLogin = true
        })
      )
    }
  }

  ngOnInit(): void {
  }

}
