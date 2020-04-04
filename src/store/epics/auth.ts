import { Epic, combineEpics } from "redux-observable";
import { AuthActions, AuthActionKeys } from "../actions/auth";
import { AuthState } from "../reducers/auth";
import { tap, ignoreElements } from "rxjs/operators";
import { connectSocketSubject } from "src/services/socket";
export const loginSideEffect: Epic<AuthActions, AuthActions, AuthState, any> = (
  action$,
  state$
) =>
  action$.ofType(AuthActionKeys.STORE_CREDENTIAL).pipe(
    tap(() => connectSocketSubject.next(1)),
    ignoreElements()
  );
export default combineEpics(loginSideEffect);
