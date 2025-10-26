import { postUserLogin } from '../backend/API';
import { put, takeEvery, all, call } from 'redux-saga/effects';
import { setUserInfo } from '../slice/userInfoSlice';

// Hier wird versucht, einzuloggen, und danach
// wird eins der übergegebene Operationen ausgeführt
export function* postLoginSaga(action) {
  try {
    const response = yield call(
      postUserLogin,
      action.payload.email,
      action.payload.password
    );
    yield put(setUserInfo(response));
    action.payload.onSuccess();
  } catch (err) {
    action.payload.onFailure();
  }
}

// Registriert LOGIN_REQUEST als Aktion
export function* registerPostLoginSaga() {
  yield takeEvery('LOGIN_REQUEST', postLoginSaga);
}

// Registriert alle Aktionen
export default function* rootSaga() {
  yield all([registerPostLoginSaga()]);
}
