import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import { complaintSlice } from './complaints/complaintSlice'
import { requestSlice } from './requests/requestSlice'
import { suggestionSlice } from './suggestions/suggestionSlice'
import { authSlice } from './auth/authSlice'
import { postSlice } from './post/postSlice'
import { followSlice } from './follow/followSlice'
import { contributionsSlice } from './contributions/contributionsSlice'
import { commonSlice } from './common/commonSlice'

const rootReducer = combineReducers({
  complaints: complaintSlice.reducer,
  requests: requestSlice.reducer,
  suggestions: suggestionSlice.reducer,
  auth: authSlice.reducer,
  post: postSlice.reducer,
  follow: followSlice.reducer,
  contribution: contributionsSlice.reducer,
  common: commonSlice.reducer,
})

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth', 'post', 'follow', 'common'],
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          'persist/PERSIST',
          'persist/REHYDRATE',
          'persist/PAUSE',
          'persist/REGISTER',
          'persist/FLUSH',
          'persist/PURGE',
        ],
      },
    }),
})

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch


export const getReduxStoreValues = store.getState
