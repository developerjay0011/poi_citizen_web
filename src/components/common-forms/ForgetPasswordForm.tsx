"use client";
import { FC, useState } from "react";
import { AnimatePresence, motion as m } from "framer-motion";
import Image from "next/image";
import Logo from "@/assets/favicon.png";
import { ForgetUserIdField } from "../forgetPassword/ForgetUserIdField";
import { ForgetOTPForm } from "./ForgetOTPForm";
import { BiX } from "react-icons/bi";
import { CreateNewPasswordForm } from "./CreateNewPasswordForm";

interface ForgetPasswordProps {
  onClose: () => void;
}

export const ForgetPassword: FC<ForgetPasswordProps> = ({ onClose }) => {
  const [curFormPos, setCurFormPos] = useState(1);
  const [userINP, setUserINP] = useState("");

  return (
    <>
      <m.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ ease: "easeOut" }}
        className="w-full h-[100dvh] fixed top-0 left-0 otp_modal"
      >
        <m.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ ease: "easeOut" }}
          className="z-20 w-full h-full bg-sky-950 bg-opacity-40 backdrop-blur-[4px] absolute top-0 left-0"
        />

        <m.div
          initial={{ rotateX: 80 }}
          animate={{ rotateX: 0 }}
          exit={{ rotateX: -80 }}
          transition={{ ease: "easeOut" }}
          className="bg-sky-50 origin-top rounded-md shadow-md z-30 relative m-auto px-10 py-8 flex flex-col items-center gap-10 mt-10 w-1/3 max-[1400px]:w-1/2 max-[900px]:w-[70%] max-[600px]:w-[80%] max-[500px]:w-[95%] max-[500px]:px-5 max-[500px]:mt-2"
        >
          <button onClick={onClose} className="absolute top-5 right-5">
            <BiX className="text-3xl" />
          </button>
          <Image priority={true} src={Logo} alt="poi logo" className="w-auto h-[8rem]" />
          <AnimatePresence mode="wait">
            {curFormPos === 1 && (
              <ForgetUserIdField
                setUserINP={(data) => { setUserINP(data); }}
                userINP={userINP}
                proceedFn={() => setCurFormPos(2)}
              />
            )}
            {curFormPos === 2 && (
              <ForgetOTPForm
                proceedFn={() => {
                  setCurFormPos(3);
                }}
                number={userINP}
              />
            )}
            {curFormPos === 3 && (
              <CreateNewPasswordForm
                number={userINP}
                proceedFn={() => {
                  setCurFormPos(4);
                  onClose();
                }}
              />
            )}
          </AnimatePresence>
        </m.div>
      </m.div>
    </>
  );
};
