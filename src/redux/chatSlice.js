import { createSlice } from '@reduxjs/toolkit';

export const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    activeChatID: '',
    activeChatTitle: '',
  },

  reducers: {
    setActiveChat: (state, action) => {
      state.activeChatID = action.payload.id;
      state.activeChatTitle = action.payload.title;
    },
  },
});

export const { setActiveChat } = chatSlice.actions;

export default chatSlice.reducer;
