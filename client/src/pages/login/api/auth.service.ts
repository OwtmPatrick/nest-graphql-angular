import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { shareReplay } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private readonly http: HttpClient) {}

  login(login: string, password: string) {
    return this.http
      .post<any>('/auth/login', { login, password })
      .pipe(shareReplay());
  }
}
