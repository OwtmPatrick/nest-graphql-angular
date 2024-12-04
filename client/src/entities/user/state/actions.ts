import { Action } from '@ngrx/store';

export enum UserActions {
  SetToken = '[User Component] SetToken',
  ResetToken = '[User Component] ResetToken',
}

export class SetToken implements Action {
  readonly type = UserActions.SetToken;

  constructor(public payload: { accessToken: string }) {}
}

export class ResetToken implements Action {
  readonly type = UserActions.ResetToken;

  constructor() {}
}

export type UserUnion = SetToken | ResetToken;
