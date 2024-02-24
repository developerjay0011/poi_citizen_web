import Axios from "@/config/axios";
import { insertVariables } from "@/config/insert-variables";
import { tryCatch } from "@/config/try-catch";
import { APIRoutes } from "@/constants/routes";
import { LoginData, RegisterData } from "@/utils/typesUtils";

// user Login Api
export const fetchLogin = async (resBody: LoginData) => {
  return tryCatch(
    async () => {
      const res = await Axios.post(APIRoutes.login, resBody)
      return res.data;
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

export const verifyOtp = async (body: {
  mobile: string;
  otp: string;
}) => {
  return tryCatch(
    async () => {
      const res = await Axios.post(APIRoutes.verifyOTP, body);
      return res.data;
    }
  );
};


export const CheckCitizenRegExists = async (body: {
  email: string;
  mobile: string
}) => {
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