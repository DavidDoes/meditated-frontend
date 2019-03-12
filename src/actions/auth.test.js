import {
  SET_AUTH_TOKEN,
  setAuthToken,
  CLEAR_AUTH,
  clearAuth,
  AUTH_REQUEST,
  authRequest,
  AUTH_SUCCESS,
  authSuccess,
  AUTH_ERROR,
  authError
} from './auth';

describe('setAuthToken', () => {
  it('Should return the action', () => {
    const token = 'token';
    const action = setAuthToken(token);
    expect(action.type).toEqual(SET_AUTH_TOKEN);
    expect(action.authToken).toEqual(token);
  });
});

describe('clearAuth', () => {
  it('Should return clearAuth action', () => {
    const action = clearAuth();
    expect(action.type).toEqual(CLEAR_AUTH);
  });
});

describe('authRequest', () => {
  it('Should return authRequest action', () => {
    const action = authRequest();
    expect(action.type).toEqual(AUTH_REQUEST);
  });
});

describe('authSuccess', () => {
  it('Should return authSuccess action', () => {
    const user = 'user';
    const action = authSuccess(user);
    expect(action.type).toEqual(AUTH_SUCCESS);
    expect(action.currentUser).toEqual(user);
  });
});

describe('authError', () => {
  it('Should return authError action', () => {
    const err = 'error';
    const action = authError(err);
    expect(action.type).toEqual(AUTH_ERROR);
    expect(action.error).toEqual(err);
  });
});
