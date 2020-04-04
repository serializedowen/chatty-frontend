import { AuthActionKeys, AuthActions } from "src/store/actions/auth";

export interface AuthState {
  credential: any;
}

const intialState = {
  credential: null
};

export default function auth(
  state: AuthState = intialState,
  action: AuthActions
) {
  switch (action.type) {
    case AuthActionKeys.STORE_CREDENTIAL:
      state.credential = action.payload;
      return state;
    case AuthActionKeys.CLEAR_CREDENTIAL:
      state.credential = null;
      return state;
    default:
      return state;
  }
}
