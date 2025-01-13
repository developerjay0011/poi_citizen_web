"use client";
import { ProtectedRoutes } from "@/constants/routes";
import { authActions } from "@/redux_store/auth/authSlice";
import { cusDispatch } from "@/redux_store/cusHooks";
import { ShortcutBtn } from "@/utils/ShortcutBtn";
import { FC } from "react";
import { FaEdit } from "react-icons/fa";
import { FaPowerOff, FaUser } from "react-icons/fa6";

interface AdminControlsProps { }

export const AdminControls: FC<AdminControlsProps> = () => {
  const dispatch = cusDispatch();



  return (
    <>
      <aside className="flex flex-col py-5 px-4 w-full bg-white rounded-[10px] shadow-lg gap-4 border">
        <ShortcutBtn
          Icon={FaUser}
          title="view profile"
          route={ProtectedRoutes.userProfile}
        />

        <ShortcutBtn
          Icon={FaEdit}
          title="Edit Profile"
          route={ProtectedRoutes.edit_profile}
        />

        <button onClick={() => { dispatch(authActions.logOut()); window.location.href = '/' }}>
          <ShortcutBtn Icon={FaPowerOff} title="log out" route="/" />
        </button>
      </aside >

    </>
  );
};
