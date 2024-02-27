/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { FC, useState } from "react";
import Link from "next/link";
import { HiUserAdd } from "react-icons/hi";
import { useForm } from "react-hook-form";
import Image from "next/image";
import Logo from "@/assets/favicon.png";
import { OTPForm } from "../common-forms/OTPForm";
import { AnimatePresence } from "framer-motion";
import { LoginFormFields, RegisterFormFields } from "@/utils/typesUtils";
import { LPInputField } from "@/utils/LPInputField";
import { cusDispatch } from "@/redux_store/cusHooks";
import { MdLock, MdMail, MdPerson, MdPhone } from "react-icons/md";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import {
  CheckCitizenRegExists,
  fetchRegister,
  sendOtp,
  verifyOtp,
} from "@/redux_store/auth/authAPI";
import { AuthRoutes, ProtectedRoutes } from "@/constants/routes";

let interval: NodeJS.Timer;
let OTP_TIME = 120;

export const RegisterForm: FC = () => {
  const router = useRouter();
  const [showOTPForm, setShowOTPForm] = useState(false);
  const [resendOTPTime, setResendOTPTime] = useState(OTP_TIME);
  const [registering, setRegistering] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [registerdata2, setRegisterdata] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
  });
  const openOTPForm = () => setShowOTPForm(true);
  const closeOTPForm = () => {
    clearInterval(interval); // clearing Interval
    setResendOTPTime(OTP_TIME); // resetting time
    setRegistering(false); // stopping registration
    setShowOTPForm(false); // closing OTP form
  };

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    getValues,
  } = useForm<RegisterFormFields | LoginFormFields>({
    mode: "onChange",
    defaultValues: {
      userType: "citizen",
    },
  });

  const resendOTP = async () => {
    try {
      const userData = getValues() as RegisterFormFields;
      setRegistering(true);

      const body = { mobile: userData.phoneNo || "" };

      const sandOtp = await sendOtp(body);
      if (sandOtp?.success) {
        // Starts a OTP resend Timer
        interval = setInterval(() => {
          if (resendOTPTime > 0)
            setResendOTPTime((lst) => {
              if (lst > 0) return lst - 1;
              return 0;
            });
          else {
            setResendOTPTime(OTP_TIME);
            clearInterval(interval);
          }
        }, 1000);
      } else {
        toast.success(sandOtp.message);
      }

      // await dispatch(registerUser({ data: userData }));
    } catch (err) {
      console.error(err);
      setRegistering(false);
    }
  };

  const verifyOTP = async (otp: string) => {
    setVerifying(true);
    const userData = getValues() as RegisterFormFields;
    clearInterval(interval); // clearing resend timer
    setResendOTPTime(OTP_TIME); // Reset OTP time
    try {
      const body = {
        mobile: userData.phoneNo,
        otp: otp,
      };
      const resBody = {
        name: registerdata2?.name,
        email: registerdata2?.email,
        mobile: registerdata2?.mobile,
        password: registerdata2?.password,
      };
      const sandOtp = await verifyOtp(body);
      if (sandOtp?.success) {
        setVerifying(false);
        setRegistering(false);
        const registerData = await fetchRegister(resBody);
        if (registerData?.success) {
          toast.success(registerData.message);
        } else {
          toast.error(registerData.message);
        }
        closeOTPForm();
        router.push(AuthRoutes.login);
      } else {
        toast.success(sandOtp.message);
      }
      setRegistering(false);
    } catch (err) {
      console.error(err);
      setVerifying(false);
    }
  };

  const formSubmitHandler = async (
    data: RegisterFormFields | LoginFormFields
  ) => {
    const resBody = {
      name: data?.fullName,
      email: data?.email,
      mobile: data?.phoneNo,
      password: data?.password,
    };
    setRegisterdata(resBody);
    setRegistering(true);
    try {
      const body = {
        email: data?.email,
        mobile: data?.phoneNo,
      };
      const checkReg = await CheckCitizenRegExists(body);
      if (checkReg?.success == true) {
        const body = { mobile: data?.phoneNo || "" };
        const sandOtp = await sendOtp(body);
        if (sandOtp?.success) {
          setShowOTPForm(true);
          interval = setInterval(() => {
            if (resendOTPTime > 0)
              setResendOTPTime((lst) => {
                if (lst > 0) return lst - 1;
                return 0;
              });
            else {
              setResendOTPTime(OTP_TIME);
              clearInterval(interval);
            }
          }, 1000);
          openOTPForm();
          setRegistering(false);
        } else {
          toast.error(sandOtp.message);
        }
      } else {
        toast.error(checkReg.message);
      }
    } catch (error) {
      console.log(error);
    }
    setRegistering(false);
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(formSubmitHandler)}
        noValidate
        className="text-sky-800 rounded-xl shadow-xl bg-sky-50 flex flex-col items-center py-9 px-7 gap-5 max-[500px]:px-4 font-[500] max-lg:w-full"
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
          <HiUserAdd className="text-6xl" />
          sign up
        </h2>

        <p className="text-center text-sm">
          Sign Up And Connect With The Leaders & Emerging Leaders Around The
          India.
        </p>

        <section className="px-4 w-full max-[500px]:px-0">
          <div className="w-full bg-sky-100 flex flex-col overflow-hidden rounded-lg shadow-md">
            <LPInputField
              iconSize="text-2xl"
              register={register}
              errors={errors}
              id="fullName"
              title="full name"
              type="text"
              validations={{
                required: "Field is required",
                validate: {
                  notAValidFullname(val) {
                    return val.includes(" ") || "Please enter a valid name";
                  },
                },
              }}
              Icon={MdPerson}
            />

            <LPInputField
              iconSize="text-2xl"
              register={register}
              errors={errors}
              id="email"
              title="email"
              type="email"
              validations={{
                required: "Email is required",
                pattern: {
                  value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                  message:
                    "Please enter a valid email EX: something@example.com",
                },
              }}
              Icon={MdMail}
            />

            <LPInputField
              iconSize="text-2xl"
              register={register}
              errors={errors}
              id="phoneNo"
              title="(+91) phone number"
              type="number"
              validations={{
                required: "Field is required",
                validate: {
                  notAValidNo(val) {
                    return (
                      val.toString().length === 10 ||
                      "please enter a valid phone no"
                    );
                  },
                },
              }}
              Icon={MdPhone}
            />

            <LPInputField
              iconSize="text-2xl"
              Icon={MdLock}
              register={register}
              errors={errors}
              id="password"
              title="password"
              type="password"
              validations={{
                required: "Field is required",
                validate: {
                  checkLength(val) {
                    return (
                      val.length >= 8 || "Password must atleast 8 char long"
                    );
                  },
                  checkNum(val) {
                    if (val.split("").some((el: string) => !isNaN(+el)))
                      return true;

                    return "Password should contain atleast one number";
                  },
                  checkSpecialCharacter(val) {
                    const specialChar = `~!@#$%^&*()-_+={}[]|:;"'<>,.`.split(
                      ""
                    );

                    if (
                      val
                        .split("")
                        .some((el: string) => specialChar.includes(el))
                    )
                      return true;

                    return `Password should contain atleast one special character`;
                  },
                },
              }}
            />
          </div>

          <button
            type="submit"
            disabled={!isValid || registering}
            className="py-2 px-6 font-semibold bg-sky-800 text-sky-50 rounded-full mt-8 max-[500px]:ml-3 disabled:cursor-not-allowed disabled:bg-zinc-200 disabled:text-zinc-400"
          >
            {!registering ? "Register" : "Registering..."}
          </button>

          <p className="mt-8">
            Already Registered ?
            <Link
              href={AuthRoutes.login}
              className="underline hover:font-[600]"
            >
              Login
            </Link>
          </p>
        </section>
      </form>

      <AnimatePresence mode="wait">
        {showOTPForm && (
          <OTPForm
            onClose={closeOTPForm}
            phoneNo={getValues("phoneNo")}
            resendOtpTime={resendOTPTime}
            resendOtpFn={resendOTP}
            verifyOTP={verifyOTP}
            verifying={verifying}
          />
        )}
      </AnimatePresence>
    </>
  );
};
