import Axios from "@/config/axios";
import { insertVariables } from "@/config/insert-variables";
import { tryCatch } from "@/config/try-catch";
import { APIRoutes } from "@/constants/routes";
import { ForgotPassword, LoginData, RegisterData } from "@/utils/typesUtils";
import { authActions } from "./authSlice";
import { CITIZEN_USER_INFO } from "@/constants/common";
import { setCookie } from "cookies-next";

// user Login Api
export const fetchLogin = async (resBody: LoginData) => {
  return tryCatch(
    async () => {
      const res = await Axios.post(APIRoutes.login, resBody)
      return res.data
    }
  );
};

// User Registration Api
export const fetchRegister = async (resBody: RegisterData) => {
  return tryCatch(async () => {
    const res = await Axios.post(APIRoutes.register, resBody)
    return res.data;
  });
};

export const sendOtp = async (body: { mobile: any }) => {
  return tryCatch(
    async () => {
      const res = await Axios.post(APIRoutes.sendOTP, body);
      return res.data;
    }
  );
};

export const verifyOtp = async (body: { mobile: string; otp: string; }) => {
  return tryCatch(
    async () => {
      const res = await Axios.post(APIRoutes.verifyOTP, body);
      return res.data;
    }
  );
};


export const CheckCitizenRegExists = async (body: { email: string; mobile: string }) => {
  return tryCatch(
    async () => {
      const res = await Axios.post(APIRoutes.CheckCitizenRegExists, body);
      return res.data;
    }
  );
};


export const CheckCitizenExists = async (userId: string) => {
  return tryCatch(
    async () => {
      const res = await Axios.get(insertVariables(APIRoutes.CheckCitizenExists, { userId }));
      return res.data;
    }
  );
};


export const fetchForgotPassword = async (resBody: ForgotPassword) => {
  return tryCatch(async () => {
    const res = await Axios.post(APIRoutes.ForgotPassword, resBody)
    return res.data;
  });
};

export const uploadProfileImage = async (formData: any) => {
  return tryCatch(
    async () => {
      const res = await Axios.post(APIRoutes.UploadCitizenProfileImge, formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      return res.data;
    }
  );
};

export const fetchTrendingLeaderList = async () => {
  return tryCatch(
    async () => {
      const res = await Axios.get(APIRoutes.TrendingLeaderList);
      return Array.isArray(res.data) ? res.data : []
    }
  );
};



export const getProfile = async (citizenid: string, dispatch: any) => {
  return tryCatch(async () => {
    const res = await Axios.get(insertVariables(APIRoutes.getSingleCitizen, { citizenid }));
    if (res?.data) { await setCookie(CITIZEN_USER_INFO, res?.data); } else { dispatch(authActions.logOut()) }
    return res.data;
  }
  );
};

export const getSingleLeader = async (leaderid: string) => {
  return tryCatch(
    async () => {
      const res = await Axios.get(insertVariables(APIRoutes.getSingleLeader, { leaderid }));
      return res.data;
    }
  );
};

export const EditCitizenProfile = async (formData: any) => {
  return tryCatch(
    async () => {
      const res = await Axios.post(APIRoutes.EditCitizenProfile, formData);
      return res.data;
    }
  );
};


export const GetBirthdayList = async () => {
  return tryCatch(
    async () => {
      const res = await Axios.get(APIRoutes.GetBirthdayList);
      return Array.isArray(res.data) ? res.data : []
    }
  );
};

export const getDropdownOption = async () => {
  return tryCatch(
    async () => {
      const res = await Axios.get(APIRoutes.getDropdownOption);
      return res.data;
    }
  );
};


export const GetAllLeaderList = async () => {
  return tryCatch(
    async () => {
      const res = await Axios.get(APIRoutes.GetLeaderList);
      return Array.isArray(res.data) ? res.data : []
    }
  );
};


export const fetchAppinfo = async () => {
  return tryCatch(async () => {
    const res = await Axios.get(APIRoutes.GetLoginScreenCount)
    return res.data;
  });
};
