import { useAppDispatch, useAppSelector } from "@store/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema, type signUpType } from "@validations/signUpSchema";
import { actAuthRegister } from "@store/auth/authSlice";
import { useForm, type SubmitHandler } from "react-hook-form";
import useCheckEmailAvilability from "@hooks/useCheckEmailAvilability";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { resetAuthState } from "@store/auth/authSlice";
const useRegister = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { loading, error, accessToken } = useAppSelector((state) => state.auth);
  const {
    register,
    handleSubmit,
    formState: { errors: formErrors },
    trigger,
    getFieldState,
  } = useForm<signUpType>({
    mode: "onBlur",
    resolver: zodResolver(signUpSchema),
  });

  const submitForm: SubmitHandler<signUpType> = async (data) => {
    const { firstName, lastName, email, password } = data;
    dispatch(actAuthRegister({ firstName, lastName, email, password }))
      .unwrap()
      .then(() => {
        navigate("/login?message=account_created");
      });
  };

  const {
    emailAvilabilityStatus,
    enteredEmail,
    checkEmailAvilability,
    resetCheckEmailAvilability,
  } = useCheckEmailAvilability();

  const emailOnBlurHandler = async (e: React.FocusEvent<HTMLInputElement>) => {
    await trigger("email");
    const value = e.target.value;
    const { isDirty, invalid } = getFieldState("email");

    if (isDirty && !invalid && enteredEmail !== value) {
      checkEmailAvilability(value);
    }

    if (isDirty && invalid && enteredEmail) {
      resetCheckEmailAvilability();
    }
  };

  useEffect(() => {
    return () => {
      dispatch(resetAuthState());
    };
  }, [dispatch]);
  return {
    loading,
    error,
    accessToken,
    register,
    handleSubmit,
    formErrors,
    submitForm,
    emailAvilabilityStatus,
    emailOnBlurHandler,
  };
};

export default useRegister;
