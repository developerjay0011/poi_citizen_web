import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { deleteCookie, getCookie } from "cookies-next";
import { CITIZEN_TOKEN_KEY, CITIZEN_USER_INFO } from "@/constants/common";

interface AuthState {
  userDetails: any;
  trendingleader: any;
  birthdaylist: any[],
  leaderData: any,
  dropdownOptions: {
    assemblies: any[];
    designations: any[];
    districts: any[];
    ministries: any[];
    parliamentries: any[];
    politicalparty: any[];
    states: any[];
    categories: any[];
  }
}

let userDetails: any = getCookie(CITIZEN_USER_INFO);
userDetails = userDetails && JSON.parse(userDetails);
const init: AuthState = {
  userDetails: {
    id: userDetails?.id,
  },
  trendingleader: [],
  birthdaylist: [],
  leaderData: [],
  dropdownOptions: {
    assemblies: [],
    designations: [],
    districts: [],
    ministries: [],
    parliamentries: [],
    politicalparty: [],
    states: [],
    categories:[]
  }
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
    Settrendingleader(state, action) {
      state.trendingleader = action.payload;
    },
    setBirthdayList(state, action: PayloadAction<any | null>) {
      state.birthdaylist = action.payload;
    },
    setLeaderData(state, action: PayloadAction<any | null>) {
      state.leaderData = action.payload;
    },
    setDropDownOption(state, action: PayloadAction<any | null>) {
      state.dropdownOptions = action.payload;
    },
    logOut(state) {
      state.userDetails = null;
      deleteCookie(CITIZEN_TOKEN_KEY);
      deleteCookie(CITIZEN_USER_INFO);
    },
  },
});

export const authActions = authSlice.actions;
