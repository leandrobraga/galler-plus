import { useParams } from "react-router";
import Button from "../components/button";
import Container from "../components/container";
import ImageFilePreview from "../components/image-file-preview";
import Skeleton from "../components/skeleton";
import Text from "../components/text";
import AlbumListSelectable from "../contexts/albums/components/albums-list-selectable";
import useAlbums from "../contexts/albums/hooks/use-albums";
import PhotoNavigator from "../contexts/photos/components/photo-navigator";
import { usePhoto } from "../contexts/photos/hooks/use-photo";
import type { Photo } from "../contexts/photos/models/photo";

export default function PagePhotoDetail() {
  const { id } = useParams();
  const { photo, isLoadingPhoto, previousPhotoId, nextPhotoId } = usePhoto(id);
  const { albums, isLoadingAlbums } = useAlbums();

  if (!isLoadingPhoto && !photo) {
    return <div>Foto não encontrada</div>;
  }

  return (
    <Container>
      <header className="flex items-center justify-between gap-8 mb-8">
        {!isLoadingPhoto ? (
          <Text variant="heading-large">{photo?.title}</Text>
        ) : (
          <Skeleton className="w-48 h-8" />
        )}
        <PhotoNavigator
          loading={isLoadingPhoto}
          previousPhotoId={previousPhotoId}
          nextPhotoId={nextPhotoId}
        />
      </header>
      <div className="grid grid-cols-[21rem_1fr] gap-24">
        <div className="space-y-3">
          {!isLoadingPhoto ? (
            <ImageFilePreview
              src={`${import.meta.env.VITE_IMAGES_URL}/${photo?.imageId}`}
              title={photo?.title}
              imageClassName="h-[21rem]"
            />
          ) : (
            <Skeleton className="h-[21rem]" />
          )}
          {!isLoadingPhoto ? (
            <Button variant="destructive">Excluir</Button>
          ) : (
            <Skeleton className="w-20 h-10" />
          )}
        </div>
        <div className="py-3">
          <Text as="h3" variant="heading-medium" className="mb-6">
            Álbuns
          </Text>
          <AlbumListSelectable
            photo={photo as Photo}
            albums={albums}
            loading={isLoadingAlbums}
          />
        </div>
      </div>
    </Container>
  );
}
