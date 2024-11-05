"use client";
import { FC, useEffect, useState } from "react";
import POILogo from "@/assets/poi_logo_1.png";
import Image, { StaticImageData } from "next/image";
import { FaSearch, FaHamburger } from "react-icons/fa";
import { useRouter, usePathname } from "next/navigation";
import { cusDispatch, cusSelector } from "@/redux_store/cusHooks";
import Link from "next/link";
import { BsHouseFill } from "react-icons/bs";
import { RiUserAddFill } from "react-icons/ri";
import { AnimatePresence } from "framer-motion";
import { MobileLeftNavbar } from "./MobileLeftNavBar";
import { AdminControls } from "./AdminControls";
import { AuthRoutes, ProtectedRoutes } from "@/constants/routes";
import { authActions } from "@/redux_store/auth/authSlice";
import { GetAllLeaderList, GetBirthdayList, fetchTrendingLeaderList, getDropdownOption, getProfile } from "@/redux_store/auth/authAPI";
import { getImageUrl } from "@/config/get-image-url";
import CustomImage from "@/utils/CustomImage";
import { getCookie } from "cookies-next";
import { CITIZEN_TOKEN_KEY } from "@/constants/common";
import { complaintActions } from "@/redux_store/complaints/complaintSlice";
import { GetRaisedComplaints, getLeaderList } from "@/redux_store/complaints/complaintsApi";
import { GetRaisedRequests } from "@/redux_store/requests/requestAPI";
import { requestActions } from "@/redux_store/requests/requestSlice";
import { suggestionActions } from "@/redux_store/suggestions/suggestionSlice";
import { GetSuggestions } from "@/redux_store/suggestions/suggestionAPI";
import { GetPostsForCitizen, GetStoriesForCitizen } from "@/redux_store/post/postApi";
import { postActions } from "@/redux_store/post/postSlice";
import { followActions } from "@/redux_store/follow/followSlice";
import { fetchCitizenFollowingList, fetchFollowLeader, fetchUnFollowLeader } from "@/redux_store/follow/followAPI";
import { tryCatch } from "@/config/try-catch";
import toast from "react-hot-toast";
import { FaUserTimes } from "react-icons/fa";
import { getLeadersOptions } from "@/redux_store/common/commonAPI";
import { commonActions } from "@/redux_store/common/commonSlice";

