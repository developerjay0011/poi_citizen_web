"use client";
import { FC, useEffect } from "react";
import { LoginForm } from "@/components/login_register/LoginForm";
import { LoginLayout } from "@/layouts/LoginLayout";

const LoginPage: FC = () => {
  return (
    <>
      <LoginLayout>
        <LoginForm />
      </LoginLayout>
    </>
  );
};

export default LoginPage;
