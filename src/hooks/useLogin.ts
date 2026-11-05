import { useForm, type SubmitHandler } from "react-hook-form";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { actAuthLogin } from "@store/auth/authSlice";
import { useEffect } from "react";
import { resetAuthState } from "@store/auth/authSlice";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInSchema, type signInType } from "@validations/signInSchema";

const useLogin = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const { loading, error, accessToken } = useAppSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors: formErrors },
  } = useForm<signInType>({
    resolver: zodResolver(signInSchema),
    mode: "onBlur",
  });

  const submitForm: SubmitHandler<signInType> = (data) => {
    if (searchParams.get("message")) {
      setSearchParams("");
    }

    dispatch(actAuthLogin(data))
      .unwrap()
      .then(() => navigate("/"));
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
    searchParams,
  };
};

export default useLogin;
