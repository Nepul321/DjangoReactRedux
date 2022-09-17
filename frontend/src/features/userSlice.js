import { createSlice } from "@reduxjs/toolkit";


let initialState = {
  userId: null,
  userName: null,
  userEmail: null,
  userFirstName: null,
  userLastName: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setActiveUser: (state, action) => {
      state.userId = action.payload.userId;
      state.userName = action.payload.userName;
      state.userEmail = action.payload.userEmail;
      state.userFirstName = action.payload.userFirstName;
      state.userLastName = action.payload.userLastName;
    },

    setUserLogOutState: (state) => {
      state.userId = null;
      state.userName = null;
      state.userEmail = null;
      state.userFirstName = null;
      state.userLastName = null;
    },
  },
});

export const { setActiveUser, setUserLogOutState } = userSlice.actions;

export const selectUserId = (state) => state.user.userId;
export const selectUserName = (state) => state.user.userName;
export const selectUserEmail = (state) => state.user.userEmail;
export const selectUserFirstName = (state) => state.user.userFirstName;
export const selectUserLastName = (state) => state.user.userLastName;

export default userSlice.reducer;
