import { createSlice } from "@reduxjs/toolkit";
import type { AppThunk } from "../store";
import { type IUser } from "../../../../models";
import { getUser } from "../api";

export interface AuthState {
  user: IUser | null | false;
}

// Initial state for the auth slice
const initialState: AuthState = { user: null };

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
  selectors: {
    selectUser: (state: AuthState) => state.user,
    selectUserStatus: (state: AuthState) => {
      const isLoading = state.user === null;
      const isNotLoggedIn = state.user === false;
      const isLoggedIn = !isLoading && !isNotLoggedIn;
      return { isLoading, isNotLoggedIn, isLoggedIn };
    },
  },
});
export const authReducer = authSlice.reducer;
export const { setUser } = authSlice.actions;
export const { selectUser, selectUserStatus } = authSlice.selectors;

export const fetchCurrentUser = (): AppThunk => async (dispatch) => {
  try {
    const response = await getUser();
    dispatch(setUser(response || false));
  } catch (error) {
    console.error("Error fetching user:", error);
    dispatch(setUser(false));
  }
};
