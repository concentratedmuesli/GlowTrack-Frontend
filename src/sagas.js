import { postUserLogin } from './API';
import { put, takeEvery, all, call } from 'redux-saga/effects';
import { setUserInfo } from './slice/usernameSlice';

export function* postLoginSaga(action) {
  try {
    const response = yield call(
      postUserLogin,
      action.payload.email,
      action.payload.password
    );
    action.payload.onSuccess(response);
    yield put(setUserInfo(response));
  } catch (err) {
    action.payload.onFailure();
  }
}

export function* registerPostLoginSaga() {
  yield takeEvery('LOGIN_REQUEST', postLoginSaga);
}

export default function* rootSaga() {
  yield all([registerPostLoginSaga()]);
}
