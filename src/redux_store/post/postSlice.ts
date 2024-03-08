import { UserDetails } from "@/utils/typesUtils";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PostState {
  allPosts: any;
  stories: any,
}

const init: PostState = {
  allPosts: [],
  stories: [],
};

export const postSlice = createSlice({
  name: "post",
  initialState: init,
  reducers: {
    setPost(state, action: any) {
      state.allPosts = action.payload;
    },
    storeStories(state, action: any) {
      state.stories = action.payload
    },
  },
});

export const postActions = postSlice.actions;
