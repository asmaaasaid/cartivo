import { useForm, type SubmitHandler } from "react-hook-form";
import Heading from "@components/common/Heading/Heading";
import { Form, Col, Row, Button } from "react-bootstrap";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema, type signUpType } from "@validations/signUpSchema";
import Input from "@components/Form/Input/Input";
import useCheckEmailAvilability from "@hooks/useCheckEmailAvilability";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
    getFieldState,
  } = useForm<signUpType>({
    mode: "onBlur",
    resolver: zodResolver(signUpSchema),
  });

  const submitForm: SubmitHandler<signUpType> = (data) => {
    console.log(data);
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
              error={errors.firstName?.message ?? ""}
            />
          </Col>
          <Col md={6}>
            <Input
              label="last name"
              name="lastName"
              register={register}
              error={errors.lastName?.message ?? ""}
            />
          </Col>
        </Row>

        <Input
          label="email"
          name="email"
          register={register}
          error={
            errors.email?.message
              ? errors.email?.message
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
              error={errors.password?.message ?? ""}
            />
          </Col>

          <Col>
            <Input
              type="password"
              label="confirm password"
              name="confirmPassword"
              register={register}
              error={errors.confirmPassword?.message ?? ""}
            />
          </Col>
        </Row>

        <Button
          variant="primary"
          type="submit"
          disabled={emailAvilabilityStatus == "checking" ? true : false}
        >
          Submit
        </Button>
      </Form>
    </>
  );
};

export default Register;
