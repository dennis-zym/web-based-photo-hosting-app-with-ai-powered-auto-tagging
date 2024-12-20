import React from "react";
import { useFetchAllPhotosQuery } from "../store";
import PhotosItem from "./PhotosItem";
import SkeletonLoader from "./SkeletonLoader";

function PublicPhotos({ tag }) {
  const { data, isFetching, error } = useFetchAllPhotosQuery(tag);

  // Filter photos that are public
  const publicPhotos = data ? data.filter(photo => photo.privacy === 'public') : [];

  let content;
  if (isFetching) {
    content = <SkeletonLoader className='h-8 w-8' times={4} />;
  } else if (error) {
    content = <div>Error Fetching Photos ...</div>;
  } else {
    content = publicPhotos.map(photo => (
      <PhotosItem key={photo.id} photo={photo} showDelete={false} />
    ));
  }

  return (
    <div className="columns-3xs gap-3 photoPadding mx-9 lg:mx-12">
      {content}
    </div>
  );
}

export default PublicPhotos;
