import React from "react";
import Albums from "../../components/Albums";
import Cookies from "js-cookie";
import NavBar from "../../components/NavBar";

function Profile() {
  const authStateCookie = Cookies.get("_auth_state") || "{}";
  const authUser = JSON.parse(authStateCookie);

  if (!authUser.name && authUser.email) {
    authUser.name = authUser.email;
  }

  return (
    <div className="moved-down">
      <div>
        <NavBar currentPage="Profile" user={authUser} />
      </div>
      <div className="sidePadding">
        <Albums user={authUser} />
      </div>
    </div>
  );
}

export { Profile };
