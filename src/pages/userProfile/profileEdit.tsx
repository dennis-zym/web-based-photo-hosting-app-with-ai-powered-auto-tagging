import React from "react";
import Cookies from 'js-cookie';
import NavBar from '../../components/NavBar';
import EditProfile from "../../components/EditProfile";

function ProfileEdit() {
  const authStateCookie = Cookies.get('_auth_state') || '{}';
  const authUser = JSON.parse(authStateCookie);

  if (!authUser.name && authUser.email) {
    authUser.name = authUser.email;
  }

  return (
    <div>
      <NavBar currentPage="ProfileEdit" user={authUser} />
      <div>
        <EditProfile user={authUser} />
      </div>
    </div>
  );
}

export { ProfileEdit };