interface TopNavbarProps { }
export const TopNavbar: FC<TopNavbarProps> = () => {
  const router = useRouter();
  const { userDetails, leaderlist } = cusSelector((st) => st.auth);
  const { following } = cusSelector((st) => st.follow);
  const curRoute = usePathname();
  const dispatch = cusDispatch();
  const [showAdminMenu, setShowAdminMenu] = useState(false);
  const [searchUserStr, setSearchUserStr] = useState("");
  const [showMobileNav, setShowMobileNav] = useState(false);
  let token: any = getCookie(CITIZEN_TOKEN_KEY);
  useEffect(() => {
    document.addEventListener("click", (e) => {
      if (!(e.target as HTMLElement).closest("#userDisplayPic"))
        setShowAdminMenu(false);

      if (!(e.target as HTMLElement).closest("#searchBox"))
        setSearchUserStr('');
    });
  }, [dispatch]);

  // useEffect(() => {
  //   (async () => {
  //     try {
  //       if (userDetails?.id) {
  //         const res = await getProfile(userDetails?.id, dispatch);
  //         dispatch(authActions.logIn(res));

  //         const LeadersDropdown = await getLeadersOptions();
  //         dispatch(commonActions.setLeaderOptions(LeadersDropdown));

  //         const AllLeaderList = await GetAllLeaderList();
  //         dispatch(authActions.setLeaderlist(AllLeaderList));

  //         const CitizenFollowingList = await fetchCitizenFollowingList(userDetails?.id);
  //         dispatch(followActions.Following(CitizenFollowingList));
  //         const trending = await fetchTrendingLeaderList();
  //         dispatch(authActions.Settrendingleader(trending));
  //         const LeaderList = await getLeaderList(userDetails?.id);
  //         dispatch(complaintActions.setLeader(LeaderList));

  //         const BirthdayList = await GetBirthdayList();
  //         if (BirthdayList?.length >= 0) { dispatch(authActions.setBirthdayList(BirthdayList)); }

  //         const PostsForCitizen = await GetPostsForCitizen(userDetails?.id);
  //         if (PostsForCitizen?.length > 0) { dispatch(postActions.setPost(PostsForCitizen)); }
  //         const StoriesForCitizen = await GetStoriesForCitizen(userDetails?.id);
  //         dispatch(postActions.storeStories(StoriesForCitizen as any));

  //         const dropdownOption = await getDropdownOption();
  //         dispatch(authActions.setDropDownOption(dropdownOption));

  //         const RaisedComplaints = await GetRaisedComplaints(userDetails?.id);
  //         if (RaisedComplaints.length > 0) { dispatch(complaintActions.storeComplaints(RaisedComplaints)); }
  //         const RaisedRequests = await GetRaisedRequests(userDetails?.id);
  //         if (RaisedRequests.length > 0) { dispatch(requestActions.storeRequest(RaisedRequests)); }
  //         const Suggestions = await GetSuggestions(userDetails?.id);
  //         if (Suggestions.length > 0) { dispatch(suggestionActions.storeSuggestions(Suggestions)); }
  //       } else {
  //         if (!token) {
  //           router.push(AuthRoutes.login)
  //         }
  //       }
  //     } catch (error) {
  //       console.error(error)
  //     }
  //   })();
  // }, [dispatch, userDetails?.id, token]);

  useEffect(() => {
    (async () => {
      try {
        if (userDetails?.id) {
          const [
            profileRes,
            leadersDropdown,
            allLeaderList,
            citizenFollowingList,
            trendingLeaders,
            leaderList,
            birthdayList,
            postsForCitizen,
            storiesForCitizen,
            dropdownOption,
            raisedComplaints,
            raisedRequests,
            suggestions,
          ] = await Promise.all([
            getProfile(userDetails?.id, dispatch),
            getLeadersOptions(),
            GetAllLeaderList(),
            fetchCitizenFollowingList(userDetails?.id),
            fetchTrendingLeaderList(),
            getLeaderList(userDetails?.id),
            GetBirthdayList(),
            GetPostsForCitizen(userDetails?.id),
            GetStoriesForCitizen(userDetails?.id),
            getDropdownOption(),
            GetRaisedComplaints(userDetails?.id),
            GetRaisedRequests(userDetails?.id),
            GetSuggestions(userDetails?.id),
          ]);

          dispatch(authActions.logIn(profileRes));
          dispatch(commonActions.setLeaderOptions(leadersDropdown));
          dispatch(authActions.setLeaderlist(allLeaderList));
          dispatch(followActions.Following(citizenFollowingList));
          dispatch(authActions.Settrendingleader(trendingLeaders));
          dispatch(complaintActions.setLeader(leaderList));

          if (birthdayList?.length >= 0) {
            dispatch(authActions.setBirthdayList(birthdayList));
          }

          if (postsForCitizen?.length > 0) {
            dispatch(postActions.setPost(postsForCitizen));
          }

          dispatch(postActions.storeStories(storiesForCitizen as any));
          dispatch(authActions.setDropDownOption(dropdownOption));

          if (raisedComplaints?.length > 0) {
            dispatch(complaintActions.storeComplaints(raisedComplaints));
          }

          if (raisedRequests?.length > 0) {
            dispatch(requestActions.storeRequest(raisedRequests));
          }

          if (suggestions?.length > 0) {
            dispatch(suggestionActions.storeSuggestions(suggestions));
          }
        } else if (!token) {
          router.push(AuthRoutes.login);
        }
      } catch (error) {
        console.error("Error in useEffect:", error);
      }
    })();
  }, [dispatch, userDetails?.id, token]);


  let heading = curRoute?.split("/").at(-1)?.includes("-")
    ? curRoute?.split("/").at(-1)?.replaceAll("-", " ")
    : curRoute?.split("/").at(-1);


  const searchFilterFunction = (text: string) => {
    if (text) {
      const newData = leaderlist?.filter(
        function (item: any) {
          const itemData = item?.["name"] ? item?.["name"].toUpperCase() : ''.toUpperCase();
          const textData = text.toUpperCase();
          return itemData.indexOf(textData) > -1;
        }
      )
      return newData
    } else {
      return leaderlist
    };
  }

  heading = heading === "user" ? "home" : heading;

  return (
    <>
      <nav className="py-3 px-8 bg-sky-950 text-orange-50 flex items-center gap-5 max-[1000px]:hidden">
        {/* LOGO */}
        <Image
          src={POILogo}
          alt="poi logo"
          className="h-12 w-auto"
          priority={true}
          onClick={() => router.push(ProtectedRoutes.user)}
        />

        {/* Search Bar */}
        <label htmlFor="searchBox" className="relative w-[20%]">
          <input
            onChange={(e) => setSearchUserStr(e.target.value.toLowerCase())}
            type="search"
            className="rounded-full bg-sky-50 bg-opacity-20 py-3 px-5 text-md text-sky-50 outline-none w-full capitalize placeholder:text-sky-50 placeholder:text-opacity-70"
            placeholder="search politicians"
            id="searchBox"
          />
          <FaSearch className="absolute top-1/2 right-5 translate-y-[-50%] text-opacity-70 text-sky-50 text-xl" />

          {/* Search box */}
          {searchUserStr.length > 0 && (
            <ul className="absolute rounded-md shadow-md border bg-white overflow-x-hidden overflow-y-auto main_scrollbar max-h-[80vh] top-[110%] left-0 w-full z-[100]">
              {searchFilterFunction(searchUserStr)?.map((item: any) =>
                <BriefUserInfo
                  key={item?.id}
                  designation={item?.username?.political_party}
                  userPic={getImageUrl(item?.image)}
                  name={item?.name}
                  id={item?.id}
                  isFollowing={following?.find((i: any) => i.leaderid == item.id) ? true : false}
                />
              )}
              {searchFilterFunction(searchUserStr)?.length == 0 &&
                <p style={{ display: searchFilterFunction(searchUserStr)?.length == 0 ? "flex" : "none" }} className="text-xl capitalize text-center text-sky-950 font-semibold py-3">
                  no politician found❗
                </p>
              }
            </ul>
          )}
        </label>

        {/* Info */}

        <h3 className="capitalize">{heading}</h3>

        <div className="h-10 w-[2px] bg-sky-50 bg-opacity-40" />

        {/* CTA's */}
        <section className="flex items-center gap-8 ml-5">
          <button
            type="button"
            onClick={() => router.push(ProtectedRoutes.user)}
          >
            <BsHouseFill className="text-sky-50 text-2xl" />
          </button>
          {/* <button
            type='button'
            className='relative'
            onClick={() => dispatch(uiActions.setShowBriefNoti(!showBriefNoti))}
            id='briefNotiBox'>
            <FaBell className='text-sky-50 text-2xl' />

            <span className='absolute -top-3 -right-2 bg-orange-500 text-orange-50 w-4 text-[12px] aspect-square flex items-center justify-center rounded-full'>
              0
            </span>

            {showBriefNoti && (
              <div className='absolute top-[210%] left-1/2 translate-x-[-50%] z-50'>
                <BriefNotifications />
              </div>
            )}
          </button> */}
        </section>

        {/* USER Profile */}
        <section className="flex items-center gap-4 ml-auto relative">
          <p className="capitalize">{userDetails?.username}</p>
          <button onClick={() => setShowAdminMenu((lst) => !lst)}>
            <CustomImage
              src={getImageUrl(userDetails?.image)}
              alt="user pic"
              className="w-14 aspect-square object-cover object-center rounded-full"
              id="userDisplayPic"
              width={100}
              height={100}
            />
          </button>

          {showAdminMenu && (
            <>
              {/* User Options */}
              <div className="absolute top-[120%] right-0 w-max z-50">
                <AdminControls />
              </div>
            </>
          )}
        </section>
      </nav>

      <nav className="py-3 px-8 bg-sky-950 text-sky-50 flex-col gap-5 hidden max-[1000px]:flex  max-[500px]:px-4">
        <div className="flex justify-between items-center w-full">
          <FaHamburger
            className="text-3xl"
            onClick={() => setShowMobileNav(true)}
          />

          <Image
            src={POILogo}
            alt="poi logo"
            className="h-12 w-auto"
            onClick={() => router.push(ProtectedRoutes.user)}
            priority={true}
          />


          <section className="flex items-center  relative">
            <button onClick={() => { setShowAdminMenu((lst) => !lst) }} id="userDisplayPic">
              <CustomImage
                src={getImageUrl(userDetails?.image)}
                alt="user pic"
                className="w-14 aspect-square object-cover object-center rounded-full"
                width={100}
                height={100}
              />
            </button>
            {showAdminMenu && (
              <div className="absolute top-[120%] right-0 w-max z-50">
                <AdminControls />
              </div>
            )}
          </section>
        </div>
        <label htmlFor="searchBox" className="relative w-full">
          <input
            onChange={(e) => setSearchUserStr(e.target.value.toLowerCase())}
            type="search"
            className="rounded-full bg-sky-50 bg-opacity-20 py-3 px-5 text-md text-sky-50 outline-none w-full capitalize placeholder:text-sky-50 placeholder:text-opacity-70"
            placeholder="search politicians"
            id="searchBox" />
          <FaSearch className="absolute top-1/2 right-5 translate-y-[-50%] text-opacity-70 text-sky-50 text-xl" />
          {searchUserStr.length > 0 && (
            <ul className="absolute rounded-md shadow-md border bg-white overflow-x-hidden overflow-y-auto main_scrollbar max-h-[80vh] top-[110%] left-0 w-full z-[100]">
              {searchFilterFunction(searchUserStr)?.map((item: any) =>
                <BriefUserInfo
                  key={item?.id}
                  designation={item?.username?.political_party}
                  userPic={getImageUrl(item?.image)}
                  name={item?.name}
                  id={item?.id}
                  isFollowing={following?.find((i: any) => i.leaderid == item.id) ? true : false}
                />
              )}
              {searchFilterFunction(searchUserStr)?.length == 0 &&
                <p style={{ display: searchFilterFunction(searchUserStr)?.length == 0 ? "flex" : "none" }} className="text-xl capitalize text-center text-sky-950 font-semibold py-3">
                  no politician found❗
                </p>
              }
            </ul>
          )}
        </label>
      </nav>

      {showMobileNav && (
        <AnimatePresence mode="wait">
          <MobileLeftNavbar onClose={() => setShowMobileNav(false)} />
        </AnimatePresence>
      )}
    </>
  );
};

