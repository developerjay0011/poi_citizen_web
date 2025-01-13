"use client";
import { CommonBox } from "@/utils/CommonBox";
import Link from "next/link";
import { FC, ReactNode } from "react";
import { FaFacebook, FaInstagram, FaTwitter, FaAddressCard, FaStar } from "react-icons/fa";
import { IoMdShare } from "react-icons/io";
import { cusSelector } from "@/redux_store/cusHooks";
import { FaSignature } from "react-icons/fa6";
import Image from "next/image";
import { getImageUrl } from "@/config/get-image-url";

interface CitizenMoreInfoProps { }

export const CitizenMoreInfo: FC<CitizenMoreInfoProps> = () => {
  const { userDetails } = cusSelector((st) => st.auth);

  const socialNetworks: (JSX.Element | string)[] = [
    userDetails?.fb_link ? (
      <Link
        target="_blank"
        href={userDetails?.fb_link}
        className=" text-sky-950 text-[1.6rem]"
        key={Math.random()}
      >
        <FaFacebook />
      </Link>
    ) : (
      ""
    ),
    userDetails?.insta_link ? (
      <Link
        target="_blank"
        href={userDetails?.insta_link}
        className=" text-sky-950 text-[1.6rem]"
        key={Math.random()}
      >
        <FaInstagram />
      </Link>
    ) : (
      ""
    ),
    userDetails?.twitter_link ? (
      <Link
        target="_blank"
        href={userDetails?.twitter_link}
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
          <GeneralInfo Icon={FaAddressCard} heading="address">
            <p className="text-[14px] pl-7 text-justify">
              {userDetails?.address}, Pincode : {userDetails?.pincode}
            </p>
          </GeneralInfo>
          <GeneralInfo Icon={FaStar} heading="state">
            <p className="text-[14px] pl-7 text-justify">
              {userDetails?.state_name}
            </p>
          </GeneralInfo>
          <GeneralInfo Icon={FaStar} heading="Pincode">
            <p className="text-[14px] pl-7 text-justify">
              {userDetails?.pincode}
            </p>
          </GeneralInfo>
          <GeneralInfo Icon={FaStar} heading="Assembly Constituency">
            <p className="text-[14px] pl-7 text-justify">
              {userDetails?.assembly_name}
            </p>
          </GeneralInfo>
          <GeneralInfo Icon={FaStar} heading="Parliament Constituency">
            <p className="text-[14px] pl-7 text-justify">
              {userDetails?.parliamentary_name}
            </p>
          </GeneralInfo>
          {userDetails?.signature && <GeneralInfo Icon={FaSignature} heading="Signature">
            <Image
              src={getImageUrl(userDetails?.signature)}
              alt=""
              priority={true}
              width={1000}
              height={1000}
              className="w-20 aspect-square object-cover object-center bg-white"
            />
          </GeneralInfo>}

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
