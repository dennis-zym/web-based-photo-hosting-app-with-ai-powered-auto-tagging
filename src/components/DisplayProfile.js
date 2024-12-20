import React from "react";
import { Button, KIND } from "baseui/button";
import { Container, ProfileInnerContainer, Wrapper, CenteredContainer, ProfileRounded, UserName, Title, Bio } from "../pages/commons";
import { useFetchInfoQuery } from '../store/apis/usersInfoApi';

function DisplayProfile({ user }) {
  const { data, error, isLoading } = useFetchInfoQuery({ id: user.id });

  let content;

  if (isLoading) {
    content = 'Loading user information...';
  } else if (error) {
    content = 'Error loading user information';
  } else if (data) {
    const userInfo = data[0];
    if (user) {
      content = (
        <Container>
          <ProfileInnerContainer style={{ background: "pink" }}>
            <CenteredContainer>
              <ProfileRounded className="object-cover" src={userInfo.profileUrl} alt="User Profile Photo" />
            </CenteredContainer>
            <Wrapper>
              <UserName> {userInfo.userName} </UserName>
              <h3>Email: {user.email}</h3>
            </Wrapper>
            <Wrapper>
              <Title> Bio </Title>
              <Bio> {userInfo.bio} </Bio>
            </Wrapper>
            <Wrapper>
              <Button
                $as="a"
                href="/profileEdit"
                kind={KIND.secondary}
              >
                Edit User Profile
              </Button>
            </Wrapper>
          </ProfileInnerContainer>
        </Container>
      );
    } else {
      content = 'User not found';
    }
  }

  return <div> {content} </div>;
}

export default DisplayProfile;
