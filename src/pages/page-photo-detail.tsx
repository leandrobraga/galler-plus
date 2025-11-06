import { useParams } from "react-router";
import Button from "../components/button";
import Container from "../components/container";
import ImageFilePreview from "../components/image-file-preview";
import Skeleton from "../components/skeleton";
import Text from "../components/text";
import AlbumListSelectable from "../contexts/albums/components/albums-list-selectable";
import PhotoNavigator from "../contexts/photos/components/photo-navigator";
import type { Photo } from "../contexts/photos/models/photo";
import useAlbums from "../contexts/albums/hooks/use-albums";

export default function PagePhotoDetail() {
  const { id } = useParams();
  const { albums, isLoadingAlbums } = useAlbums();
  const isloadingPage = false;
  const photo = {
    id: "1",
    title: "Testes 1",
    imageId: "portrait-shadow.png",
    albums: [
      { id: "1", title: "Album 1" },
      { id: "2", title: "Album 2" },
      { id: "3", title: "Album 3" },
    ],
  } as Photo;

  return (
    <Container>
      <header className="flex items-center justify-between gap-8 mb-8">
        {!isloadingPage ? (
          <Text variant="heading-large">{photo.title}</Text>
        ) : (
          <Skeleton className="w-48 h-8" />
        )}
        <PhotoNavigator />
      </header>
      <div className="grid grid-cols-[21rem_1fr] gap-24">
        <div className="space-y-3">
          {!isloadingPage ? (
            <ImageFilePreview
              src={`/images/${photo?.imageId}`}
              title={photo?.title}
              imageClassName="h-[21rem]"
            />
          ) : (
            <Skeleton className="h-[21rem]" />
          )}
          {!isloadingPage ? (
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
            photo={photo}
            albums={albums}
            loading={isLoadingAlbums}
          />
        </div>
      </div>
    </Container>
  );
}
