import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../../shared/api/auth.service';
import { Store } from '@ngrx/store';
import { SetToken } from 'src/entities/user/state/actions';
import { keys as localStorageKeys } from 'src/shared/model/localStorage';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm = new FormGroup({
    login: new FormControl<string>('', Validators.required),
    password: new FormControl<string>('', Validators.required),
  });

  onSubmit() {
    const { login, password } = this.loginForm.value;

    if (login && password) {
      this.authService.login(login, password).subscribe(({ accessToken }) => {
        localStorage.setItem(localStorageKeys.accessToken, accessToken);
        this.store.dispatch(new SetToken({ accessToken }));
      });
    }
  }

  constructor(
    private readonly authService: AuthService,
    private readonly store: Store<{ user: { accessToken: string | null } }>
  ) {}
}
