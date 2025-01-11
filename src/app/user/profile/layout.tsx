"use client";
import { CitizenProfileNavbar } from "@/components/citizen/CitizenProfileNavbar";
import { ProtectedRoutes } from "@/constants/routes";
import { cusDispatch, cusSelector } from "@/redux_store/cusHooks";
import Link from "next/link";
import { BsPencilSquare } from "react-icons/bs";
import { ReactNode, FC, ChangeEvent } from "react";
import { getProfile, uploadProfileImage } from "@/redux_store/auth/authAPI";
import { authActions } from "@/redux_store/auth/authSlice";
import toast from "react-hot-toast";
import { getImageUrl } from "@/config/get-image-url";
import CustomImage from "@/utils/CustomImage";

const CitizenProfileLayout: FC<{ children: ReactNode }> = ({ children }) => {
  const { userDetails } = cusSelector((st) => st.auth);
  const dispatch = cusDispatch();

  const onChangeHandler = async (e: ChangeEvent<HTMLInputElement>, fieldName: string) => {
    const files = e.target.files as FileList;
    if (files.length > 0) {
      const formData = new FormData();
      formData.append("citizenid", userDetails?.id || "");
      formData.append(fieldName, files[0] || "");
      const profileRes = await uploadProfileImage(formData);
      if (profileRes?.success) {
        const res = await getProfile(userDetails?.id, dispatch);
        dispatch(authActions.logIn(res));
      } else {
        toast.error(profileRes?.message);
      }
    }
  };

  return (
    <div className="flex flex-col gap-5">
      <section className="flex flex-col text-sky-950 border-b border-l border-r w-full">
        {/* USER PIC and BG pic*/}
        <figure className="relative rounded-tr-lg rounded-tl-lg overflow-hidden">
          <CustomImage
            src={getImageUrl(userDetails?.bgimage) as string}
            alt="bg image"
            width={1000}
            height={1000}
            className="w-full h-[25rem] object-cover object-center max-[750px]:h-[16rem]"
          />
          <label htmlFor="bgimage" className="cursor-pointer">
            <input
              type="file"
              className="hidden"
              id="bgimage"
              multiple
              onChange={(e) => onChangeHandler(e, "bgimage")}
            />
            <BsPencilSquare className="absolute top-3 right-3 z-10 text-orange-500 text-[25px] shadow" />
          </label>
          <CustomImage
            src={getImageUrl(userDetails?.image)}
            alt="display image"
            width={1000}
            height={1000}
            className="w-[9rem] border-4 aspect-square object-cover object-center rounded-full shadow-lg absolute bottom-5 left-8 max-[750px]:w-[7.5rem] max-[750px]:border-2 max-[450px]:left-1/2 max-[450px]:translate-x-[-50%]"
          />
          <label
            htmlFor="image"
            className="hover:opacity-100 hover:text-orange-500 hover:bg-opacity-70 hover:bg-white text-transparent transition-all cursor-pointer absolute aspect-square border-4 bottom-5 flex items-center justify-center left-8 max-[450px]:left-1/2 max-[450px]:translate-x-[-50%] max-[750px]:border-2 max-[750px]:w-[7.5rem] object-center object-cover rounded-full shadow-lg w-[9rem]"
          >
            <input
              type="file"
              className="hidden"
              id="image"
              multiple
              onChange={(e) => onChangeHandler(e, "image")}
            />
            <BsPencilSquare className="text-[25px] shadow" />
          </label>
        </figure>

        <div className="bg-white py-5 px-14 flex items-center max-[1428px]:px-5 max-[1302px]:flex-wrap max-[950px]:gap-5 max-[450px]:flex-nowrap max-[450px]:flex-col">
          <Link href={ProtectedRoutes.userProfile}>
            <h5 className="flex flex-col items-center text-xl font-[600] capitalize">
              {userDetails?.username}
            </h5>
          </Link>

          {/* User Nav */}
          <CitizenProfileNavbar />
        </div>
      </section>

      {/* Data will get rendered acc. to route clicked */}
      <section className="w-full">{children}</section>
    </div>
  );
};

export default CitizenProfileLayout;
