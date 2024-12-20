import React from 'react';
import { Button, KIND } from 'baseui/button';
import TogglePanel from './TogglePanel';
import { useRemoveAlbumMutation } from '../store';
import Photos from './Photos';

function AlbumsItem({ album }) {
  const [removeAlbum, results] = useRemoveAlbumMutation(album);

  const handleClick = () => {
    removeAlbum(album);
  };

  const header = (
    <div className="flex items-center px-5 pt-3">
      <div>
        <Button
          kind={KIND.secondary}
          loading={results.isLoading ? 'true' : 'false'}
          onClick={handleClick}
        >
          Delete Album
        </Button>
      </div>
      <div className="pl-5">
        <p>Album Name: {album.title}</p>
      </div>
    </div>
  );

  return (
    <TogglePanel key={album.id} header={header}>
      <Photos album={album} />
    </TogglePanel>
  );
}

export default AlbumsItem;
