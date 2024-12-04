import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthService } from 'src/shared/api/auth.service';
import { SetUser } from 'src/entities/user/state/actions';
import { User } from 'src/entities/user/model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  ngOnInit(): void {
    this.store.subscribe(({ user: { accessToken } }) => {
      if (accessToken) {
        this.authService.me().subscribe((user) => {
          this.store.dispatch(new SetUser(user));
        });
      }
    });
  }

  constructor(
    private readonly store: Store<{
      user: User & { accessToken: string | null };
    }>,
    private readonly authService: AuthService
  ) {}
}
