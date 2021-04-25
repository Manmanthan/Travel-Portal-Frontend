import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  _baseURL = environment.domain;

  constructor(
    private httpClient: HttpClient
  ) { }

  authenticate(username: any, password: any) {
    return this.httpClient.post<any>(`${this._baseURL}/authenticate`, { username, password }).pipe(
      map(
        userData => {
          sessionStorage.setItem('username', username);
          let tokenStr = 'Bearer ' + userData.token;
          sessionStorage.setItem('token', tokenStr);
          return userData;
        }
      )

    );
  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem('username');
    let token = sessionStorage.getItem('token')
    return !(token === null);
  }

  isEmployee() {
    return !(sessionStorage.getItem('username')?.localeCompare("admin@nagarro.com") == 0);
  }

  logOut() {
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('token');
  }
}