const BriefUserInfo: FC<{ name: string; userPic: string | StaticImageData; designation: string; id: string; isFollowing: boolean }> = ({ designation, name, userPic, id, isFollowing }) => {
  const { userDetails } = cusSelector((state) => state.auth);
  const dispatch = cusDispatch();
  const handleClick = async (id: string, isFollowing: boolean) => {
    const postBody = { senderid: userDetails?.id, receiverid: id, };
    tryCatch(
      async () => {
        const response = await (!isFollowing ? fetchFollowLeader(postBody) : fetchUnFollowLeader(postBody));
        if (response?.success) {
          const res = await fetchCitizenFollowingList(userDetails?.id as string)
          dispatch(followActions.Following(res))
          toast.success(response.message)
        } else {
          toast.error(response.message)
        }

      })
  };




  return (
    <>
      <Link href={window.location?.origin + `/user/leader/about?id=${id}`} >
        <li className="flex items-center p-4 last_noti gap-2 hover:bg-gray-100">
          <CustomImage
            src={userPic}
            alt="user dp"
            width={1000}
            height={1000}
            className="w-12 aspect-square rounded-full object-center object-cover"
          />
          <p className="text-lg font-semibold text-sky-950 flex flex-col capitalize">
            {name}
            <span className="font-medium text-[14px]">{designation}</span>
          </p>
          <button onClick={() => { handleClick(id, isFollowing) }} type="button" className="ml-auto">
            {!isFollowing ? <RiUserAddFill className="text-sky-950 text-2xl hover:text-orange-500" /> :
              <FaUserTimes className="text-sky-950 text-2xl hover:text-orange-500" />
            }
          </button>
        </li>
      </Link>
    </>
  );
};