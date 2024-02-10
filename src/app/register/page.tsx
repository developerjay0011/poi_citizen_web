'use client'
import { RegisterForm } from '@/components/login_register/RegisterForm'
import { LoginLayout } from '@/layouts/LoginLayout'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'POI | Sign Up as Citizen',
  description:
    'Create an account on POI to connect with leader and emerging leaders in India',
}

const RegisterPage = () => {
  return (
    <>
      <LoginLayout>
        <RegisterForm />
      </LoginLayout>
    </>
  )
}

export default RegisterPage
