import { takeLatest } from 'redux-saga/effects';
import { loginSaga } from './authenticationSaga';
import { registerSaga } from './authenticationSaga';

import { userConstants } from '../constants/user.constants';


export function* watchUserRegister() {
  yield takeLatest(userConstants.REGISTER_REQUEST, registerSaga);
}

export function* watchUserLogin() {
  yield takeLatest(userConstants.LOGIN_REQUEST, loginSaga);
}