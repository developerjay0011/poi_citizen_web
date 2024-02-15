'use client'
import { FC, useEffect } from 'react'
import { LoginForm } from '@/components/login_register/LoginForm'
import { LoginLayout } from '@/layouts/LoginLayout'
import { useRouter } from "next/navigation";

const LoginPage: FC = () => {
  const router = useRouter();
  useEffect(() => {
    var storedUserString = sessionStorage.getItem("user");
    var storedUser = JSON.parse(storedUserString);
    const token = storedUser?.token;
    if (token != null) {
      router.push("/user");
    }
  }, [])
  return (
    <>
      <LoginLayout>
        <LoginForm />
      </LoginLayout>
    </>
  )
}

export default LoginPage
