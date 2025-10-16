import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import userInfoReducer from './slice/usernameSlice';
import rootSaga from './sagas';

const sagaMiddleware = createSagaMiddleware();
export default configureStore({
  reducer: {
    userInfo: userInfoReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['LOGIN_REQUEST']
      },
    }).concat(sagaMiddleware),
});
sagaMiddleware.run(rootSaga);
