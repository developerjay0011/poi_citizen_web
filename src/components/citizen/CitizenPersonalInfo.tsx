"use client";
import { cusSelector } from "@/redux_store/cusHooks";
import { CommonBox } from "@/utils/CommonBox";
import { FC } from "react";
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
import { RootState } from "@/redux_store";
import moment from "moment";
interface CitizenPersonalInfoProps { }

export const CitizenPersonalInfo: FC<CitizenPersonalInfoProps> = () => {
  const userDetails: any = cusSelector(
    (state: RootState) => state.auth.userDetails
  );

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
              data={moment(userDetails?.dob).format("YYYY-MM-DD") as string}
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
              data={
                moment(userDetails?.created_date).format("YYYY-MM-DD") as string
              }
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
          className={`text-[14px] pl-7 ${heading.toLowerCase().includes("about") && "text-justify"
            }`}
        >
          {data}
        </p>
      </article>
    </>
  );
};
