import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { deleteCookie, getCookie } from "cookies-next";
import { TOKEN_KEY, USER_INFO } from "@/constants/common";

interface AuthState {
  userDetails: any;
  trendingleader: [];
}
let userDetails: any = getCookie(USER_INFO);
userDetails = userDetails && JSON.parse(userDetails);
const init: AuthState = {
  userDetails: {
    id: userDetails?.id,
  },
  trendingleader: [],
};

export const authSlice = createSlice({
  name: "auth",
  initialState: init,
  reducers: {
    logIn(state, action: PayloadAction<any | null>) {
      state.userDetails = {
        ...state.userDetails,
        ...action.payload,
      };
    },
    Settrendingleader(state, action: PayloadAction<any | null>) {
      state.trendingleader = action.payload;
    },
    logOut(state) {
      state.userDetails = null
      sessionStorage.clear()
    },
  },
});

export const authActions = authSlice.actions;
