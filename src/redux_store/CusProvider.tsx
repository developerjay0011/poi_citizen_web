'use client'
import { FC, ReactNode, useEffect, useState } from 'react'
import { Provider } from 'react-redux'
import { store, persistor } from '.'
import { PersistGate } from 'redux-persist/integration/react'
import { cusDispatch } from './cusHooks'

import { usePathname } from 'next/navigation'
import { authActions } from './auth/authSlice'
import { Toaster } from 'react-hot-toast'
import { fetchTrendingLeaderList, GetAllLeaderList, GetBirthdayList, getDropdownOption, getProfile } from './auth/authAPI'
import { GetPostsForCitizen, GetStoriesForCitizen } from './post/postApi'
import { postActions } from './post/postSlice'
import { fetchCitizenFollowingList } from './follow/followAPI'
import { followActions } from './follow/followSlice'
import { getLeaderList, GetRaisedComplaints } from './complaints/complaintsApi'
import { complaintActions } from './complaints/complaintSlice'
import { GetRaisedRequests } from './requests/requestAPI'
import { requestActions } from './requests/requestSlice'
import { GetSuggestions } from './suggestions/suggestionAPI'
import { suggestionActions } from './suggestions/suggestionSlice'
import { getLeadersOptions } from './common/commonAPI'
import { commonActions } from './common/commonSlice'
import { contributionsActions } from './contributions/contributionsSlice'
import { GetContributions } from './contributions/contributionAPI'
import { CITIZEN_USER_INFO } from '@/constants/common'
import { getCookie } from "cookies-next";
import Logo from "@/assets/favicon.png";
import Image from 'next/image'

interface CusProviderProps {
  children: ReactNode
}

