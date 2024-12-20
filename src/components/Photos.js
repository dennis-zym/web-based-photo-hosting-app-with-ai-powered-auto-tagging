import React, { useState } from "react";
import axios from "axios";
import { useFetchPhotosQuery, useAddPhotoMutation } from "../store";
import { Button, KIND } from "baseui/button";
import ImageUploading from 'react-images-uploading';
import PhotosItem from "./PhotosItem";
import SkeletonLoader from "./SkeletonLoader";

function Photos({album}) {
  const {data, isFetching, error} = useFetchPhotosQuery(album);
  const [addPhoto] = useAddPhotoMutation();
  const [images] = useState([]);
  const maxNumber = 69;

  const onChange = async (imageList) => {
    if (imageList[0]) {
      console.log(album, imageList[0].data_url)
      const response = await axios.post('https://vision.googleapis.com/v1/images:annotate?key=AIzaSyClxGPA_0e1kdez3fsQMCVaaKuCXznlxxE', {
          "requests":[
            {
              "image":{
                "content": imageList[0].data_url.substring(imageList[0].data_url.indexOf('base64,')+7)
              },
              "features":[
                {
                  "type":"LABEL_DETECTION",
                  "maxResults":7
                }
              ]
            }
          ]
      });

      const MIN_SCORE = 0.60;
      const tags = response.data.responses[0].labelAnnotations
        .filter((label) => label.score > MIN_SCORE)
        .map((label) => label.description);

      const params = {
        album: album,
        image_url: imageList[0].data_url,
        tags: tags
      };
      addPhoto(params);
    }
  };

  let content;
  if (isFetching) {
    content = <SkeletonLoader className='h-8 w-8' times={4} />;
  } else if (error) {
    content = <div>Error Fetching Photos ...</div>;
  } else {
    content = data.map((photo) => (
      <PhotosItem key={photo.id} photo={photo} />
    ));
  }

  return (
    <div>
      <div className="m-2 flex flex-row items-center justify-between">
        <h3 className="text-lg font-bold">Photos in {album.title}</h3>
        <ImageUploading
          multiple
          value={images}
          onChange={onChange}
          maxNumber={maxNumber}
          dataURLKey="data_url"
        >
          {({ imageList, onImageUpload, isDragging, dragProps }) => (
            <div className="upload__image-wrapper">
              <Button
                kind={KIND.secondary}
                style={isDragging ? { color: 'red' } : undefined}
                onClick={onImageUpload}
                {...dragProps}
              >
                Click or Drop Image here
              </Button>
              &nbsp;
            </div>
          )}
        </ImageUploading>
      </div>
      <div className="photoPadding columns-3xs lg:mx-10 mt-10">{content}</div>
    </div>
  );
}

export default Photos;