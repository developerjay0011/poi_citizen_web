import { configureStore } from '@reduxjs/toolkit'
import { complaintSlice } from './complaints/complaintSlice'
import { requestSlice } from './requests/requestSlice'
import { suggestionSlice } from './suggestions/suggestionSlice'
import { authSlice } from './auth/authSlice'

export const store = configureStore({
  reducer: {
    complaints: complaintSlice.reducer,
    requests: requestSlice.reducer,
    suggestions: suggestionSlice.reducer,
    auth: authSlice.reducer,
  },
})

// types to configure custom useSelector and useDispatch hooks for better auto compeletion through TS
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

// to get the redux store data outside of react component
export const getReduxStoreValues = store.getState
