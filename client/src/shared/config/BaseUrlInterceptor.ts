import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../api/auth.service';

const BASE_URL = 'http://localhost:3000';

@Injectable()
export class BaseUrlInterceptor implements HttpInterceptor {
  constructor(private readonly authService: AuthService) {}

  intercept<T>(
    request: HttpRequest<T>,
    next: HttpHandler
  ): Observable<HttpEvent<T>> {
    request = request.clone({
      url: `${BASE_URL}${request.url}`,
    });

    const token = this.authService.getToken();

    if (token) {
      request = request.clone({
        setHeaders: { Authorization: `Bearer ${token}` },
      });
    }

    return next.handle(request).pipe(
      catchError((err) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === HttpStatusCode.Unauthorized) {
            // TODO: handle 401
            // redirect user to the logout page
          }
        }
        return throwError(err);
      })
    );
  }
}