const LoadingPage = () => {
  return (
    <div className='h-screen w-full flex items-center justify-center justify-center flex-col bg-red'>
      <Image
        src={Logo}
        alt="poi logo"
        className="h-[13rem] w-auto self-center max-lg:m-auto max-lg:h-[10rem]"
      />
      <div style={{ width: '40px', height: '40px', border: '5px solid #ccc', borderTop: '5px solid orange', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}


export const CusProvider: FC<CusProviderProps> = ({ children }) => {
  return (
    <Provider store={store}>
      <PersistGate loading={<LoadingPage />} persistor={persistor}>
        <Toaster position="top-center" />
        <AuthLayer>{children}</AuthLayer>
      </PersistGate>
    </Provider>
  )
}

const getDashboard = [
  {
    tab: ["user"],
    onCall: async (id: any, dispatch: any) => {
      if (id) {
        try {
          const res = await GetPostsForCitizen(id);
          return res;
        } catch (error) {
          console.error("Error fetching posts for citizen:", error);
          return null;
        }
      }
      return null;
    },
    onSave: (res: any, dispatch: any) => {
      if (res) {
        dispatch(postActions.setPost(res))
      }
    }
  },
  {
    tab: ["user"],
    onCall: async (id: any, dispatch: any) => {
      if (id) {
        try {
          const res = await fetchCitizenFollowingList(id);
          return res; // Return the response
        } catch (error) {
          console.error("Error fetching citizen following list:", error);
          // Optionally dispatch an error action or handle the error in another way
          return null; // Or return a default value like [] or {}
        }
      }
      return null; // Return null if id is not provided
    },
    onSave: (res: any, dispatch: any) => {
      if (res) { //check if res is not null
        dispatch(followActions.Following(res))
      }
    }
  },
  {
    tab: ["user"],
    onCall: async (id: any, dispatch: any) => {
      if (id) {
        try {
          const res = await GetStoriesForCitizen(id);
          return res;
        } catch (error) {
          console.error("Error fetching stories for citizen:", error);
          return null;
        }
      }
      return null;
    },
    onSave: (res: any, dispatch: any) => {
      if (res) {
        dispatch(postActions.storeStories(res))
      }
    }
  },
  {
    tab: ["user"],
    onCall: async (id: any, dispatch: any) => {
      try {
        const res = await GetBirthdayList();
        return res;
      } catch (error) {
        console.error("Error fetching birthday list:", error);
        return null;
      }
    },
    onSave: (res: any, dispatch: any) => {
      if (res) {
        dispatch(authActions.setBirthdayList(res))
      }
    }
  },
  {
    tab: ["user"],
    onCall: async (id: any, dispatch: any) => {
      try {
        const res = await fetchTrendingLeaderList();
        return res;
      } catch (error) {
        console.error("Error fetching trending leader list:", error);
        return null;
      }
    },
    onSave: (res: any, dispatch: any) => {
      if (res) {
        dispatch(authActions.Settrendingleader(res))
      }
    }
  },
];

const aplist = [
  {
    tab: ["complaints"],
    onCall: async (id: any, dispatch: any) => {
      if (id) {
        try {
          const res = await GetRaisedComplaints(id);
          return res;
        } catch (error) {
          console.error("Error fetching raised complaints:", error);
          return null;
        }
      }
      return null;
    },
    onSave: (res: any, dispatch: any) => { if (res) dispatch(complaintActions.storeComplaints(res)); }
  },
  {
    tab: ["requests"],
    onCall: async (id: any, dispatch: any) => {
      if (id) {
        try {
          const res = await GetRaisedRequests(id);
          return res;
        } catch (error) {
          console.error("Error fetching raised requests:", error);
          return null;
        }
      }
      return null;
    },
    onSave: (res: any, dispatch: any) => { if (res) dispatch(requestActions.storeRequest(res)); }
  },
  {
    tab: ["suggestions"],
    onCall: async (id: any, dispatch: any) => {
      if (id) {
        try {
          const res = await GetSuggestions(id);
          return res;
        } catch (error) {
          console.error("Error fetching suggestions:", error);
          return null;
        }
      }
      return null;
    },
    onSave: (res: any, dispatch: any) => { if (res) dispatch(suggestionActions.storeSuggestions(res)); }
  },
  {
    tab: ["contributions"],
    onCall: async (id: any, dispatch: any) => {
      if (id) {
        try {
          const res = await GetContributions(id);
          return res;
        } catch (error) {
          console.error("Error fetching contributions:", error);
          return null;
        }
      }
      return null;
    },
    onSave: (res: any, dispatch: any) => { if (res) dispatch(contributionsActions.storeContributions(res)); }
  }
];

const getAny = [
  {
    tab: ["any"],
    onCall: async (id: any, dispatch: any) => {
      if (id) {
        try {
          const res = await getLeaderList(id);
          return res;
        } catch (error) {
          console.error("Error fetching leader list:", error);
          return null;
        }
      }
      return null;
    },
    onSave: (res: any, dispatch: any) => { if (res) dispatch(complaintActions.setLeader(res)); }
  },
  {
    tab: ["any"],
    onCall: async (id: any, dispatch: any) => {
      try { //no id needed for this function
        const res = await getLeadersOptions();
        return res;
      } catch (error) {
        console.error("Error fetching leader options:", error);
        return null;
      }
    },
    onSave: (res: any, dispatch: any) => { if (res) dispatch(commonActions.setLeaderOptions(res)); }
  },
  {
    tab: ["any"],
    onCall: async (id: any, dispatch: any) => {
      try { //no id needed for this function
        const res = await GetAllLeaderList();
        return res;
      } catch (error) {
        console.error("Error fetching all leader list:", error);
        return null;
      }
    },
    onSave: (res: any, dispatch: any) => { if (res) dispatch(authActions.setLeaderlist(res)); }
  },
  {
    tab: ["any"],
    onCall: async (id: any, dispatch: any) => {
      try { //no id needed for this function
        const res = await getDropdownOption();
        return res;
      } catch (error) {
        console.error("Error fetching dropdown options:", error);
        return null;
      }
    },
    onSave: (res: any, dispatch: any) => { if (res) dispatch(authActions.setDropDownOption(res)); }
  }
];

const AuthLayer: FC<{ children: ReactNode }> = ({ children }) => {
  const dispatch = cusDispatch()
  const curRoute = usePathname();
  const [userData, setUserData] = useState<any>(null)
  const path: any = curRoute?.split("/").at(-1)?.includes("-") ? curRoute?.split("/").at(-1)?.replaceAll("-", " ") : curRoute?.split("/").at(-1) || ""
  let userDetails: any = getCookie(CITIZEN_USER_INFO);
  userDetails = userDetails && JSON.parse(userDetails);


  const GetHomePage = async (userDetails: any, timeout = 10) => {
    try {
      setTimeout(async () => {
        for (let i = 0; i < getDashboard.length; i++) {
          setTimeout(async () => {
            const element = getDashboard[i];
            const res = await element?.onCall(userDetails?.id, dispatch)
            element?.onSave(res, dispatch);
          }, 1000);
        }
      }, timeout);
    } catch (error) {
      console.error(error)
    }
  }

  const getApiCall = async () => {
    if (userDetails?.id && userData == null) {
      dispatch(authActions.logIn(userDetails));
      const res = await getProfile(userDetails?.id, dispatch)
      dispatch(authActions.logIn(res));
    }
    if (path == "user") {
      await GetHomePage(userDetails)
    }
    if (path != "user") {
      for (let i = 0; i < aplist.length; i++) {
        const element = aplist[i];
        if (element?.tab?.includes(path)) {
          setTimeout(async () => {
            const res = await element?.onCall(userDetails?.id, dispatch);
            element?.onSave(res, dispatch);
          }, 1000);
        }
      }
      if (userData == null) { GetHomePage(userDetails, 4000) }
    }
    setUserData(userDetails)
  }

  useEffect(() => { getApiCall() }, [path]);

  useEffect(() => {
    setUserData(null);
    (async () => {
      for (let i = 0; i < getAny.length; i++) {
        const element = getAny[i];
        const res = await element?.onCall(userDetails?.id, dispatch);
        element?.onSave(res, dispatch);
      }
    })()
  }, []);


  return children
}
