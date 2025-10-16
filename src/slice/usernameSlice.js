import { createSlice } from '@reduxjs/toolkit';

export const userInfoSlice = createSlice({
  name: 'userInfo',
  initialState: {
    value: {
      username: null,
      birthdate: null
    }
  },
  reducers: {
    setUserInfo: (state, userInfo) => {
      state.value = userInfo
    }
  }
});

export const { setUserInfo } = userInfoSlice.actions;

export default userInfoSlice.reducer;
