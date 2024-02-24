/* import { LoginData, RegisterData } from "@/utils/typesUtils";


export const fetchLogin = async (resBody: LoginData) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/Citizen/Login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(resBody),
      }
    );
    return res.json();
  } catch (error) {
    return error;
  }
};

export const fetchRegister = async (resBody: RegisterData) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/Citizen/Registration`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(resBody),
        }
      );
      
      return res.json();
    } catch (error) {
      return error;
    }
  };
 */