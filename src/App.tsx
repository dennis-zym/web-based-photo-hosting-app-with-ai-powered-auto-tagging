import React from "react";
import logo from "./logo.svg";
import "./App.css";
import styled from "styled-components";
import { Route, Routes } from "react-router-dom";
import { Login } from "./pages/login/login";
import { Register } from "./pages/register/register";
import { Home } from "./pages/home/home";
import { Profile } from "./pages/profile/profile";
import { RequireAuth, withAuthHeader } from "react-auth-kit";
import  { UserProfile }  from './pages/userProfile/profileInfo'
import  { ProfileEdit }  from './pages/userProfile/profileEdit'

const AppContainer = styled.div`
  width: 100%;
  height: 100%;
`;

function App() {
  return (
    <AppContainer>
      <Routes>
        <Route
          path="/"
          element={
            <RequireAuth loginPath="/login">
              <Home />
            </RequireAuth>
          }
        ></Route>
        <Route
          path="/profile"
          element={
            <RequireAuth loginPath="/login">
              <Profile />
            </RequireAuth>
          }
        ></Route>
        <Route
          path="/userProfile"
          element={
            <RequireAuth loginPath="/login">
              <UserProfile/>
            </RequireAuth>
          }
        ></Route>
        <Route
          path="/profileEdit"
          element={
            <RequireAuth loginPath="/login">
              <ProfileEdit />
            </RequireAuth>
          }
        ></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
      </Routes>
    </AppContainer>
  );
}

export default App;
