'use client'
import { FC } from 'react'
import { LoginForm } from '@/components/login_register/LoginForm'
import { LoginLayout } from '@/layouts/LoginLayout'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'POI | Citizens Login',
  description: 'Explore Politician of india by logging in your account',
}

const LoginPage: FC = () => {
  return (
    <>
      <LoginLayout>
        <LoginForm />
      </LoginLayout>
    </>
  )
}

export default LoginPage
