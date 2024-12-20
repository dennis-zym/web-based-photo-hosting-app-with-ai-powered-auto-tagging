import React, { useState } from 'react';
import { Button, KIND } from "baseui/button";
import TextField from '@mui/material/TextField';
import ImageUploading from 'react-images-uploading';
import { useUpdateUserInfoMutation, useFetchInfoQuery } from '../store/apis/usersInfoApi';
import {
  Container,
  ProfileInnerContainer,
  Wrapper,
  CenteredContainer,
  ProfileRounded,
  Centered,
  CustomButton,
  CustomLink
} from "../pages/commons";

function EditProfile({ user }) {
  const [images, setImages] = useState([]);
  const { data, error, isLoading } = useFetchInfoQuery({ id: user.id });
  const [formData, setFormData] = useState({
    userName: "",
    bio: "",
  });

  const [updateUser] = useUpdateUserInfoMutation();

  const changeProfilePic = (imageList) => {
    updateUser({
      userId: user.id,
      profileUrl: imageList[0].data_url,
    });
    setImages(imageList);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleUpdateUser = () => {
    try {
      updateUser({
        userId: user.id,
        userName: formData.userName,
        bio: formData.bio,
      });
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

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
              <ImageUploading
                multiple
                value={images}
                onChange={changeProfilePic}
                maxNumber={1}
                dataURLKey="data_url"
                acceptType={['jpg']}
              >
                {({
                  imageList,
                  onImageUpload,
                  onImageUpdate,
                  isDragging,
                  dragProps,
                }) => (
                  <div className="upload__image-wrapper">
                    <CustomButton
                      style={isDragging ? { color: 'green' } : null}
                      onClick={onImageUpload}
                      {...dragProps}
                    >
                      Select or Drop Photo
                    </CustomButton>
                    &nbsp;
                    {imageList.map((image, index) => (
                      <div key={index} className="image-item">
                        <div className="image-item__btn-wrapper">
                          <Button
                            kind={KIND.secondary}
                            onClick={() => onImageUpdate(index)}
                          >
                            Change Photo
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </ImageUploading>
            </Wrapper>
            <form>
              <Wrapper>
                <TextField style={{ width: '300px' }}
                  id="userName"
                  name="userName"
                  label="User Name"
                  variant="filled"
                  type="text"
                  onChange={handleInputChange}
                />
              </Wrapper>
              <Wrapper>
                <TextField style={{ width: '300px' }}
                  id="bio"
                  name="bio"
                  label="Bio"
                  multiline
                  rows={2}
                  variant="filled"
                  type="text"
                  onChange={handleInputChange}
                />
              </Wrapper>
              <Button
                style={{ width: '300px' }}
                kind={KIND.secondary}
                size="large"
                onClick={handleUpdateUser}
              >
                Update Profile
              </Button>
              <Centered>
                <CustomLink href="/userProfile">Return to User Profile Page</CustomLink>
              </Centered>
            </form>
          </ProfileInnerContainer>
        </Container>
      );
    } else {
      content = 'User not found';
    }
  }

  return <div> {content} </div>;
}

export default EditProfile;
