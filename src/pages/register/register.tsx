import React, { useState } from "react";
import { Button } from "baseui/button";
import TextField from "@mui/material/TextField";
import { HeadingLarge } from "baseui/typography";
import { useFormik } from "formik";
import axios, { AxiosError } from "axios";
import { useAddInfoMutation } from "../../store/apis/usersInfoApi";

import {
  Container,
  ErrorText,
  InnerContainer,
  Wrapper,
  Centered,
  CustomLink,
  RegisterContainer,
} from "../commons";

function Register(props: any) {
  const [error, setError] = useState("");
  const [addInfo] = useAddInfoMutation();

  const onSubmit = async (values: any) => {
    console.log("Values: ", values);
    setError("");

    try {
      const response = await axios.post("http://localhost:9000/register", values);
      if (response.data) {
        const userData = response.data;

        console.log("Newly registered user data: ", userData);
        const userId = userData.user.id;
        console.log("Newly registered user id: ", userId);
        const addInfoResponse = await addInfo({
          userId: userId,
          userName: "User Name",
          bio:
            "Lorem ipsum dolor elit. Nulla facilisi. sit amet, consectetur adipiscing consectetur adipiscing elit. Nulla facilisi. Lorem ipsum dolor sit amet, consectetur adipiscing  Nulla facilisi. sit amet, consectetur adipiscing consectetur adipiscing elit. Nulla facilisi. Lorem ipsum dolor sit amet, consectetur elit. Nulla facilisi.",
          profileUrl: "",
        });
      }
      window.location.pathname = "/login";
    } catch (err) {
      if (err && err instanceof AxiosError) {
        setError(err.response?.data?.message || "An unexpected error occurred");
      } else if (err && err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred");
      }

      console.log("Error: ", err);
    }
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit,
  });

  return (
    <Container>
      <InnerContainer>
        <form onSubmit={formik.handleSubmit}>
          <RegisterContainer>
            <HeadingLarge>Register</HeadingLarge>
          </RegisterContainer>
          <ErrorText>{error}</ErrorText>
          <Wrapper>
            <TextField
              style={{ width: "300px" }}
              name="email"
              label="Email"
              value={formik.values.email}
              onChange={formik.handleChange}
              type="email"
              variant="filled"
            />
          </Wrapper>
          <Wrapper>
            <TextField
              style={{ width: "300px" }}
              name="password"
              label="Password"
              value={formik.values.password}
              onChange={formik.handleChange}
              type="password"
              variant="filled"
            />
          </Wrapper>
          <Wrapper style={{ flex: 1 }}>
            <Button
              size="large"
              kind="primary"
              isLoading={formik.isSubmitting}
              overrides={{ BaseButton: { style: { width: "100%" } } }}
            >
              Register
            </Button>
          </Wrapper>
          <Centered>
            <CustomLink href="/login">Login</CustomLink>
          </Centered>
        </form>
      </InnerContainer>
    </Container>
  );
}

export { Register };
