import { createSlice } from '@reduxjs/toolkit';

const initialValue = {
  username: null,
  birthdate: null,
};

export const userInfoSlice = createSlice({
  name: 'userInfo',
  initialState: {
    value: initialValue,
  },
  reducers: {
    setUserInfo: (state, userInfo) => {
      state.value = userInfo;
    },
    removeUserInfo: (state) => {
      state.value = initialValue;
    },
  },
});

export const { setUserInfo, removeUserInfo } = userInfoSlice.actions;

export default userInfoSlice.reducer;
