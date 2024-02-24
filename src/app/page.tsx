"use client";
import { FC, useEffect } from "react";
import { LoginForm } from "@/components/login_register/LoginForm";
import { LoginLayout } from "@/layouts/LoginLayout";
import { useRouter } from "next/navigation";
import { ProtectedRoutes } from "@/constants/routes";

const LoginPage: FC = () => {
  const router = useRouter();

  useEffect(() => {
    var storedUserString = sessionStorage.getItem("user");
    if (storedUserString !== null) {
      var storedUser = JSON.parse(storedUserString || "");
      const token = storedUser?.token;
      if (token != null) {
        router.push(ProtectedRoutes.user);
      }
    }
  }, []);

  return (
    <>
      <LoginLayout>
        <LoginForm />
      </LoginLayout>
    </>
  );
};

export default LoginPage;
