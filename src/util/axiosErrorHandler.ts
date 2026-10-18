import { isAxiosError } from "axios";

const axiosErrorHandler = (error: unknown) => {
       if (isAxiosError(error)) {
        return error.response?.data.message || error.message;
      } else {
        return "Unexpected Error";
      }
}

export default axiosErrorHandler
