import { configureStore } from '@reduxjs/toolkit'
import usernameReducer from './slice/usernameSlice'

export default configureStore({
  reducer: {
    username: usernameReducer
  }
})