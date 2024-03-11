"use client";
import { ProtectedRoutes } from "@/constants/routes";
import { CusLink } from "@/utils/CusLink";
import { FC } from "react";

interface CitizenProfileNavbarProps { }
export const CitizenProfileNavbar: FC<CitizenProfileNavbarProps> = () => {

  // .active_profile_link {
  //   @apply text-orange-500;

  //   &::after {
  //     @apply border-orange-500;
  //     content: '';
  //     position: absolute;
  //     top: 110%;
  //     left: 50%;
  //     transform: translateX(-50%);
  //     width: 30px;
  //     height: 30px;
  //     border-width: 15px;
  //     border-left-color: transparent;
  //     border-top-color: transparent;
  //     border-right-color: transparent;
  //   }
  // }
  return (
    <>
      <nav className="flex items-center gap-8 ml-20 max-[1480px]:ml-10 max-[1200px]:ml-5 max-[450px]:gap-4 max-[1100px]:flex-wrap max-[620px]:justify-center">
        <CusLink
          activeLinkClasses="after:absolute text-orange-500 after:w-full after:h-[3px] after:bg-orange-400 after:top-[160%] after:left-0 max-[950px]:after:top-full max-[1238px]:after:top-full"
          normalClasses="text-sky-950"
          className="text-lg font-[500] capitalize relative"
          href={ProtectedRoutes.feed}
        >
          Feed
        </CusLink>

        <CusLink
          activeLinkClasses="after:absolute text-orange-500 after:w-full after:h-[3px] after:bg-orange-400 after:top-[160%] after:left-0 max-[1238px]:after:top-[159%] max-[1050px]:after:top-[110%] max-[995px]:after:top-[159%] max-[995px]:after:top-[110%] max-[500px]:after:top-full"
          normalClasses="text-sky-950"
          className="text-lg font-[500] capitalize relative"
          href={ProtectedRoutes.userProfile}
        >
          About
        </CusLink>

        <CusLink
          activeLinkClasses="after:absolute text-orange-500 after:w-full after:h-[3px] after:bg-orange-400 after:top-[160%] after:left-0 max-[950px]:after:top-full"
          normalClasses="text-sky-950"
          className="text-lg font-[500] capitalize relative"
          href={ProtectedRoutes.complaints}
        >
          complaints
        </CusLink>

        <CusLink
          activeLinkClasses="after:absolute text-orange-500 after:w-full after:h-[3px] after:bg-orange-400 after:top-[160%] after:left-0 max-[950px]:after:top-full"
          normalClasses="text-sky-950"
          className="text-lg font-[500] capitalize relative"
          href={ProtectedRoutes.requests}
        >
          requests
        </CusLink>

        <CusLink
          activeLinkClasses="after:absolute text-orange-500 after:w-full after:h-[3px] after:bg-orange-400 after:top-[160%] after:left-0 max-[950px]:after:top-full"
          normalClasses="text-sky-950"
          className="text-lg font-[500] capitalize relative"
          href={ProtectedRoutes.suggestions}
        >
          suggestions
        </CusLink>

        <CusLink
          activeLinkClasses="after:absolute text-orange-500 after:w-full after:h-[3px] after:bg-orange-400 after:top-[160%] after:left-0 max-[950px]:after:top-full"
          normalClasses="text-sky-950"
          className="text-lg font-[500] capitalize relative"
          href={ProtectedRoutes.contributions}
        >
          contributions
        </CusLink>

        <CusLink
          activeLinkClasses="after:absolute text-orange-500 after:w-full after:h-[3px] after:bg-orange-400 after:top-[160%] after:left-0 max-[950px]:after:top-full"
          normalClasses="text-sky-950"
          className="text-lg font-[500] capitalize relative"
          href={ProtectedRoutes.following}
        >
          following
        </CusLink>
      </nav>
    </>
  );
};
