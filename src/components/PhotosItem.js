import React from "react";
import { useRemovePhotoMutation } from "../store";
import { useUpdatePrivacyMutation } from '../store/apis/photosApi';
import { Button, KIND } from "baseui/button";
import { Card, StyledBody, StyledAction } from 'baseui/card';

function PhotosItem({ photo, showDelete = true }) {
  const [deletePhoto] = useRemovePhotoMutation();
  const [updatePrivacy] = useUpdatePrivacyMutation();

  const handleDeletePhoto = () => {
    deletePhoto(photo);
  }

  const handlePrivacyToggle = () => {
    const newPrivacy = photo.privacy === 'public' ? 'private' : 'public';
    updatePrivacy({ photoId: photo.id, privacy: newPrivacy });
  };

  return (
    <Card className="text-center text-sm underline underline-offset-2 mb-6 drop-shadow-lg"
      headerImage={photo.url}
    >
      <StyledBody>
        {photo.tags && photo.tags.map(tag => (
          <span key={photo.id + tag}>
            | <a href={"/?tag=" + tag}>{tag}</a>
          </span>
        ))}
      </StyledBody>
      <StyledAction>
        {showDelete &&
          <div className="flex centered-heading gap-1">
            <div style={{ flex: 1 }}>
              <Button
                kind={KIND.secondary}
                onClick={handlePrivacyToggle}
                style={{ width: "100%" }}
              >
                {photo.privacy === 'public' ? 'Public' : 'Private'}
              </Button>
            </div>

            <div style={{ flex: 1 }}>
              <Button
                kind={KIND.secondary}
                onClick={handleDeletePhoto}
                style={{ width: "100%" }}
              >
                Delete
              </Button>
            </div>
          </div>
        }
      </StyledAction>
    </Card>
  );
}

export default PhotosItem;
