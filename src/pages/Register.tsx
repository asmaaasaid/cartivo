import useRegister from "@hooks/useRegister";
import Heading from "@components/common/Heading/Heading";
import { Form, Col, Row, Button, Spinner } from "react-bootstrap";
import Input from "@components/Form/Input/Input";
import { Navigate } from "react-router-dom";

const Register = () => {
  const {
    loading,
    error,
    accessToken,
    register,
    handleSubmit,
    formErrors,
    submitForm,
    emailAvilabilityStatus,
    emailOnBlurHandler,
  } = useRegister();
  if (accessToken) {
    return <Navigate to="/" replace />;
  }

  return (
    <>
      <Heading title="register" />

      <Form className="text-capitalize" onSubmit={handleSubmit(submitForm)}>
        <Row className="mb-3">
          <Col md={6}>
            <Input
              label="first name"
              name="firstName"
              register={register}
              error={formErrors.firstName?.message ?? ""}
            />
          </Col>
          <Col md={6}>
            <Input
              label="last name"
              name="lastName"
              register={register}
              error={formErrors.lastName?.message ?? ""}
            />
          </Col>
        </Row>

        <Input
          label="email"
          name="email"
          register={register}
          error={
            formErrors.email?.message
              ? formErrors.email?.message
              : emailAvilabilityStatus == "notAvilable"
                ? "this email is already in use."
                : emailAvilabilityStatus == "failed"
                  ? "error from the server"
                  : ""
          }
          onBlur={emailOnBlurHandler}
          formText={
            emailAvilabilityStatus == "checking"
              ? "we are currently checking the avilability of this email, please wait..."
              : ""
          }
          success={
            emailAvilabilityStatus == "avilable"
              ? "this email is avilable for use."
              : ""
          }
          disabled={emailAvilabilityStatus == "checking" ? true : false}
        />

        <Row>
          <Col md={6}>
            <Input
              type="password"
              label="password"
              name="password"
              register={register}
              error={formErrors.password?.message ?? ""}
            />
          </Col>

          <Col>
            <Input
              type="password"
              label="confirm password"
              name="confirmPassword"
              register={register}
              error={formErrors.confirmPassword?.message ?? ""}
            />
          </Col>
        </Row>

        <Button
          variant="primary"
          type="submit"
          disabled={
            emailAvilabilityStatus == "checking"
              ? true
              : false || loading == "pending"
          }
        >
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

export default Register;
