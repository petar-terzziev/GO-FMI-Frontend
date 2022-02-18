import { all } from 'redux-saga/effects'
import {AuthSaga} from './authenticationSaga';
import {forumSaga} from './forumSaga';

export default function* startForman() {
  yield all([AuthSaga(), forumSaga() ]);
}