import { useTransition } from "react";
import Divider from "../../../components/divider";
import InputCheckBox from "../../../components/input-checkbox";
import Skeleton from "../../../components/skeleton";
import Text from "../../../components/text";
import usePhotoAlbums from "../../photos/hooks/use-photo-albums";
import type { Photo } from "../../photos/models/photo";
import type { Album } from "../models/album";

interface AlbumsListSelectableProps {
  loading?: boolean;
  albums: Album[];
  photo: Photo;
}

export default function AlbumListSelectable({
  albums,
  loading,
  photo,
}: AlbumsListSelectableProps) {
  const { managePhotoOnAlbum } = usePhotoAlbums();
  const [isManagingPhoto, setIsManagingPhoto] = useTransition();
  function isChecked(albumId: string) {
    return photo?.albums?.some((album) => album.id === albumId);
  }
  function handlePhotoOnAlbums(albumId: string) {
    let albumsIds = [];

    if (isChecked(albumId)) {
      albumsIds = photo.albums
        .filter((album) => album.id !== albumId)
        .map((album) => album.id);
    } else {
      albumsIds = [...photo.albums.map((album) => album.id), albumId];
    }
    setIsManagingPhoto(async () => {
      await managePhotoOnAlbum(photo.id, albumsIds);
    });
  }
  return (
    <ul className="flex flex-col gap-4">
      {!loading &&
        albums?.length > 0 &&
        albums.map((album, index) => (
          <li key={album.id}>
            <div className="flex items-center justify-between gap-1">
              <Text className="truncate" variant="paragraph-large">
                {album.title}
              </Text>
              <InputCheckBox
                defaultChecked={isChecked(album.id)}
                onChange={() => handlePhotoOnAlbums(album.id)}
                disabled={isManagingPhoto}
              />
            </div>
            {index !== albums.length - 1 && <Divider className="mt-4" />}
          </li>
        ))}
      {loading &&
        [0, 1, 2, 3, 4].map((current) => (
          <li key={`album-${current}`}>
            <Skeleton className="h-[2.5rem]" />
          </li>
        ))}
    </ul>
  );
}
