import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { TokenService } from '../services/token.service';


@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {
  constructor(
    private router: Router,
    private tokenService: TokenService
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = this.tokenService.currentUser?.token;

    if (token) {
      request = request.clone({
        setHeaders: { Authorization: token },
      });
    }
    return next.handle(request).pipe(
      catchError(err => {
        this.handleAuthError(err);
        return throwError(err);
      })
    );
  }

  private handleAuthError(err: HttpErrorResponse): Observable<any> {
    if (err.status === 401) {
      this.tokenService.removeUser();
      location.reload();
      return of(err.message);
    }

    return of(err);
  }
}
