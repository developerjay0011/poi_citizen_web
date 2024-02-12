"use client";
import { CommonBox } from "@/utils/CommonBox";
import Link from "next/link";
import { FC, ReactNode, useEffect, useState } from "react";
import { FaFacebook, FaInstagram, FaRedhat, FaTwitter } from "react-icons/fa";
import { IoMdShare } from "react-icons/io";
import { cusSelector } from "@/redux_store/cusHooks";
import { fetchGetSingleCitizen } from "../api/profile";

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
  const [userDetails, setUserDetails] = useState<UserDetails | undefined>();
  const [userData, setUserData] = useState<UserDetail>({
    token: "",
    id: "",
  });

  useEffect(() => {
    var storedUserString = sessionStorage.getItem("user");
    if (storedUserString !== null) {
      var storedUser = JSON.parse(storedUserString);

      setUserData(storedUser);
    } else {
      console.log("User data not found in session storage");
    }
  }, []);

  console.log(userData);

  useEffect(() => {
    (async () => {
      if (userData?.id?.length > 0) {
        const citizenid = userData?.id;
        const token = userData?.token;

        console.log(citizenid?.length);
        console.log(token);
        try {
          const data = await fetchGetSingleCitizen(citizenid, token);

          console.log(data);

          const modifyData = {
            firstname: data?.username || "",
            email: data?.email || "",
            phoneNo: data?.mobile || "",
            gender: data?.gender || "",
            dob: data?.dob || "",
            bloodGroup: data?.blood_group || "",
            higherEducation: data?.higher_education || "",
            country: data?.country || "",
            socialMedia: {
              facebook: data?.fb_link || "",
              instagram: data?.insta_link || "",
              twitter: data?.twitter_link || "",
            },
            about: data?.about_me || "",
          };

          setUserDetails(modifyData);
        } catch (error) {
          console.log(error);
        }
      }
    })();
  }, []);

  console.log(userDetails);

  // Conditionally showing icons based on where certain link is present or not.
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
