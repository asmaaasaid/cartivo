import Heading from "@components/common/Heading/Heading";
import Input from "@components/Form/Input/Input";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInSchema, type signInType } from "@validations/signInSchema";
import { Form, Button } from "react-bootstrap";
import { useForm, type SubmitHandler } from "react-hook-form";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<signInType>({
    resolver: zodResolver(signInSchema),
    mode: "onBlur",
  });

  const submitForm: SubmitHandler<signInType> = (data) => {
    console.log(data);
  };
  return (
    <>
      <Heading title="login" />

      <Form className="text-capitalize" onSubmit={handleSubmit(submitForm)}>
        <Input
          name="email"
          register={register}
          label="email address"
          error={errors.email?.message}
        />
        <Input
          type="password"
          name="password"
          register={register}
          label="password"
          error={errors.password?.message}
        />
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </>
  );
};

export default Login;
