import { createSlice } from '@reduxjs/toolkit';

export const usernameSlice = createSlice({
  name: 'username',
  initialState: {
    value: null,
  },
  reducers: {
    setUsername: (state, username) => {
      state.value = username
    }
  }
});

export const { setUsername } = usernameSlice.actions;

export default usernameSlice.reducer;
