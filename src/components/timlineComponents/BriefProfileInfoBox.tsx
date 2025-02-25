"use client";
import { FC, useState } from "react";
import { CommonBox } from "@/utils/CommonBox";
import { CountBubble } from "@/utils/CountBubble";
import Image from "next/image";
import { FaMessage, FaBell, FaHeart, FaEye } from "react-icons/fa6";
import Link from "next/link";
import { cusSelector } from "@/redux_store/cusHooks";
import { ProtectedRoutes } from "@/constants/routes";
import NoImg from "@/assets/No_image_available.png";
import { getImageUrl } from "@/config/get-image-url";
import CustomImage from "@/utils/CustomImage";

interface BriefProfileInfoBoxProps { }

export const BriefProfileInfoBox: FC<BriefProfileInfoBoxProps> = () => {
  const { userDetails } = cusSelector((st) => st.auth);


  return (
    <>
      <CommonBox title="profile" width="sticky top-0 right-0">
        {/* Profile info and pic */}
        <section className="flex items-center my-5 gap-3 text-sky-950 max-[1400px]:gap-2">
          <CustomImage
            src={getImageUrl(userDetails?.image)}
            alt="profile pic"
            width={50}
            height={50}
            className="w-[4rem] rounded-full aspect-square object-cover object-center max-[1400px]:w-[4.5rem] max-[1300px]:w-[4rem]"
          />

          <div className="flex flex-col gap-1">
            <Link
              href={ProtectedRoutes.userProfile}
              className="text-md font-[600] max-[1300px]:text-[1.05rem] hover:text-orange-500 transition-all capitalize"
            >
              {userDetails?.username}
            </Link>

            {/* <div className="flex items-center gap-1 text-[13px] font-[500]">
              <FaMessage /> <p className="capitalize">messages</p>{" "}
              <CountBubble
                bgColor="bg-red-500"
                textColor="text-white"
                count={2}
              />
            </div>

            <div className="flex items-center gap-1 text-[13px] font-[500]">
              <FaBell /> <p className="capitalize">notifications</p>{" "}
              <CountBubble
                bgColor="bg-blue-500"
                textColor="text-white"
                count={0}
              />
            </div> */}
          </div>
        </section>

        {/* Interactions */}
        {/* <div className="py-4 my-5">
          <div className="flex items-center gap-1">
            <button
              type="button"
              className={`text-[13px]  px-3 font-[500] py-[.4rem] rounded-full capitalize flex-1 ${showLikes
                ? " bg-orange-500 text-orange-50 "
                : "text-orange-500 bg-orange-100"
                }`}
              onClick={showLike}
            >
              likes
            </button>

            <button
              type="button"
              onClick={hideLike}
              className={`text-[13px] px-3  font-[500] py-[.4rem] rounded-full capitalize flex-1 ${!showLikes
                ? " bg-orange-500 text-orange-50 "
                : "text-orange-500 bg-orange-100"
                }`}
            >
              comments
            </button>
          </div>

          <div className="flex flex-col gap-1 items-center mt-5 text-sky-950">
            <div className="flex gap-3 items-center text-2xl">
              {showLikes && <FaHeart />}
              {!showLikes && <FaEye />}
              <p>0</p>
            </div>
            <p className="text-[13px] text-orange-600 capitalize">
              0 new {showLikes ? "likes" : "comments"} this week
            </p>
          </div>
        </div> */}
      </CommonBox>
    </>
  );
};
