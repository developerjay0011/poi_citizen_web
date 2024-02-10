import { UserDetails } from '@/utils/typesUtils'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface AuthState {
  userDetails: any
  
}

const init: AuthState = {
  
  userDetails: {},
}

export const authSlice = createSlice({
  name: 'auth',
  initialState: init,
  reducers: {
    logIn(state, action: PayloadAction<UserDetails>) {
      state.userDetails = action.payload
    },
    logOut(state) {
      state.userDetails = null
      localStorage.clear()
    },
  },
})

export const authActions = authSlice.actions
