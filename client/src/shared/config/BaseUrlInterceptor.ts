import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';

const BASE_URL = 'http://localhost:3000';

@Injectable()
export class BaseUrlInterceptor implements HttpInterceptor {
  intercept<T>(
    request: HttpRequest<T>,
    next: HttpHandler
  ): Observable<HttpEvent<T>> {
    const apiReq = request.clone({
      url: `${BASE_URL}${request.url}`,
    });

    return next.handle(apiReq);
  }
}
