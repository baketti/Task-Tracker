import { createSlice } from "@reduxjs/toolkit";
import * as selectors from "./user.selectors";
import { UserState } from "./user.interfaces";
import * as extraActions from "../../extra-actions";
import * as sagas from "./user.sagas";

const initialState: UserState = {
  me: null,
  isLogged: false,
};

export const userStore = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(extraActions.postSessions.success, (state, action) => {
      state.me = action.payload.data.user;
      state.isLogged = true;
    });
    builder.addCase(extraActions.deleteSessions.success, (state) => {
      state.me = null;
      state.isLogged = false;
    });
  },
});

export { selectors, sagas };
