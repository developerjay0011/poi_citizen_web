'use client'
import { FC, ReactNode, useEffect } from 'react'
import { Provider } from 'react-redux'
import { store } from '.'
import { cusDispatch } from './cusHooks'
import { useRouter } from 'next/navigation'
import { authActions } from './auth/authSlice'
import { Toaster } from 'react-hot-toast'

interface CusProviderProps {
  children: ReactNode
}
export const CusProvider: FC<CusProviderProps> = ({ children }) => {
  return (
    <Provider store={store}>
      <Toaster position="top-center" />
      <AuthLayer>{children}</AuthLayer>
    </Provider>
  )
}

const AuthLayer: FC<{ children: ReactNode }> = ({ children }) => {
  const dispatch = cusDispatch()
  const router = useRouter()

  useEffect(() => {
    const authToken = localStorage.getItem('authToken') || ''
    const userDetails = (localStorage.getItem('userDetails') as string) || ''
    if (authToken && userDetails) {
      dispatch(authActions.logIn(JSON.parse(userDetails)))
    }
  }, [dispatch, router])

  return children
}
