import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../api/auth.service';

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
      this.authService.login(login, password).subscribe((res) => {
        console.log(res);
      });
    }
    // console.log(this.loginForm.value);
  }

  constructor(private readonly authService: AuthService) {}
}
