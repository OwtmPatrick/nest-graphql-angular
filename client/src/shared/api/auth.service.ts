import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { shareReplay } from 'rxjs';
import { User } from 'src/entities/user/model';
import { keys as localStorageKeys } from '../model/localStorage';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private readonly http: HttpClient) {}

  getToken(): string | null {
    return localStorage.getItem(localStorageKeys.accessToken) ?? null;
  }

  register(login: string, password: string) {
    return this.http
      .post<{ accessToken: string }>('/auth/register', { login, password })
      .pipe(shareReplay());
  }

  login(login: string, password: string) {
    return this.http
      .post<{ accessToken: string }>('/auth/login', { login, password })
      .pipe(shareReplay());
  }

  me() {
    return this.http.get<User>('/users/me').pipe(shareReplay());
  }
}
