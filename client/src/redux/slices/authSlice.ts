import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userData: null,
  isAuthenticated: false,
  error: null,
};

const authSlice = createSlice({
  name: "Auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.userData = action.payload;
      state.isAuthenticated = true;
    },
  },
});

export const { setUser } = authSlice.actions;

export default authSlice.reducer;
