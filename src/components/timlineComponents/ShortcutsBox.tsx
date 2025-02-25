"use client";
import { CommonBox } from "@/utils/CommonBox";
import { FC, useEffect, useState } from "react";
import { FaBell, FaClipboard, FaPowerOff, FaUser } from "react-icons/fa";
import { ShortcutBtn } from "@/utils/ShortcutBtn";
import { cusDispatch, cusSelector } from "@/redux_store/cusHooks";
import { HiLightBulb } from "react-icons/hi";
import { FaHandshakeAngle } from "react-icons/fa6";
import { BiSolidMessageSquareError } from "react-icons/bi";
import { FiEdit } from "react-icons/fi";
import { IconType } from "react-icons/lib";
import { GenerateId } from "@/utils/utility";
import { authActions } from "@/redux_store/auth/authSlice";
import { ConfirmDialogBox } from "@/utils/ConfirmDialogBox";
import { AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { AuthRoutes, ProtectedRoutes } from "@/constants/routes";
import { CloseAccount, DeactiveAccount } from "@/redux_store/citizen/citizenApi";
import { LogoutUser } from "@/redux_store/auth/authAPI";

interface ShortcutsBoxProps { }

class Shortcut {
  id = GenerateId();
  Icon: IconType;
  title: string;
  route: string;

  constructor(Icon: IconType, title: string, route: string) {
    this.Icon = Icon;
    this.title = title;
    this.route = route;
  }
}

const Shortcuts: Shortcut[] = [
  new Shortcut(FaClipboard, "feed", ProtectedRoutes.user),
  new Shortcut(FaUser, "my profile", ProtectedRoutes.userProfile),
  // new Shortcut(FaBell, 'notifications', `/user/profile/notifications`),
  new Shortcut(
    BiSolidMessageSquareError,
    "complaints",
    ProtectedRoutes.complaints
  ),
  new Shortcut(FiEdit, "requests", ProtectedRoutes.requests),
  new Shortcut(
    FaHandshakeAngle,
    "contributions",
    ProtectedRoutes.contributions
  ),
  new Shortcut(HiLightBulb, "suggestions", ProtectedRoutes.suggestions),
];

interface UserDetail {
  token: string;
  id: string;
}

export const ShortcutsBox: FC<ShortcutsBoxProps> = () => {
  const dispatch = cusDispatch();
  const router = useRouter();
  const [showConfirmBox, setShowConfirmBox] = useState(false);
  const [showCloseConfirmBox, setShowCloseConfirmBox] = useState(false);
  const { userDetails } = cusSelector((st) => st.auth);
  const onClose = () => {
    setShowConfirmBox(false);
    setShowCloseConfirmBox(false);
  };
  const deactiveAccountHandler = async () => {
    const data = await DeactiveAccount(userDetails?.id);
    if (data?.success) {
      setShowConfirmBox(false);
      LogoutUser(dispatch)
      router.push(AuthRoutes.login);
    }
  };
  const CloseAccountHandler = async () => {
    const data = await CloseAccount(userDetails?.id);
    if (data?.success) {
      setShowCloseConfirmBox(false);
      LogoutUser(dispatch)
      router.push(AuthRoutes.login);
    }
  };

  return (
    <CommonBox title="shortcuts">
      <div className="flex flex-col py-4 gap-5 font-normal min-w-[170px]">
        {Shortcuts.map((el) => (
          <ShortcutBtn {...el} key={el.id} />
        ))}
        <button onClick={() => { LogoutUser(dispatch) }}>
          <ShortcutBtn Icon={FaPowerOff} title="logout" route="/" />
        </button>
        <button
          type="button"
          className="flex items-center gap-4 hover:text-orange-600 transition-all text-sky-950"
          onClick={() => setShowConfirmBox(true)}
        >
          <FaPowerOff /> Deactive Account
        </button>

        <button
          type="button"
          className="flex items-center gap-4 hover:text-orange-600 transition-all text-sky-950"
          onClick={() => setShowCloseConfirmBox(true)}
        >
          <FaPowerOff /> Close Account
        </button>
        <AnimatePresence mode="wait">
          {showConfirmBox && (
            <ConfirmDialogBox
              noAllowed={false}
              onCancel={() => {
                setShowConfirmBox(false);
                onClose();
              }}
              onOk={deactiveAccountHandler}
            />
          )}
          {showCloseConfirmBox && (
            <ConfirmDialogBox
              noAllowed={false}
              onCancel={() => {
                setShowCloseConfirmBox(false);
                onClose();
              }}
              onOk={CloseAccountHandler}
            />
          )}
        </AnimatePresence>
      </div>
    </CommonBox>
  );
};
