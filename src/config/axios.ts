import { CITIZEN_DEFAULT_CONTENT_TYPE, CITIZEN_TOKEN_KEY } from "@/constants/common";
import axios from "axios";
import { getCookie } from 'cookies-next';


const Axios = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_BASE_URL}`
});

Axios.interceptors.request.use((config: any) => {
    const token = getCookie(CITIZEN_TOKEN_KEY);
    const headers = config.headers;
    console.log("headers", token)
    return {
        ...config,
        headers: {
            'Content-Type': headers['Content-Type'] ?? CITIZEN_DEFAULT_CONTENT_TYPE,
            'Authorization': token && `Bearer ${token}`,
            ...headers
        },
    };

});

export default Axios;