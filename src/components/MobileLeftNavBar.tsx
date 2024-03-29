import { CusLink } from "@/utils/CusLink";
import { motion as m } from "framer-motion";
import Image from "next/image";
import { FC } from "react";
import POILogo from "@/assets/poi_logo_1.png";
import Link from "next/link";
import { FaBell, FaClipboard, FaUser } from "react-icons/fa";
import { LuNetwork } from "react-icons/lu";
import { FaUserGroup } from "react-icons/fa6";
import { HiSpeakerphone } from "react-icons/hi";
import { TfiStatsUp } from "react-icons/tfi";
import { ProtectedRoutes } from "@/constants/routes";

interface MobileLeftNavbarProps {
  onClose: () => void;
}

export const MobileLeftNavbar: FC<MobileLeftNavbarProps> = ({ onClose }) => {
  return (
    <>
      <m.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ ease: "easeOut" }}
        className="fixed top-0 left-0 h-[100dvh] z-[100] w-[100dvw]"
      >
        <m.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ ease: "easeOut" }}
          className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-30 backdrop-blur-[2px]"
          onClick={onClose}
        />

        <m.ul
          initial={{ x: -100 }}
          animate={{ x: 0 }}
          exit={{ x: -100 }}
          transition={{ ease: "easeOut" }}
          onClick={onClose}
          className="w-1/2 bg-white flex flex-col gap-2 relative h-full z-[102] items-start max-[500px]:w-[75%]"
        >
          <Link
            href={ProtectedRoutes.admin}
            className="w-full text-center bg-sky-950 flex justify-center py-2"
          >
            <Image src={POILogo}
              priority={true}
              alt="poi logo" className="h-12 w-auto" />
          </Link>
          <li>
            <CusLink
              href={ProtectedRoutes.admin}
              activeLinkClasses="text-orange-500"
              className="flex items-center gap-2 py-2 pl-10 uppercase font-medium"
              normalClasses="text-sky-950"
            >
              <FaClipboard className="text-xl" /> Feed
            </CusLink>
          </li>
          <li>
            <CusLink
              href={ProtectedRoutes.profile}
              activeLinkClasses="text-orange-500"
              className="flex items-center gap-2 py-2 pl-10 uppercase font-medium"
              normalClasses="text-sky-950"
            >
              <FaUser /> My Profile
            </CusLink>
          </li>
          <li>
            <CusLink
              href={ProtectedRoutes.networks}
              activeLinkClasses="text-orange-500"
              className="flex items-center gap-2 py-2 pl-10 uppercase font-medium"
              normalClasses="text-sky-950"
            >
              <LuNetwork /> My networks
            </CusLink>
          </li>
          <li>
            <CusLink
              href={ProtectedRoutes.notifications}
              activeLinkClasses="text-orange-500"
              className="flex items-center gap-2 py-2 pl-10 uppercase font-medium"
              normalClasses="text-sky-950"
            >
              <FaBell /> notifications
            </CusLink>
          </li>
          <li>
            <CusLink
              href={ProtectedRoutes.manage_staff}
              activeLinkClasses="text-orange-500"
              className="flex items-center gap-2 py-2 pl-10 uppercase font-medium"
              normalClasses="text-sky-950"
            >
              <FaUserGroup /> Manage staff
            </CusLink>
          </li>
          <li>
            <CusLink
              href={ProtectedRoutes.polls}
              activeLinkClasses="text-orange-500"
              className="flex items-center gap-2 py-2 pl-10 uppercase font-medium"
              normalClasses="text-sky-950"
            >
              <HiSpeakerphone /> Polls
            </CusLink>
          </li>
          <li>
            <CusLink
              href={ProtectedRoutes.analytics}
              activeLinkClasses="text-orange-500"
              className="flex items-center gap-2 py-2 pl-10 uppercase font-medium"
              normalClasses="text-sky-950"
            >
              <TfiStatsUp /> Account Stats
            </CusLink>
          </li>
        </m.ul>
      </m.div>
    </>
  );
};
