"use client";
import { cusSelector } from "@/redux_store/cusHooks";
import { CommonBox } from "@/utils/CommonBox";
import { FC, useEffect, useState } from "react";
import { BiLogoGmail } from "react-icons/bi";
import { FaTransgenderAlt } from "react-icons/fa";
import {
  FaCakeCandles,
  FaGlobe,
  FaHandshake,
  FaPhone,
  FaUser,
} from "react-icons/fa6";
import { MdBloodtype } from "react-icons/md";
import { fetchGetSingleCitizen } from "../api/profile";
import { RootState } from "@/redux_store";
import moment from "moment";
interface CitizenPersonalInfoProps {}

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

export const CitizenPersonalInfo: FC<CitizenPersonalInfoProps> = () => {
  // const [userDetails, setUserDetails] = useState<UserDetails | undefined>();
  // const [userData, setUserData] = useState<UserDetail>({
  //   token: "",
  //   id: "",
  // });
  const userDetails: any = cusSelector(
    (state: RootState) => state.auth.userDetails
  );
  // useEffect(() => {
  //   var storedUserString = sessionStorage.getItem("user");
  //   if (storedUserString !== null) {
  //     var storedUser = JSON.parse(storedUserString);

  //     setUserData(storedUser);
  //   } else {
  //     console.log("User data not found in session storage");
  //   }
  // }, []);


  // useEffect(() => {
  //   (async () => {
  //     if (userData?.id.length > 0) {
  //       const citizenid = userData?.id;
  //       const token = userData?.token;

  //       if (citizenid?.length > 0) {
  //         try {
  //           const data = await fetchGetSingleCitizen(citizenid, token);


  //           const modifyData = {
  //             firstname: data?.username || "",
  //             email: data?.email || "",
  //             phoneNo: data?.mobile || "",
  //             gender: data?.gender || "",
  //             dob: data?.dob || "",
  //             bloodGroup: data?.blood_group || "",
  //             higherEducation: data?.higher_education || "",
  //             country: data?.country || "",
  //             socialMedia: {
  //               facebook: data?.fb_link || "",
  //               instagram: data?.insta_link || "",
  //               twitter: data?.twitter_link || "",
  //             },
  //             about: data?.about_me || "",
  //           };

  //           setUserDetails(modifyData);
  //         } catch (error) {
  //           console.log(error);
  //         }
  //       }
  //     }
  //   })();
  // }, []);


  return (
    <>
      <CommonBox title="Personal info">
        <section className="py-6">
          {/* ABOUT */}
          <PersonalBriefInfo
            Icon={FaUser}
            data={userDetails?.about_me as string}
            heading="About me:"
          />

          {/* MORE INFO */}
          <div className="grid grid-cols-2 mt-8 gap-y-8 max-[400px]:grid-cols-1">
            <PersonalBriefInfo
              Icon={FaCakeCandles}
              data={moment(userDetails?.dob).format("YYYY-MM-DD")  as string}
              heading="Date of Birth:"
            />

            <PersonalBriefInfo
              Icon={FaPhone}
              data={`+91 ${userDetails?.mobile}`}
              heading="(IN) Phone no:"
            />

            <PersonalBriefInfo
              Icon={FaTransgenderAlt}
              data={userDetails?.gender as string}
              heading="Gender: "
            />

            <PersonalBriefInfo
              Icon={MdBloodtype}
              data={userDetails?.blood_group as string}
              heading="Blood Group: "
            />

            <PersonalBriefInfo
              Icon={FaHandshake}
              data={moment(userDetails?.created_date).format("YYYY-MM-DD") as string}
              heading="Joined: "
            />

            <PersonalBriefInfo Icon={FaGlobe} data="India" heading="Country" />

            <PersonalBriefInfo
              Icon={BiLogoGmail}
              data={userDetails?.email as string}
              heading="Email: "
            />
          </div>
        </section>
      </CommonBox>
    </>
  );
};

const PersonalBriefInfo: FC<{
  Icon: JSX.ElementType;
  heading: string;
  data: string;
}> = ({ Icon, data, heading }) => {
  return (
    <>
      <article className="flex flex-col gap-1">
        <p className="flex items-end gap-3">
          <Icon className="text-[1rem]" />

          <span className="font-[500] capitalize text-[15px]">{heading}</span>
        </p>
        <p
          className={`text-[14px] pl-7 ${
            heading.toLowerCase().includes("about") && "text-justify"
          }`}
        >
          {data}
        </p>
      </article>
    </>
  );
};
