import { UserActions, UserUnion } from './actions';
import { keys as localStorageKeys } from 'src/shared/model/localStorage';
import { User } from '../model';

export const initialState = {
  accessToken: localStorage.getItem(localStorageKeys.accessToken) ?? null,
};

export interface State extends Partial<User> {
  accessToken: string | null;
}

export const userReducer = (state: State = initialState, action: UserUnion) => {
  switch (action.type) {
    case UserActions.SetToken:
      return { ...state, accessToken: action.payload };
    case UserActions.ResetToken:
      return { ...state, accessToken: null };
    case UserActions.SetUser:
      return { ...state, ...action.payload };
    case UserActions.ResetUser:
      return { accessToken: null };
    default:
      return state;
  }
};
