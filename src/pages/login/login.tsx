import React, { useState } from "react";
import { Button } from "baseui/button";
import TextField from "@mui/material/TextField";
import { HeadingXLarge } from "baseui/typography";
import { useSignIn } from "react-auth-kit";
import { useFormik } from "formik";
import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  Container,
  ErrorText,
  InnerContainer,
  Wrapper,
  CenteredContainer,
  Rounded,
  Centered,
  CustomLink,
} from "../commons";

function Login(props:any) {
  const svgString = `
    <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"/></svg>
    `;
  const loginLogo = `data:image/svg+xml;base64,${btoa(svgString)}`;

  const [error, setError] = useState("");
  const signIn = useSignIn();

  const onSubmit = async (values:any) => {
    console.log("Values: ", values);
    setError("");

    try {
      const response = await axios.post("http://localhost:9000/login", values);
      console.log(response);
      signIn({
        token: response.data.token,
        expiresIn: 3720,
        tokenType: "Bearer",
        authState: response.data.user,
      });
      window.location.pathname = "/";
    } catch (err) {
      if (err && err instanceof AxiosError) {
        const errorMessage = err.response?.data.message || "Login Failed!";
        setError(errorMessage);
        toast.error(errorMessage);
      } else if (err && err instanceof Error) {
        const errorMessage = err.message || "Login Failed!";
        setError(errorMessage);
        toast.error(errorMessage);
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
      <HeadingXLarge>
        Photos Hosting Web-App with AI-powered Tagging
      </HeadingXLarge>
      <InnerContainer>
        <form onSubmit={formik.handleSubmit}>
          <CenteredContainer>
            <Rounded src={loginLogo} alt="Welcome" />
          </CenteredContainer>
          <ErrorText>{error}</ErrorText>
          <Wrapper>
            <TextField
              style={{ width: "300px" }}
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              label="Email"
              type="email"
              variant="filled"
            />
          </Wrapper>
          <Wrapper>
            <TextField
              style={{ width: "300px" }}
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              label="Password"
              type="password"
              variant="filled"
            />
          </Wrapper>
          <Wrapper>
            <Button
              style={{ width: "300px" }}
              size="large"
              kind="primary"
              isLoading={formik.isSubmitting}
            >
              Login
            </Button>
          </Wrapper>
          <Centered>
            <CustomLink href="/register">New user? Register here!</CustomLink>
          </Centered>
        </form>
      </InnerContainer>
    </Container>
  );
}

export { Login };
