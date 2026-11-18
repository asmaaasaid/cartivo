import { isAxiosError } from "axios";

const axiosErrorHandler = (error: unknown): string => {
  if (isAxiosError(error)) {
    const data = error.response?.data;
    if (typeof data === "string" && !data.trim().startsWith("<")) return data;

    return data.message ?? error.message;
  } else {
    return "Unexpected Error";
  }
};

export default axiosErrorHandler;
