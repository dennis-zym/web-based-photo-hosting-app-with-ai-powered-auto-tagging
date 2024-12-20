import React from "react";
import { HeadingXXLarge } from "baseui/typography";
import { useSearchParams } from "react-router-dom";
import Cookies from 'js-cookie';

import NavBar from '../../components/NavBar';
import PublicPhotos from '../../components/PublicPhotos';

function Home() {
  const [searchParams] = useSearchParams();
  const authStateCookie = Cookies.get('_auth_state') || '{}';
  const authUser = JSON.parse(authStateCookie);

  if (!authUser.name && authUser.email) {
    authUser.name = authUser.email;
  }

  return (
    <div>
      <NavBar currentPage="Home" user={authUser} />
      
      <div className="moved-down">
        <div className="centered-heading">
          <HeadingXXLarge color="secondary500" style={{ textAlign: "center" }}>
            PHOTOS FROM ALL USERS
          </HeadingXXLarge>
        </div>

        <div className="homePhotoPadTop">
          <PublicPhotos tag={searchParams.get('tag')} />
        </div>
      </div>
    </div>
  );
}

export { Home };
