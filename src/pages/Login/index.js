import { Link as ReactRouterLink } from "react-router-dom";
import { Box, Heading, Text, Button, Link } from "@chakra-ui/react";
import { useForm } from "react-hook-form";

import Form, { FormInput } from "#/components/Form";
import { authValidation } from "#/components/Form/validatePattern";

const Login = () => {
  const {
    formState: { errors },
    register,
    setValue,
    handleSubmit,
  } = useForm();

  const onSignIn = (data) => {
    console.log(data);
  };

  return (
    <Box height="100%" display="flex">
      <Box
        width={{ base: "100%", sm: "450px", xl: "500px" }}
        margin="auto"
        padding="50px"
        border="1px solid #0000003b"
        borderRadius="15px"
        boxShadow="0 1px 0.5px #0000003b"
      >
        <Heading textAlign="center">Login</Heading>
        <Text textAlign="center">Hello! Log in with your email </Text>
        <Box marginTop="20px">
          <Form
            {...{
              validation: authValidation,
              errors,
              register,
              setValue,
              onSubmit: handleSubmit(onSignIn),
            }}
          >
            <FormInput name="email" label="Email" />
            <FormInput name="password" label="Password" type="password" />
            <Box textAlign="center">
              <Button type="submit">Sign In</Button>
            </Box>
          </Form>
        </Box>
        <Box marginTop="20px" textAlign="center">
          <Text>
            Don&apos;t have an account?{" "}
            <Link as={ReactRouterLink} to="/register" color="teal.500">
              Sign Up
            </Link>
          </Text>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
