import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  apiUser: null,
};

const apiUserSlice = createSlice({
  name: 'apiUser',
  initialState,
  reducers: {
    setApiUser: (state, action) => {
      state.apiUser = action.payload;
    },
    clearApiUser: (state) => {
      state.apiUser = null;
    },
  },
});

export const { setApiUser, clearApiUser } = apiUserSlice.actions;
export default apiUserSlice.reducer;
