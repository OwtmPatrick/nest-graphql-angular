import { UserActions, UserUnion } from './actions';

export const initialState = {
  accessToken: localStorage.getItem('accessToken') ?? null,
};

export interface State {
  accessToken: string | null;
}

export const userReducer = (state: State = initialState, action: UserUnion) => {
  switch (action.type) {
    case UserActions.SetToken:
      return { ...state, accessToken: action.payload };
    case UserActions.ResetToken:
      return { ...state, accessToken: null };
    default:
      return state;
  }
};
