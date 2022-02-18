import { takeEvery, call, put, all } from 'redux-saga/effects'
import { userService } from '../services/user.service';
import jwt_decode from 'jwt-decode';
import { userConstants } from '../constants/user.constants';

 function* registerSaga(payload) {
  try {
    const response = yield call(userService.register, payload);
    yield [
      put({ type: userConstants.REGISTER_SUCCESS, response })
    ];
  } catch(error) {
    yield put({ type: userConstants.REGISTER_FAILURE, error });
  }
}
   function* loginSaga(payload) {
    try {
      const response = yield call(userService.login, payload);
      yield [
        put({ type: userConstants.SET_USER, decoded: jwt_decode(response) })
      ];
    } catch(error) {
      yield put({ type: userConstants.LOGIN_FAILURE, error });
    }
  }
  function* watchLoginUser() {
    yield takeEvery(userConstants.LOGIN_REQUEST, loginSaga)
  }

  function* watchLogoutUser() {
      yield takeEvery(userConstants.REGISTER_REQUEST, registerSaga)
  }

  export function* AuthSaga() {
    yield all([
        watchLoginUser(),
        watchLogoutUser()
    ])
  }