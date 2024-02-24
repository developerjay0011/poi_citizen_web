"use client";
import { CommonBox } from "@/utils/CommonBox";
import Link from "next/link";
import { FC, ReactNode, useEffect, useState } from "react";
import { FaFacebook, FaInstagram, FaRedhat, FaTwitter } from "react-icons/fa";
import { IoMdShare } from "react-icons/io";
import { cusSelector } from "@/redux_store/cusHooks";

interface CitizenMoreInfoProps {}
interface UserDetail {
  token: string;
  id: string;
}

interface UserDetails {
  firstname: string;
  email: string;
  phoneNo: string;
  gender: string;
  dob: string;
  bloodGroup: string;
  higherEducation: string;
  country: string;
  socialMedia: {
    facebook: string;
    instagram: string;
    twitter: string;
  };
  about: string;
}

export const CitizenMoreInfo: FC<CitizenMoreInfoProps> = () => {
  const { userDetails } = cusSelector((st) => st.auth);

  const socialNetworks: (JSX.Element | string)[] = [
    userDetails?.socialMedia?.facebook ? (
      <Link
        target="_blank"
        href={userDetails.socialMedia.facebook}
        className=" text-sky-950 text-[1.6rem]"
        key={Math.random()}
      >
        <FaFacebook />
      </Link>
    ) : (
      ""
    ),
    userDetails?.socialMedia?.instagram ? (
      <Link
        target="_blank"
        href={userDetails.socialMedia.instagram}
        className=" text-sky-950 text-[1.6rem]"
        key={Math.random()}
      >
        <FaInstagram />
      </Link>
    ) : (
      ""
    ),
    userDetails?.socialMedia?.twitter ? (
      <Link
        target="_blank"
        href={userDetails.socialMedia.twitter}
        className=" text-sky-950 text-[1.6rem]"
        key={Math.random()}
      >
        <FaTwitter />
      </Link>
    ) : (
      ""
    ),
  ];

  const hasSocialLinks = socialNetworks.some((el) => typeof el !== "string");

  return (
    <>
      <CommonBox title="More info">
        <div className="grid grid-cols-2 py-5 gap-y-5 max-[550px]:grid-cols-1">
          <GeneralInfo Icon={FaRedhat} heading="education">
            <p className="text-[14px] pl-7 text-justify">
              {userDetails?.higherEducation}
            </p>
          </GeneralInfo>

          {hasSocialLinks && (
            <GeneralInfo Icon={IoMdShare} heading="social networks">
              <div className="flex gap-3 mt-2 items-center pl-6">
                {socialNetworks}
              </div>
            </GeneralInfo>
          )}
        </div>
      </CommonBox>
    </>
  );
};

const GeneralInfo: FC<{
  Icon: JSX.ElementType;
  heading: string;
  children: ReactNode;
}> = ({ Icon, children, heading }) => {
  return (
    <>
      <article className="flex flex-col gap-1">
        <h5 className="flex items-center gap-3">
          <Icon className="text-[1rem]" />

          <span className="font-[500] capitalize text-[15px]">{heading}</span>
        </h5>

        {children}
      </article>
    </>
  );
};
