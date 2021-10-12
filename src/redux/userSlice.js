import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: '1',
    email: 'none',
    uid: 'none',
  },

  reducers: {
    setUser: (state, action) => {
      state.email = action.payload.email;
      state.uid = action.payload.uid;
    },
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
