import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/shared/api/auth.service';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { keys as localStorageKeys } from 'src/shared/model/localStorage';
import { SetToken } from 'src/entities/user/state/actions';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisternComponent {
  registerForm = new FormGroup({
    login: new FormControl<string>('', Validators.required),
    password: new FormControl<string>('', Validators.required),
  });

  onSubmit() {
    const { login, password } = this.registerForm.value;

    if (login && password) {
      this.authService
        .register(login, password)
        .subscribe(({ accessToken }) => {
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
