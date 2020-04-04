export enum AuthActionKeys {
  STORE_CREDENTIAL = "STORE_CREDENTIALS",
  CLEAR_CREDENTIAL = "CLEAR_CREDENTIAL"
}

export interface StoreCredentialAction {
  type: AuthActionKeys.STORE_CREDENTIAL;
  payload: any;
}

export interface ClearCredentialAction {
  type: AuthActionKeys.CLEAR_CREDENTIAL;
}

export type AuthActions = ClearCredentialAction | StoreCredentialAction;

export function storeCredential(payload: any) {
  return {
    type: AuthActionKeys.STORE_CREDENTIAL,
    payload
  };
}

export function clearCredential() {
  return {
    type: AuthActionKeys.CLEAR_CREDENTIAL
  };
}

export default { clearCredential, storeCredential };
