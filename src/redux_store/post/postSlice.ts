import { UserDetails } from "@/utils/typesUtils";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PostState {
  allPosts: any;
}

const init: PostState = {
  allPosts: [],
};

export const postSlice = createSlice({
  name: "post",
  initialState: init,
  reducers: {
    setPost(state, action: PayloadAction<UserDetails>) {
      state.allPosts = action.payload;
    },
  },
});

export const postActions = postSlice.actions;
