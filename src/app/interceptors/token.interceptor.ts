import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(
    private router: Router
  ) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (sessionStorage.getItem('username') && sessionStorage.getItem('token')) {
      request = request.clone({
        setHeaders: {
          Authorization: sessionStorage.getItem('token') || '{}'
        }
      })
    }

    return next.handle(request).pipe(tap(
      (err: any) => {
        if (err instanceof HttpErrorResponse) {
          console.log(err);
          if (err.status === 401) {
            console.log("Session has expired.")
            this.router.navigate(['']);
          }
        }
      }
    ));
  }
}
