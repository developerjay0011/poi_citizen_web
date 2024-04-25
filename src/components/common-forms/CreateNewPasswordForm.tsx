"use client";
import { FC, FormEvent, useEffect, useState } from "react";
import { motion as m } from "framer-motion";
import { fetchForgotPassword } from "@/redux_store/auth/authAPI";
import toast from "react-hot-toast";

interface CreateNewPasswordFormProps {
  proceedFn: () => void;
  number: string;
}

export const CreateNewPasswordForm: FC<CreateNewPasswordFormProps> = ({
  proceedFn,
  number,
}) => {
  const [pass1, setPass1] = useState("");
  const [pass2, setPass2] = useState("");
  const [registering, setRegistering] = useState(false);


  const Password = () => {
    const specialChar = `~!@#$%^&*()-_+={}[]|:;"'<>,.`.split("");
    if (pass1.length < 8) {
      toast.success("Password must atleast 8 char long");
      return false
    }
    if (!pass1.split("").some((el: string) => !isNaN(+el))) {
      toast.success("Password should contain atleast one number");
      return false
    }
    if (!pass1.split("").some((el: string) => specialChar.includes(el))) {
      toast.success(`Password should contain atleast one special character`);
      return false
    }
    return true
  }



  const newPasswordSubmitHandler = async (e: FormEvent) => {
    e.preventDefault();
    const body = {
      email: number,
      password: pass1,
    };
    if (pass1 != pass2) {
      toast.error("Please check both password");
      return;
    }
    if (Password()) {
      setRegistering(true);
      const sandOtp = await fetchForgotPassword(body);
      setRegistering(false);
      if (sandOtp?.success) {
        toast.success(sandOtp.message);
        proceedFn();
      } else {
        toast.error(sandOtp.message);
      }
    }
  };

  return (
    <>
      <m.form
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="flex flex-col gap-5 w-full"
        onSubmit={newPasswordSubmitHandler}
      >
        <label htmlFor="userId" className="flex flex-col gap-2">
          <span className="max-[500px]:text-[14px]">Create New password</span>

          <input
            value={pass1}
            onChange={(e) => setPass1(e.target.value)}
            type="password"
            className="bg-sky-100 border border-sky-400 py-2 px-3 w-full rounded-md outline-none text-sky-600"
          />
        </label>

        <label htmlFor="userId" className="flex flex-col gap-2">
          <span className="max-[500px]:text-[14px]">Confirm New password</span>
          <input
            value={pass2}
            onChange={(e) => setPass2(e.target.value)}
            type="password"
            className="bg-sky-100 border border-sky-400 py-2 px-3 w-full rounded-md outline-none text-sky-600"
          />
        </label>

        <div className="flex items-center self-center gap-2 mt-4">
          <button
            type="submit"
            disabled={registering}
            className="bg-sky-800 text-sky-50 py-2 px-5 rounded-full capitalize"
          >
            {registering ? "submit.." : "submit"}
          </button>
        </div>
      </m.form>
    </>
  );
};
