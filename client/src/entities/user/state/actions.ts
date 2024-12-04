import { Action } from '@ngrx/store';
import { User } from '../model';

export enum UserActions {
  SetToken = '[User Component] SetToken',
  ResetToken = '[User Component] ResetToken',
  SetUser = '[User Component] SetUser',
  ResetUser = '[User Component] ResetUser',
}

export class SetToken implements Action {
  readonly type = UserActions.SetToken;

  constructor(public payload: { accessToken: string }) {}
}

export class ResetToken implements Action {
  readonly type = UserActions.ResetToken;

  constructor() {}
}

export class SetUser implements Action {
  readonly type = UserActions.SetUser;

  constructor(public payload: User) {}
}

export class ResetUser implements Action {
  readonly type = UserActions.ResetUser;

  constructor() {}
}

export type UserUnion = SetToken | ResetToken | SetUser | ResetUser;
