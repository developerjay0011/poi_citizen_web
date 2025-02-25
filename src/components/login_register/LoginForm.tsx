"use client";
import { FC, useState } from "react";
import { BiUser } from "react-icons/bi";
import { LuLock } from "react-icons/lu";
import { AiOutlineKey } from "react-icons/ai";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Logo from "@/assets/favicon.png";
import { useForm } from "react-hook-form";
import {
  ErrObj,
  LoginFormFields,
  RegisterFormFields,
} from "@/utils/typesUtils";
import { LPInputField } from "@/utils/LPInputField";
import { cusDispatch } from "@/redux_store/cusHooks";
import { ForgetPassword } from "../common-forms/ForgetPasswordForm";
import { AnimatePresence } from "framer-motion";
import { authActions } from "@/redux_store/auth/authSlice";
import { fetchLogin } from "@/redux_store/auth/authAPI";
import { setCookie, getCookie } from "cookies-next";
import { CITIZEN_FCM_TOKEN_KEY, CITIZEN_IP, CITIZEN_TOKEN_KEY, CITIZEN_USER_INFO } from "@/constants/common";
import { AuthRoutes, ProtectedRoutes } from "@/constants/routes";
import toast from "react-hot-toast";

interface ForgetPassword {
  onClose: () => void;
}
interface LoginFormProps { }
export const LoginForm: FC<LoginFormProps> = () => {
  const router = useRouter();
  const [loggingIn, setLoggingIn] = useState(false);
  const dispatch = cusDispatch();

  const [showForgetPassForm, setShowForgetPassForm] = useState(false);
  const [err, setErr] = useState<ErrObj>({ isErr: false, errTxt: "" });

  const openModal = () => setShowForgetPassForm(true);
  const closeModal = () => setShowForgetPassForm(false);

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm<LoginFormFields | RegisterFormFields>({
    defaultValues: {
      remember: true,
    },
    mode: "onTouched",
  });

  const formSubmitHandler = async (data: LoginFormFields | RegisterFormFields) => {
    var fcm = getCookie(CITIZEN_FCM_TOKEN_KEY) || ""
    var ip = getCookie(CITIZEN_IP) || ""
    const resBody = {
      email: data?.userId,
      password: data?.password,
      fcm_token: {
        deviceid: ip,
        token: fcm ? JSON.parse(fcm) : "",
      },
    };

    setLoggingIn(true);
    try {
      const loginData = await fetchLogin(resBody);
      if (loginData?.data) {
        await dispatch(authActions.logIn(loginData?.data));
        sessionStorage.setItem("user", JSON.stringify(loginData?.data));
        const serializedData = JSON.stringify({ ...loginData?.data, fcm_tokens: "" })
        await setCookie(CITIZEN_USER_INFO, serializedData);
        await setCookie("userData", serializedData);
        await setCookie(CITIZEN_TOKEN_KEY, loginData?.token);
        router.push(ProtectedRoutes.user);
        toast.success(loginData.message);
      } else {
        setErr({ errTxt: loginData?.message, isErr: true });
      }
      setLoggingIn(false);
    } catch (error) {
      console.log(error);
      setLoggingIn(false);
    }
  };



  return (
    <>
      <form
        onSubmit={handleSubmit(formSubmitHandler)}
        noValidate
        className="text-sky-800 rounded-xl shadow-xl bg-sky-50 flex flex-col items-center  py-9 px-7 gap-5 font-[500] max-[500px]:px-4 max-lg:w-full"
      >
        {/* For Screens less than 1090px */}
        <Image
          priority={true}
          src={Logo}
          alt="poi logo"
          className="hidden w-auto self-start m-auto max-lg:block h-[10rem]"
        />

        <h3 className="hidden capitalize text-[2rem] font-[300] mt-4 max-lg:text-center max-lg:block">
          Welcome to the Politician of India
        </h3>

        {/* ----------------------------- */}

        <h2 className="uppercase font-[200] text-6xl flex flex-col items-center gap-2 max-lg:hidden">
          <AiOutlineKey className="text-5xl" />
          Login
        </h2>

        <p className="text-center text-sm">
          Sign In And Connect With The Leaders & Emerging Leaders Around The
          India.
        </p>

        {err.isErr && <span className="text-red-500"> {err.errTxt}</span>}

        <section className="px-4 w-full mt-5 max-[500px]:px-0">
          <div className="w-full bg-sky-100 flex flex-col overflow-hidden rounded-lg shadow-md">
            <LPInputField
              iconSize="text-3xl"
              register={register}
              Icon={BiUser}
              errors={errors}
              id="userId"
              title="email / phone no"
              type="text"
              validations={{ required: "please enter email / password" }}
            />

            <LPInputField
              iconSize="text-3xl"
              register={register}
              Icon={LuLock}
              errors={errors}
              id="password"
              title="password"
              type="password"
              validations={{ required: "please enter a password" }}
            />
          </div>

          {/* Rember and forget password */}
          <div className="flex justify-between w-full mt-8 max-[500px]:flex-col max-[500px]:gap-6 max-[500px]:items-start  max-[500px]:px-3">
            <label
              htmlFor="remember"
              className="flex gap-2 items-center cursor-pointer"
            >
              <input
                type="checkbox"
                id="remember"
                className="hidden checkbox"
                {...register("remember")}
              />
              <span className="select-none w-5 aspect-square rounded-full inline-block relative border-sky-800 border-[4px] cursor-pointer after:bg-sky-800 after:w-[65%] after:aspect-square after:absolute after:top-1/2 after:left-1/2 after:translate-x-[-50%] after:translate-y-[-50%] after:rounded-full after:opacity-0" />
              <span>Remember me</span>
            </label>

            <button type="button" onClick={openModal} className="underline">
              Forget Password?
            </button>
          </div>

          <button
            type="submit"
            disabled={!isValid || loggingIn}
            className="py-2 px-6 font-semibold bg-sky-800 text-sky-50 rounded-full mt-8 max-[500px]:ml-3 disabled:cursor-not-allowed disabled:bg-zinc-200 disabled:text-zinc-400"
          >
            {loggingIn ? "Logging.." : "Login"}
          </button>

          <p className="mt-5 max-[500px]:ml-3">
            Dont have an account?
            <Link
              href={AuthRoutes.register}
              className="underline hover:font-[600]"
            >
              Register with us
            </Link>
          </p>
        </section>
      </form>

      <AnimatePresence mode="wait">
        {showForgetPassForm && <ForgetPassword onClose={closeModal} />}
      </AnimatePresence>
    </>
  );
};
