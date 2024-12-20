import React from "react";
import Cookies from 'js-cookie';
import NavBar from '../../components/NavBar';
import DisplayProfile from "../../components/DisplayProfile";

function UserProfile() {
  const authStateCookie = Cookies.get('_auth_state') || '{}';
  const authUser = JSON.parse(authStateCookie);

  if (!authUser.name && authUser.email) {
    authUser.name = authUser.email;
  }

  return (
    <div>
      <NavBar currentPage="UserProfile" user={authUser} />
      <div>
        <DisplayProfile user={authUser} />
      </div>
    </div>
  );
}

export { UserProfile };
