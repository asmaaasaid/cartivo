import Heading from "@components/common/Heading/Heading";
import Input from "@components/Form/Input/Input";
import { Form, Button, Alert, Spinner } from "react-bootstrap";
import { Navigate } from "react-router-dom";
import useLogin from "@hooks/useLogin";

const Login = () => {
  const {
    loading,
    error,
    accessToken,
    register,
    handleSubmit,
    formErrors,
    submitForm,
    searchParams,
  } = useLogin();

  if (accessToken) {
    return <Navigate to="/" replace />;
  }
  return (
    <>
      <Heading title="login" />
      {searchParams.get("message") === "account_created" && (
        <Alert variant="success">
          Account created successfully! Please login.
        </Alert>
      )}
      {searchParams.get("message") === "login_required" && (
        <Alert variant="danger">Please login to access this page.</Alert>
      )}

      <Form className="text-capitalize" onSubmit={handleSubmit(submitForm)}>
        <Input
          name="email"
          register={register}
          label="email address"
          error={formErrors.email?.message}
        />
        <Input
          type="password"
          name="password"
          register={register}
          label="password"
          error={formErrors.password?.message}
        />
        <Button variant="primary" type="submit">
          {loading == "pending" ? (
            <>
              <Spinner animation="border" size="sm" /> loading...
            </>
          ) : (
            "Submit"
          )}
        </Button>
        {error && <p>{error}</p>}
      </Form>
    </>
  );
};

export default Login;
