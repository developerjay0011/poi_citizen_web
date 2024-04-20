"use client";
import { FC, useEffect } from "react";
import { LoginForm } from "@/components/login_register/LoginForm";
import { LoginLayout } from "@/layouts/LoginLayout";
// import Notificationpage from "@/utils/firebase/notification";

const LoginPage: FC = () => {
  return (
    <>
      <LoginLayout>
        <LoginForm />
      </LoginLayout>
      {/* <Notificationpage /> */}
    </>
  );
};

export default LoginPage;
