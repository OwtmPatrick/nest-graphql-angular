import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import {
  HttpErrorResponse,
  HttpStatusCode,
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../api/auth.service';
import { ResetUser } from 'src/entities/user/state/actions';

const BASE_URL = 'http://localhost:3000';

@Injectable()
export class BaseUrlInterceptor implements HttpInterceptor {
  constructor(
    private readonly authService: AuthService,
    private readonly store: Store,
    private readonly router: Router
  ) {}

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
            this.store.dispatch(new ResetUser());
            this.router.navigate(['/']);
          }
        }
        return throwError(err);
      })
    );
  }
}
