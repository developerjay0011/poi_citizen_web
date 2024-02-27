'use client'
import { RegisterForm } from '@/components/login_register/RegisterForm'
import { LoginLayout } from '@/layouts/LoginLayout'

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
