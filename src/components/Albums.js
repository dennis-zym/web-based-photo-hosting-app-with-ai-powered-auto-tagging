import React, { useState } from 'react';
import { useFetchAlbumsQuery, useAddAlbumMutation } from '../store';
import SkeletonLoader from './SkeletonLoader';
import AlbumsItem from './AlbumsItem';
import { Button, KIND } from 'baseui/button';
import TextField from '@mui/material/TextField';

function Albums({ user }) {
  const { data, error, isLoading } = useFetchAlbumsQuery(user);
  const [addAlbum, results] = useAddAlbumMutation(user);
  const [albumName, setAlbumName] = useState('');

  const handleClick = () => {
    addAlbum({
      id: user.id,
      albumName: albumName,
    });
  };

  let content;

  if (isLoading) {
    content = <SkeletonLoader className='h-10 w-full' times={3} />;
  } else if (error) {
    content = <div>Errors loading albums</div>;
  } else {
    content = data.map((album) => (
      <AlbumsItem key={album.id} album={album}></AlbumsItem>
    ));
  }

  return (
    <div>
      <div className='m-2 flex flex-row items-center justify-between'>
        <h3 className='text-lg font-bold'>Albums for {user.name}</h3>
        <div className='flex items-center'>
          <div style={{ flex: 1 }} className='mr-3'>
            <TextField
              label='Enter album name'
              variant='standard'
              onChange={(e) => setAlbumName(e.target.value)}
            />
          </div>
          <div style={{ flex: 1 }}>
            <Button
              kind={KIND.secondary}
              loading={results.isLoading ? 'true' : 'false'}
              onClick={handleClick}
            >
              + Add Album
            </Button>
          </div>
        </div>
      </div>
      <div>{content}</div>
    </div>
  );
}

export default Albums;
