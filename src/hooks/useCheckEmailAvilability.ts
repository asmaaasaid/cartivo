import axios from "axios";
import { useState } from "react";

type TStatus = "idle" | "checking" | "avilable" | "notAvilable" | "failed";

const useCheckEmailAvilability = () => {
  const [emailAvilabilityStatus, setEmailAvilabilityStatus] =
    useState<TStatus>("idle");
  const [enteredEmail, setEnteredEmail] = useState<null | string>();

  const checkEmailAvilability = async (email: string) => {
    setEnteredEmail(email);
    setEmailAvilabilityStatus("checking");

    try {
      const response = await axios.get(`/users?email=${email}`);
      if (!response.data.length) {
        setEmailAvilabilityStatus("avilable");
      } else {
        setEmailAvilabilityStatus("notAvilable");
      }
    } catch (error) {
      setEmailAvilabilityStatus("failed");
    }
  };

  const resetCheckEmailAvilability = () => {
    setEmailAvilabilityStatus("idle");
    setEnteredEmail(null);
  };

  return {
    emailAvilabilityStatus,
    enteredEmail,
    checkEmailAvilability,
    resetCheckEmailAvilability,
  };
};

export default useCheckEmailAvilability;
