
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface AuthState {
  following: any

}

const init: AuthState = {
  following: []
}

export const followSlice = createSlice({
  name: 'auth',
  initialState: init,
  reducers: {
    Following(state, action: PayloadAction<any | null>) {
      state.following = Array.isArray(action.payload) ? action.payload : []
    },
  },
})

export const followActions = followSlice.actions
